'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { Resend } from 'resend'

interface BookingData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  project_name?: string;
  preferred_date: string;
  location: string;
  budget?: string;
  message: string;
}

export async function submitBooking(formData: BookingData) {
  try {
    // Validate input
  if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.preferred_date || !formData.location || !formData.message) {
    return { error: 'Validation failed: Missing required fields.' }
  }
  
  if (formData.message.length < 25) {
    return { error: 'Validation failed: Please provide more details regarding your project.' }
  }

  // 1. Duplicate Protection via Admin Client
  const adminClient = createAdminClient()
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
  
  const { data: duplicateCheck, error: duplicateError } = await adminClient
    .from('bookings')
    .select('id')
    .eq('email', formData.email)
    .eq('message', formData.message)
    .gte('created_at', oneHourAgo)
    .maybeSingle()
    
  if (duplicateError && duplicateError.code !== 'PGRST116') {
    console.error('Duplicate Check Error:', duplicateError)
  }
  
  if (duplicateCheck) {
    return { error: 'You have recently submitted this exact inquiry. Please wait before submitting again.' }
  }

  // Generate Reference Code (e.g. CI-2026-84732)
  const refCode = `CI-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`

  // Use the server client to enforce existing RLS inserts
  const supabase = await createClient()

  // 2. Persist to Database (must succeed before sending emails)
  // We do NOT use .select() here because anonymous RLS might block reads, leading to PGRST116.
  const { error: insertError } = await (supabase.from('bookings') as any)
    .insert({
      reference_code: refCode,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || null,
      service: formData.service,
      project_name: formData.project_name || null,
      preferred_date: formData.preferred_date, // stored as string for timeline compatibility
      location: formData.location,
      budget: formData.budget || null,
      message: formData.message,
      status: 'new'
    })

  if (insertError) {
    console.error('Booking Insert Error:', insertError)
    return { error: 'Failed to submit booking. Please try again later.' }
  }

  // 3. Email Notifications (Resend)
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;
    const adminEmail = process.env.BOOKING_NOTIFICATION_EMAIL;

    if (resendApiKey && resendFromEmail && adminEmail) {
      const resend = new Resend(resendApiKey);

      // A. Admin Notification Email
      const adminEmailResponse = await resend.emails.send({
        from: `Century Imagery <${resendFromEmail}>`,
        to: [adminEmail],
        replyTo: formData.email,
        subject: `New Project Commission: ${refCode} - ${formData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
            <h2 style="color: #dcb450; text-transform: uppercase;">New Commission Received</h2>
            <p><strong>Reference Code:</strong> ${refCode}</p>
            <hr style="border: 1px solid #eee;" />
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Company/Brand:</strong> ${formData.company || 'N/A'}</p>
            <p><strong>Service:</strong> ${formData.service}</p>
            <p><strong>Location:</strong> ${formData.location}</p>
            <p><strong>Timeline:</strong> ${formData.preferred_date}</p>
            <p><strong>Budget:</strong> ${formData.budget || 'N/A'}</p>
            <br />
            <p><strong>Project Brief:</strong></p>
            <blockquote style="border-left: 4px solid #dcb450; padding-left: 16px; color: #444; background: #f9f9f9; padding: 12px;">
              ${formData.message.replace(/\n/g, '<br />')}
            </blockquote>
            <br />
            <p style="font-size: 12px; color: #888;">
              <a href="https://centuryimagery.com/admin/bookings" style="color: #dcb450; font-weight: bold;">Click here</a> to view and manage this booking in the Admin Dashboard.
            </p>
          </div>
        `
      });

      // B. Client Confirmation Email
      const clientEmailResponse = await resend.emails.send({
        from: `Century Imagery <${resendFromEmail}>`,
        to: [formData.email],
        subject: `Your Booking Request Received: ${refCode}`,
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #222;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #dcb450; letter-spacing: 2px; text-transform: uppercase; font-size: 20px;">Century Imagery</h1>
            </div>
            <p>Dear ${formData.name},</p>
            <p>Thank you for reaching out to Century Imagery. We have successfully received your project inquiry (<strong>${refCode}</strong>).</p>
            <p>Our creative team is currently reviewing your brief and timeline. We aim to respond to all inquiries within 24-48 hours to discuss the next steps.</p>
            <br/>
            <p><strong>Your Inquiry Details:</strong></p>
            <ul>
              <li><strong>Service:</strong> ${formData.service}</li>
              <li><strong>Timeline:</strong> ${formData.preferred_date}</li>
              <li><strong>Location:</strong> ${formData.location}</li>
            </ul>
            <br/>
            <p>We look forward to the possibility of collaborating with you.</p>
            <br/>
            <p>Best regards,<br/><strong>Century Imagery Team</strong></p>
          </div>
        `
      });

      // 4. Update Notification Status in DB
      const adminNotified = !adminEmailResponse.error;
      const clientNotified = !clientEmailResponse.error;

      if (adminNotified || clientNotified) {
        await (adminClient.from('bookings') as any)
          .update({ 
            admin_notified: adminNotified,
            client_notified: clientNotified 
          })
          .eq('reference_code', refCode);
      }

    } else {
      console.warn('Resend environment variables are missing. Skipping email notification.');
    }
  } catch (emailError) {
    console.error('Email Notification Error:', emailError);
    // Failure to send email must not fail the booking submission.
  }

  return { success: true, referenceCode: refCode }
} catch (globalError: any) {
  console.error('CRITICAL ACTION ERROR:', globalError);
  return { error: `Server Crash: ${globalError.message || 'Unknown error'}` };
}
}

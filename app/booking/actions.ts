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
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #09090b; color: #e4e4e7; border-radius: 8px; overflow: hidden; border: 1px solid #27272a;">
            <div style="background-color: #111113; padding: 30px; text-align: center; border-bottom: 1px solid #27272a;">
              <h1 style="margin: 0; color: #dcb450; font-size: 20px; letter-spacing: 3px; text-transform: uppercase;">Century Imagery</h1>
              <p style="margin: 10px 0 0 0; color: #a1a1aa; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">New Commission Received</p>
            </div>
            
            <div style="padding: 30px;">
              <div style="background-color: rgba(220, 180, 80, 0.1); border-left: 3px solid #dcb450; padding: 12px 16px; margin-bottom: 30px;">
                <p style="margin: 0; color: #dcb450; font-size: 14px; font-weight: bold; font-family: monospace;">REFERENCE: ${refCode}</p>
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px; font-size: 14px; line-height: 1.6;">
                <tr><td style="padding-bottom: 12px; color: #a1a1aa; width: 130px;"><strong>Client Name:</strong></td><td style="padding-bottom: 12px; color: #fff;">${formData.name}</td></tr>
                <tr><td style="padding-bottom: 12px; color: #a1a1aa;"><strong>Email:</strong></td><td style="padding-bottom: 12px; color: #fff;"><a href="mailto:${formData.email}" style="color: #dcb450; text-decoration: none;">${formData.email}</a></td></tr>
                <tr><td style="padding-bottom: 12px; color: #a1a1aa;"><strong>Phone:</strong></td><td style="padding-bottom: 12px; color: #fff;">${formData.phone}</td></tr>
                <tr><td style="padding-bottom: 12px; color: #a1a1aa;"><strong>Organization:</strong></td><td style="padding-bottom: 12px; color: #fff;">${formData.company || 'N/A'}</td></tr>
                <tr><td style="padding-bottom: 12px; color: #a1a1aa;"><strong>Service:</strong></td><td style="padding-bottom: 12px; color: #fff;">${formData.service}</td></tr>
                <tr><td style="padding-bottom: 12px; color: #a1a1aa;"><strong>Location:</strong></td><td style="padding-bottom: 12px; color: #fff;">${formData.location}</td></tr>
                <tr><td style="padding-bottom: 12px; color: #a1a1aa;"><strong>Timeline:</strong></td><td style="padding-bottom: 12px; color: #fff;">${formData.preferred_date}</td></tr>
                <tr><td style="padding-bottom: 12px; color: #a1a1aa;"><strong>Budget:</strong></td><td style="padding-bottom: 12px; color: #fff;">${formData.budget || 'N/A'}</td></tr>
              </table>

              <div style="margin-bottom: 30px;">
                <p style="margin: 0 0 10px 0; color: #a1a1aa; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Project Brief</p>
                <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 6px; padding: 16px; color: #d4d4d8; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${formData.message}</div>
              </div>

              <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #27272a;">
                <a href="https://www.centuryimagery.com/admin/bookings" style="display: inline-block; background-color: #dcb450; color: #000; padding: 14px 28px; text-decoration: none; font-weight: bold; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; border-radius: 4px;">Open in Admin Dashboard</a>
              </div>
            </div>
          </div>
        `
      });

      // B. Client Confirmation Email
      const clientEmailResponse = await resend.emails.send({
        from: `Century Imagery <${resendFromEmail}>`,
        to: [formData.email],
        subject: `Commission Brief Received: ${refCode}`,
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #09090b; color: #e4e4e7; border-radius: 8px; overflow: hidden; border: 1px solid #27272a;">
            <div style="background-color: #111113; padding: 40px 30px; text-align: center; border-bottom: 1px solid #27272a;">
              <h1 style="margin: 0; color: #dcb450; font-size: 22px; letter-spacing: 4px; text-transform: uppercase;">Century Imagery</h1>
            </div>
            
            <div style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #fff;">Dear ${formData.name},</p>
              
              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #a1a1aa;">
                Thank you for reaching out to Century Imagery. We have successfully received your project inquiry and secured it under reference <strong style="color: #dcb450;">${refCode}</strong>.
              </p>
              
              <p style="margin: 0 0 30px 0; font-size: 15px; line-height: 1.6; color: #a1a1aa;">
                Our creative directors and production desk are currently reviewing your brief, timeline, and location requirements. We aim to respond to all commissions within 24–48 hours to discuss technical requirements and the next steps for a creative treatment call.
              </p>

              <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 6px; padding: 24px; margin-bottom: 30px;">
                <p style="margin: 0 0 16px 0; color: #dcb450; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">Inquiry Summary</p>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; line-height: 1.6;">
                  <tr><td style="padding-bottom: 8px; color: #71717a; width: 100px;">Service:</td><td style="padding-bottom: 8px; color: #e4e4e7;">${formData.service}</td></tr>
                  <tr><td style="padding-bottom: 8px; color: #71717a;">Timeline:</td><td style="padding-bottom: 8px; color: #e4e4e7;">${formData.preferred_date}</td></tr>
                  <tr><td style="padding-bottom: 0; color: #71717a;">Location:</td><td style="padding-bottom: 0; color: #e4e4e7;">${formData.location}</td></tr>
                </table>
              </div>

              <p style="margin: 0 0 30px 0; font-size: 15px; line-height: 1.6; color: #a1a1aa;">
                We look forward to the possibility of collaborating with you.
              </p>

              <div style="border-top: 1px solid #27272a; padding-top: 24px;">
                <p style="margin: 0; font-size: 14px; font-weight: bold; color: #fff;">Century Imagery Team</p>
                <a href="https://www.centuryimagery.com" style="display: block; margin-top: 4px; font-size: 13px; color: #dcb450; text-decoration: none;">www.centuryimagery.com</a>
              </div>
            </div>
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

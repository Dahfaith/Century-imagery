'use server'

import { createClient } from '@/lib/supabase/server'
import nodemailer from 'nodemailer'

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
  // Validate input
  if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.preferred_date || !formData.location || !formData.message) {
    return { error: 'Validation failed: Missing required fields.' }
  }
  
  if (formData.message.length < 25) {
    return { error: 'Validation failed: Please provide more details regarding your project.' }
  }

  // Generate Reference Code (e.g. CI-2026-84732)
  const refCode = `CI-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`

  // Use the server client (which uses anon key, but we validate fields here)
  const supabase = await createClient()

  const { data, error } = await (supabase.from('bookings') as any)
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
      // admin_notes is explicitly omitted
    })

  if (error) {
    console.error('Booking Insert Error:', error)
    return { error: 'Failed to submit booking. Please try again later.' }
  }

  // Send Email Notification to Owner
  try {
    const { SMTP_USER, SMTP_PASS } = process.env;
    
    if (SMTP_USER && SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"Century Imagery Booking" <${SMTP_USER}>`,
        to: 'Centuryimagery@gmail.com',
        subject: `New Project Commission: ${refCode} - ${formData.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
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
            <p style="font-size: 12px; color: #888;">Log in to the Admin Dashboard to manage this booking.</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.warn('SMTP_USER and SMTP_PASS are not set. Skipping email notification.');
    }
  } catch (emailError) {
    console.error('Email Notification Error:', emailError);
    // We do not fail the booking if the email fails.
  }

  return { success: true, referenceCode: refCode }
}

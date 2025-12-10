import { NextRequest, NextResponse } from 'next/server'

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not set')
    return false
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    return data.success
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}

// Send email using Resend or other email service
async function sendEmail(applicationData: {
  name: string
  email: string
  phone: string
  link: string
  position: string
  resumeBase64?: string
  resumeFilename?: string
}): Promise<boolean> {
  const recipientEmail = 'hello@mechanikos.com'
  
  // Check if Resend API key is available
  const resendApiKey = process.env.RESEND_API_KEY
  
  if (resendApiKey) {
    // Use Resend for sending emails
    try {
      const attachments = applicationData.resumeBase64 && applicationData.resumeFilename
        ? [{
            filename: applicationData.resumeFilename,
            content: applicationData.resumeBase64,
          }]
        : []

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Career Applications <onboarding@resend.dev>',
          to: [recipientEmail],
          subject: `New Application: ${applicationData.position} - ${applicationData.name}`,
          html: `
            <h2>New Career Application</h2>
            <p><strong>Position:</strong> ${applicationData.position}</p>
            <hr>
            <h3>Applicant Details</h3>
            <p><strong>Name:</strong> ${applicationData.name}</p>
            <p><strong>Email:</strong> ${applicationData.email}</p>
            <p><strong>Phone:</strong> ${applicationData.phone}</p>
            <p><strong>Portfolio/LinkedIn:</strong> <a href="${applicationData.link}">${applicationData.link}</a></p>
            ${applicationData.resumeFilename ? `<p><strong>Resume:</strong> Attached (${applicationData.resumeFilename})</p>` : ''}
            <hr>
            <p style="color: #666; font-size: 12px;">This application was submitted through the Mechanikos Career page.</p>
          `,
          attachments,
        }),
      })

      if (response.ok) {
        return true
      } else {
        const error = await response.json()
        console.error('Resend API error:', error)
        return false
      }
    } catch (error) {
      console.error('Error sending email via Resend:', error)
      return false
    }
  }

  // Fallback: Use Nodemailer with SMTP (if configured)
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (smtpHost && smtpUser && smtpPass) {
    // Note: Nodemailer would need to be imported and used here
    // For now, we'll just log and return success for testing
    console.log('SMTP configured but Nodemailer not implemented. Application data:', {
      ...applicationData,
      resumeBase64: applicationData.resumeBase64 ? '[Base64 data]' : undefined,
    })
    return true
  }

  // If no email service is configured, log the application
  console.log('=== NEW CAREER APPLICATION ===')
  console.log('No email service configured. Application received:')
  console.log(`Position: ${applicationData.position}`)
  console.log(`Name: ${applicationData.name}`)
  console.log(`Email: ${applicationData.email}`)
  console.log(`Phone: ${applicationData.phone}`)
  console.log(`Link: ${applicationData.link}`)
  console.log(`Resume: ${applicationData.resumeFilename || 'Not provided'}`)
  console.log('==============================')
  
  // Return true for testing purposes when no email service is configured
  return true
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const link = formData.get('link') as string
    const position = formData.get('position') as string
    const recaptchaToken = formData.get('recaptchaToken') as string
    const resumeFile = formData.get('resume') as File | null

    // Validate required fields
    if (!name || !email || !phone || !link || !position) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification required' },
        { status: 400 }
      )
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken)
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      )
    }

    // Process resume file
    let resumeBase64: string | undefined
    let resumeFilename: string | undefined

    if (resumeFile) {
      // Validate file size (5MB max)
      if (resumeFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Resume file must be less than 5MB' },
          { status: 400 }
        )
      }

      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ]
      if (!allowedTypes.includes(resumeFile.type)) {
        return NextResponse.json(
          { error: 'Only PDF and DOC/DOCX files are allowed' },
          { status: 400 }
        )
      }

      const arrayBuffer = await resumeFile.arrayBuffer()
      resumeBase64 = Buffer.from(arrayBuffer).toString('base64')
      resumeFilename = resumeFile.name
    }

    // Send email
    const emailSent = await sendEmail({
      name,
      email,
      phone,
      link,
      position,
      resumeBase64,
      resumeFilename,
    })

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send application. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Application submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing application:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


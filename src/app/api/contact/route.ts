import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Initialize transporter outside of the route handler for reuse
let transporter: nodemailer.Transporter | null = null;

// Initialize the transporter
async function initializeTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('Missing email configuration');
    throw new Error('Email configuration is missing');
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verify the connection
    try {
      await transporter.verify();
      console.log('Email server connection verified');
    } catch (error) {
      console.error('Email server verification failed:', error);
      transporter = null;
      throw error;
    }
  }

  return transporter;
}

export async function POST(req: NextRequest) {
  console.log('Received contact form submission');
  
  try {
    // Initialize email transporter
    const emailTransporter = await initializeTransporter();
    
    // Parse and validate request body
    const body = await req.json();
    console.log('Received body:', body);

    const { name, email, phone, inquiryType, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !inquiryType || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Basic validation
    if (typeof name !== 'string' || typeof email !== 'string' || 
        typeof phone !== 'string' || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid data types provided' },
        { status: 400 }
      );
    }

    // Simple email validation
    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Simple phone validation (just check if it has 10 digits after removing non-digits)
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit phone number' },
        { status: 400 }
      );
    }

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission - ${inquiryType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 10px 0;"><strong style="color: #555;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Phone:</strong> ${phone}</p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Inquiry Type:</strong> ${inquiryType}</p>
            <div style="margin: 10px 0;">
              <strong style="color: #555;">Message:</strong>
              <p style="margin: 10px 0; padding: 10px; background-color: white; border-radius: 3px;">${message}</p>
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px; text-align: center;">
            This email was sent from your website's contact form
          </p>
        </div>
      `,
    };

    // Send email
    console.log('Sending email...');
    await emailTransporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in contact form API:', {
      error,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
    });
    
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
} 
import nodemailer from 'nodemailer';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, inquiryType, message } = request.body;

    // Validate required fields
    if (!name || !email || !phone || !inquiryType || !message) {
      return response.status(400).json({ error: 'All fields are required' });
    }

    // Basic validation
    if (!email.includes('@')) {
      return response.status(400).json({ error: 'Please enter a valid email address' });
    }

    // Simple phone validation
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      return response.status(400).json({ error: 'Please enter a valid 10-digit phone number' });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: import.meta.env.VITE_EMAIL_USER,
        pass: import.meta.env.VITE_EMAIL_PASSWORD,
      },
    });

    console.log('Email configuration:', {
      hasUser: !!import.meta.env.VITE_EMAIL_USER,
      hasPassword: !!import.meta.env.VITE_EMAIL_PASSWORD
    });

    // Email content
    const mailOptions = {
      from: import.meta.env.VITE_EMAIL_USER,
      to: import.meta.env.VITE_EMAIL_USER,
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
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    return response.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error in contact form API:', error);
    return response.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
} 
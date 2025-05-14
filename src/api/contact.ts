import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, inquiryType, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !inquiryType || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Format date for email
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: import.meta.env.VITE_EMAIL_USER,
        pass: import.meta.env.VITE_EMAIL_PASSWORD,
      },
    });

    // Prepare email content
    const mailOptions = {
      from: `"Guruji Foils Website" <${import.meta.env.VITE_EMAIL_USER}>`,
      to: import.meta.env.VITE_EMAIL_USER,
      subject: `📬 New Inquiry: ${inquiryType} from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #A1E3F9, #D1F8EF); padding: 40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                  <tr>
                    <td align="center" style="font-size: 30px; font-weight: 700; color: #3674B5; padding-bottom: 12px;">
                      📬 You've Got a New Message!
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="font-size: 16px; color: #555; padding-bottom: 30px;">
                      Someone filled out your contact form — time to shine ✨
                    </td>
                  </tr>
                  <tr>
                    <td style="background: #f4f6f8; border-radius: 12px; padding: 24px; color: #333;">
                      <div style="margin-bottom: 18px;">
                        <strong style="color: #3674B5;">👤 Name:</strong> ${name}
                      </div>
                      <div style="margin-bottom: 18px;">
                        <strong style="color: #3674B5;">📧 Email:</strong> 
                        <a href="mailto:${email}" style="color: #578FCA; text-decoration: underline;">${email}</a>
                      </div>
                      <div style="margin-bottom: 18px;">
                        <strong style="color: #3674B5;">📱 Phone:</strong> ${phone}
                      </div>
                      <div style="margin-bottom: 18px;">
                        <strong style="color: #3674B5;">💼 Inquiry Type:</strong> ${inquiryType}
                      </div>
                      <div style="margin-top: 20px;">
                        <strong style="color: #3674B5;">📝 Message:</strong>
                        <div style="margin-top: 12px; background: #E9F8F3; border-left: 5px solid #3674B5; border-radius: 8px; padding: 15px; font-style: italic; color: #333; white-space: pre-line;">
                          ${message}
                        </div>
                      </div>
                      <div style="margin-top: 24px; font-size: 12px; color: #666; text-align: right;">
                        Received on ${formattedDate}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 
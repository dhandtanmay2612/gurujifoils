import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple log to confirm env vars are available
console.log('Email service initialized');

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, inquiryType, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !inquiryType || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Basic validation
    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    // Simple phone validation
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit phone number' });
    }

    // Check if email credentials are set
    if (!process.env.VITE_EMAIL_USER || !process.env.VITE_EMAIL_PASSWORD) {
      return res.status(500).json({ 
        error: 'Server configuration error. Please contact the administrator.'
      });
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
        user: process.env.VITE_EMAIL_USER,
        pass: process.env.VITE_EMAIL_PASSWORD,
      },
    });

    // Admin email with gradient design
    const mailOptions = {
      from: `"Guruji Foils Website" <${process.env.VITE_EMAIL_USER}>`,
      to: process.env.VITE_EMAIL_USER,
      subject: `📬 New Inquiry: ${inquiryType} from ${name}`,
      html: `
        <table width="100%" style="background: linear-gradient(135deg, #A1E3F9, #D1F8EF); padding: 40px 0; font-family: 'Segoe UI', sans-serif;">
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
                    <div style="margin-top: 20px; font-size: 14px; color: #666; font-style: italic;">
                      Received on: ${formattedDate}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 30px;">
                    <a href="mailto:${email}" style="background: linear-gradient(to right, #3674B5, #578FCA); color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 30px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: inline-block;">
                      📩 Reply to This Email
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-size: 12px; color: #888; padding-top: 24px;">
                    This message was sent from your website's contact form.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
    };

    // Customer confirmation email with matching design
    const customerMailOptions = {
      from: `"Guruji Foils" <${process.env.VITE_EMAIL_USER}>`,
      to: email,
      subject: `✨ Thank you for contacting Guruji Foils`,
      html: `
        <table width="100%" style="background: linear-gradient(135deg, #A1E3F9, #D1F8EF); padding: 40px 0; font-family: 'Segoe UI', sans-serif;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <img src="https://i.ibb.co/YWbmLhK/logo.png" alt="Guruji Foils" style="max-width: 150px; height: auto;">
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-size: 28px; font-weight: 700; color: #3674B5; padding-bottom: 12px;">
                    Thank You for Reaching Out!
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-size: 16px; color: #555; padding-bottom: 30px;">
                    We've received your message and will get back to you soon
                  </td>
                </tr>
                <tr>
                  <td style="background: #f4f6f8; border-radius: 12px; padding: 24px; color: #333;">
                    <p style="margin-top: 0; font-size: 16px;">Dear <strong>${name}</strong>,</p>
                    
                    <p style="font-size: 16px; line-height: 1.6;">
                      Thank you for contacting Guruji Foils. We've received your inquiry and our team will review it promptly. 
                      We strive to respond to all inquiries within 24-48 business hours.
                    </p>
                    
                    <div style="margin: 25px 0; background: #E9F8F3; border-radius: 10px; padding: 20px;">
                      <div style="font-weight: 600; color: #3674B5; font-size: 18px; margin-bottom: 15px;">
                        Your Inquiry Details:
                      </div>
                      <div style="margin-bottom: 10px;">
                        <strong style="color: #3674B5;">💼 Inquiry Type:</strong> ${inquiryType}
                      </div>
                      <div style="margin-bottom: 10px;">
                        <strong style="color: #3674B5;">📅 Date Submitted:</strong> ${formattedDate}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 25px 0 20px 0;">
                    <div style="font-weight: 600; color: #3674B5; font-size: 18px; margin-bottom: 15px;">
                      Our Contact Information:
                    </div>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="display: inline-block; background: #E9F8F3; border-radius: 50%; width: 28px; height: 28px; text-align: center; line-height: 28px; margin-right: 10px;">📱</span>
                          <strong>Phone:</strong> +91-9999-55-1918 / +91-8477-83-4579
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="display: inline-block; background: #E9F8F3; border-radius: 50%; width: 28px; height: 28px; text-align: center; line-height: 28px; margin-right: 10px;">📧</span>
                          <strong>Email:</strong> <a href="mailto:gurujifoils@gmail.com" style="color: #578FCA; text-decoration: underline;">gurujifoils@gmail.com</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="display: inline-block; background: #E9F8F3; border-radius: 50%; width: 28px; height: 28px; text-align: center; line-height: 28px; margin-right: 10px;">📍</span>
                          <strong>Address:</strong> Choudhary Mohalla, Village DhulSiras, Near Bus Stand, Gurugram, Haryana, India
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 10px; padding-bottom: 20px;">
                    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                      We look forward to serving you!
                    </p>
                    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 0;">
                      Best Regards,<br>
                      <strong>Guruji Foils Team</strong>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; font-size: 12px; color: #888;">
                    <p>This is an automated response. Please do not reply to this email.</p>
                    <p style="margin-bottom: 0;">&copy; ${new Date().getFullYear()} Guruji Foils. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
      text: `
Thank you for contacting Guruji Foils!

Dear ${name},

Thank you for reaching out to Guruji Foils. We've received your inquiry and our team will get back to you as soon as possible.

YOUR INQUIRY DETAILS:
- Inquiry Type: ${inquiryType}
- Date Submitted: ${formattedDate}

OUR CONTACT INFORMATION:
- Phone: +91-9999-55-1918 / +91-8477-83-4579
- Email: gurujifoils@gmail.com
- Address: Choudhary Mohalla, Village DhulSiras, Near Bus Stand, Gurugram, Haryana, India

We look forward to serving you!

Best Regards,
Guruji Foils Team

--
This is an automated response. Please do not reply to this email.
© ${new Date().getFullYear()} Guruji Foils. All rights reserved.
      `,
    };

    // Send emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(customerMailOptions);

    return res.status(200).json({ 
      message: 'Your message has been sent successfully! We will contact you soon.',
      customerEmail: email
    });
  } catch (error) {
    console.error('Contact form API error:', error.message);
    return res.status(500).json({ 
      error: 'Failed to send email. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Email service initialized on port ${PORT}`);
}); 
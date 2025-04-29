import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Request headers:', JSON.stringify(req.headers, null, 2));
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  next();
});

// Log environment check
console.log('Environment check:');
console.log('EMAIL_USER exists:', !!process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD exists:', !!process.env.EMAIL_PASSWORD);
console.log('PORT:', port);

// Initialize transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Received contact form submission:', {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      inquiryType: req.body.inquiryType,
      hasMessage: !!req.body.message
    });

    const { name, email, phone, inquiryType, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !inquiryType || !message) {
      console.log('Validation failed - missing fields:', {
        name: !!name,
        email: !!email,
        phone: !!phone,
        inquiryType: !!inquiryType,
        message: !!message
      });
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if email credentials are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('Email credentials missing:', {
        hasUser: !!process.env.EMAIL_USER,
        hasPassword: !!process.env.EMAIL_PASSWORD
      });
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

    // Prepare email content
    const mailOptions = {
      from: `"Guruji Foils Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
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

    console.log('Attempting to send email to:', process.env.EMAIL_USER);
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
});

// Health check endpoint with logging
app.get('/api/health', (req, res) => {
  console.log('Health check requested');
  const status = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      hasEmailConfig: !!(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD)
    }
  };
  console.log('Health check response:', status);
  res.json(status);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
}); 
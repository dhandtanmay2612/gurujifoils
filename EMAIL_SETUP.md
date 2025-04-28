# Email Contact Form Setup Instructions

This guide will help you set up the email contact form functionality in your Guruji Foils website.

## Step 1: Install Dependencies

First, install the required dependencies:

```bash
npm install dotenv
```

## Step 2: Create a Gmail App Password

Since the contact form uses Gmail to send emails, you need to create an App Password:

1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if you haven't already
4. Create an App Password:
   - Select "App" from the dropdown
   - Select "Other" and name it "Guruji Foils Website"
   - Copy the generated 16-character password

## Step 3: Set Up Environment Variables

Create a `.env` file in the root directory of your project with the following variables:

```
VITE_EMAIL_USER=your-gmail-address@gmail.com
VITE_EMAIL_PASSWORD=your-16-character-app-password
```

Replace the values with your actual Gmail address and the App Password you created.

## Step 4: Run the Development Servers

You need to run both the frontend and API servers together:

```bash
npm run dev:all
```

This command runs:
- The Vite frontend server (usually on port 5173 or 5174)
- The Express API server on port 8081

## Step 5: Test the Contact Form

1. Open your browser and go to the frontend URL (e.g., http://localhost:5173)
2. Navigate to the contact form
3. Fill in all the fields and submit the form
4. Check your console for logs to debug any issues

## Troubleshooting

If the contact form isn't working, check these common issues:

1. **API Server Not Running**: 
   - Make sure you're using `npm run dev:all` and not just `npm run dev`
   - Check terminal for any error messages in the API server

2. **Missing Environment Variables**:
   - Verify your `.env` file exists and has correct credentials
   - Restart both servers after creating/modifying the `.env` file

3. **Gmail Security Issues**:
   - Make sure you're using an App Password, not your regular password
   - Check if "Less secure app access" needs to be enabled in your Google account

4. **Network Issues**:
   - Check browser console for CORS errors
   - Verify the API endpoint URL in `Contact.tsx` is correctly pointing to `http://localhost:8081/api/contact`

5. **Email Sending Failures**:
   - Check server logs for detailed nodemailer errors
   - Try with a different Gmail account to rule out account-specific issues

## Production Deployment

For production deployment, you'll need to:

1. Set environment variables on your hosting platform
2. Configure your build to properly handle the API server
3. Consider using a dedicated email service like SendGrid or AWS SES for production use 
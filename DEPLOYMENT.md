# Deploying Guruji Foils to Vercel

This guide will walk you through deploying your Guruji Foils website to Vercel, including setting up the contact form API.

## Prerequisites

- A [Vercel](https://vercel.com) account
- Your GitHub repository with the Guruji Foils code

## Step 1: Set up Environment Variables

Before deploying, you need to set up your email credentials as environment variables in Vercel:

1. Go to your Vercel dashboard
2. Create a new project or select your existing project
3. Navigate to "Settings" → "Environment Variables"
4. Add the following variables:
   - `VITE_EMAIL_USER`: Your Gmail address
   - `VITE_EMAIL_PASSWORD`: Your Gmail app password

![Environment Variables](https://i.ibb.co/zSMGQ49/env-vars.png)

Make sure to select "Production", "Preview", and "Development" environments for both variables.

## Step 2: Deploy from GitHub

1. From your Vercel dashboard, click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure the project:
   - Framework Preset: Vite
   - Root Directory: ./
   - Build Command: The default should work (`npm run build`)
   - Output Directory: dist

4. Click "Deploy"

## Step 3: Verify Deployment

After deployment completes:

1. Visit your deployed site (Vercel will provide the URL)
2. Test the contact form by submitting a test message
3. Check if you receive the email notification

## Troubleshooting

If the contact form doesn't work after deployment:

1. **Check Environment Variables**: Make sure your email credentials are correctly set up in Vercel.
2. **Check Logs**: Go to Vercel dashboard → Your Project → Deployments → Latest Deployment → Functions → api/contact → Logs to see any error messages.
3. **Gmail Security**: Make sure you're using an App Password and not your regular Gmail password.
4. **Rate Limits**: Be aware that Gmail has sending limits (500 emails per day for regular accounts).

## Email Configuration for Production

For production use with higher volumes of emails, consider:

1. Switching to a dedicated email service like SendGrid, Mailgun, or AWS SES
2. Updating the `nodemailer` configuration to use your preferred service

## Custom Domain

To use your custom domain with Vercel:

1. Go to your Vercel project
2. Click "Settings" → "Domains"
3. Add your domain and follow the instructions for DNS configuration 
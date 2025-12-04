import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const oAuth2Client = new google.auth.OAuth2(
  process.env.EMAIL_CLIENT_ID,
  process.env.EMAIL_CLIENT_SECRET,
  "http://localhost:3000/api/auth/callback/google" 
);

oAuth2Client.setCredentials({
  refresh_token: process.env.EMAIL_REFRESH_TOKEN,
});

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USERNAME,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token, 
      },
    } as SMTPTransport.Options);

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Thanks for reaching out!",
      text: "We received your message and will get back to you shortly.",
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}

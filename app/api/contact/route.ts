import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const rateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  analytics: true,
  prefix: "@upstash/ratelimit/contact",
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";

  const { success } = await rateLimiter.limit(ip);

  if (!success) {
    return NextResponse.json(
      {
        error: "Too many messages! Please wait a while before sending another.",
      },
      { status: 429 },
    );
  }

  const { email, name, message, honeypot } = await request.json();

  if (honeypot) {
    return NextResponse.json({ message: "Freezed for bot behaviour." }, { status: 400 });
  }

  if (!email || !name || !message) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const clientMailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #3b82f6; margin-bottom: 20px;">Thank You for Reaching Out!</h2>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi ${name},</p>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Thank you for your message! I've received your inquiry and will get back to you shortly.
            </p>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-top: 20px;">
              Best regards,<br>
              <strong>Atharva</strong>
            </p>
          </div>
        </div>
      `,
    };

    const adminMailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.EMAIL_USERNAME,
      subject: `New Portfolio Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #3b82f6; margin-bottom: 20px;">New Contact Form Submission</h2>
            <div style="background-color: #f3f4f6; padding: 15px; margin: 15px 0; border-radius: 5px;">
              <p style="color: #666; font-size: 14px; margin: 0; font-weight: bold;">Name:</p>
              <p style="color: #333; font-size: 16px; margin: 5px 0 15px 0;">${name}</p>
              
              <p style="color: #666; font-size: 14px; margin: 0; font-weight: bold;">Email:</p>
              <p style="color: #333; font-size: 16px; margin: 5px 0 15px 0;">
                <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
              </p>
              
              <p style="color: #666; font-size: 14px; margin: 0; font-weight: bold;">Message:</p>
              <p style="color: #333; font-size: 16px; margin: 5px 0 0 0; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              Received at: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(clientMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 },
    );
  }
}

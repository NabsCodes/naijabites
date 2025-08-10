import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { sendEmail } from "@/lib/email";
import { getOTPConfig } from "@/lib/config";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

  const otpConfig = getOTPConfig();
  const cooldownKey = `otp:cooldown:${email}`;
  const existingCooldown = await redis.get(cooldownKey);

  if (existingCooldown) {
    return NextResponse.json({ error: "OTP already sent. Try again later." }, { status: 429 });
  }

  // Generate OTP with configurable length
  const min = Math.pow(10, otpConfig.code_length - 1);
  const max = Math.pow(10, otpConfig.code_length) - 1;
  const otp = Math.floor(min + Math.random() * (max - min + 1)).toString();

  try {
    // Save OTP and cooldown to Redis with configurable expiration times
    await redis.set(`otp:code:${email}`, otp, { ex: otpConfig.code_expiry });
    await redis.set(cooldownKey, "true", { ex: otpConfig.cooldown_expiry });

    // Send email with configurable template
    const expiryMinutes = Math.floor(otpConfig.code_expiry / 60);
    const emailContent = otpConfig.email.template
      .replace('{otp}', otp)
      .replace('{expiry_minutes}', expiryMinutes.toString());
    await sendEmail(email, emailContent);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error sending OTP:", err);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}

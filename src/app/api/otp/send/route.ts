import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { sendEmail } from "@/lib/email";
import { getOTPConfig } from "@/lib/config";

export async function POST(req: NextRequest) {
  try {
    console.log("🔄 OTP API called");
    
    const body = await req.json();
    console.log("📨 Request body:", body);
    
    const { email } = body;
    if (!email) {
      console.log("❌ No email provided");
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    console.log("📧 Processing OTP for email:", email);

    // Check if Redis is available
    let redisAvailable = false;
    try {
      await redis.ping();
      console.log("✅ Redis connection successful");
      redisAvailable = true;
    } catch (redisError) {
      console.error("❌ Redis connection failed:", redisError);
      console.log("⚠️ Continuing without Redis (development mode)");
      redisAvailable = false;
    }

    const otpConfig = getOTPConfig();
    console.log("⚙️ OTP Config:", otpConfig);
    
    const cooldownKey = `otp:cooldown:${email}`;
    const existingCooldown = await redis.get(cooldownKey);

    if (existingCooldown) {
      console.log("⏰ Cooldown active for:", email);
      return NextResponse.json({ error: "OTP already sent. Try again later." }, { status: 429 });
    }

    // Generate OTP with configurable length
    const min = Math.pow(10, otpConfig.code_length - 1);
    const max = Math.pow(10, otpConfig.code_length) - 1;
    const otp = Math.floor(min + Math.random() * (max - min + 1)).toString();
    console.log("🔐 Generated OTP:", otp);

    try {
      // Save OTP and cooldown to Redis if available
      if (redisAvailable) {
        await redis.set(`otp:code:${email}`, otp, { ex: otpConfig.code_expiry });
        await redis.set(cooldownKey, "true", { ex: otpConfig.cooldown_expiry });
        console.log("💾 OTP saved to Redis");
      } else {
        console.log("⚠️ Skipping Redis storage (development mode)");
      }

      // Send email with configurable template
      const expiryMinutes = Math.floor(otpConfig.code_expiry / 60);
      const emailContent = otpConfig.email.template
        .replace('{otp}', otp)
        .replace('{expiry_minutes}', expiryMinutes.toString());
      
      console.log("📧 Sending email...");
      try {
        await sendEmail(email, emailContent);
        console.log("✅ Email sent successfully");
      } catch (emailError) {
        console.error("❌ Email sending failed:", emailError);
        if (!redisAvailable) {
          // In development mode without Redis, still return success but log the OTP
          console.log("🔐 Development OTP (email failed):", otp);
          return NextResponse.json({ 
            success: true, 
            message: "OTP generated (email service unavailable)",
            otp: otp,
            development: true,
            emailError: "Email service failed"
          });
        }
        throw emailError; // Re-throw if Redis is available
      }

      return NextResponse.json({ 
        success: true, 
        message: "OTP sent successfully",
        otp: redisAvailable ? undefined : otp, // Show OTP in development mode
        development: !redisAvailable
      });
    } catch (err) {
      console.error("❌ Error in OTP process:", err);
      return NextResponse.json({ 
        error: "Failed to send OTP",
        details: err instanceof Error ? err.message : "Unknown error"
      }, { status: 500 });
    }
  } catch (err) {
    console.error("❌ Fatal error in OTP API:", err);
    return NextResponse.json({ 
      error: "Internal server error",
      details: err instanceof Error ? err.message : "Unknown error"
    }, { status: 500 });
  }
}

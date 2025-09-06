import { NextResponse } from "next/server";

export async function GET() {
  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
      redis: "unknown",
      email: "unknown",
    },
    environment: {
      nodeEnv: process.env.NODE_ENV || "unknown",
      hasRedisUrl: !!process.env.UPSTASH_REDIS_REST_URL,
      hasRedisToken: !!process.env.UPSTASH_REDIS_REST_TOKEN,
      hasResendKey: !!process.env.RESEND_API_KEY,
      hasSendgridKey: !!process.env.SENDGRID_API_KEY,
    }
  };

  // Test Redis connection
  try {
    const { redis } = await import("@/lib/redis");
    await redis.ping();
    health.services.redis = "connected";
  } catch (error) {
    health.services.redis = "error";
    console.error("Redis health check failed:", error);
  }

  // Test email service
  try {
    const { sendEmail } = await import("@/lib/email");
    health.services.email = "available";
  } catch (error) {
    health.services.email = "error";
    console.error("Email service health check failed:", error);
  }

  return NextResponse.json(health);
} 
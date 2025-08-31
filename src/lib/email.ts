//  resend for first try
import { Resend } from "resend";
// sendgrid for second try
import sgMail from "@sendgrid/mail";

const resend = new Resend(process.env.RESEND_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendEmail(recipient: string, content: string) {
  try {
    // Check if we have the required API key
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const response = await resend.emails.send({
      from: "Naijabites <no-reply@resend.dev>", // TODO: change to noreply@naijabites.com
      // to: recipient, TODO: change to recipient
      to: "admin@starboyholdings.com",
      subject: "Your Naijabites OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #166534; text-align: center; margin-bottom: 30px;">🔐 Your OTP Code</h2>
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
              ${content}
            </div>
            <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 30px;">
              If you didn't request this code, please ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="color: #9ca3af; font-size: 12px; text-align: center;">
              © ${new Date().getFullYear()} NaijaBites. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    console.log("🟢 Email sent successfully to:", recipient);
    console.log("📧 Email response:", response);
    return response;
  } catch (err) {
    console.error("🔴 Email send failed for recipient:", recipient);
    console.error("🔴 Error details:", err);

    // Try SendGrid as fallback if Resend fails
    try {
      if (process.env.SENDGRID_API_KEY) {
        console.log("🔄 Trying SendGrid as fallback...");
        return await resendEmail(recipient, content);
      }
    } catch (fallbackErr) {
      console.error("🔴 SendGrid fallback also failed:", fallbackErr);
    }

    throw err;
  }
}

export async function resendEmail(to: string, content: string) {
  const msg = {
    to,
    from: "no-reply@naijabites.com", // Must be verified
    subject: "Your Naijabites OTP Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #166534; text-align: center; margin-bottom: 30px;">🔐 Your OTP Code</h2>
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            ${content}
          </div>
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 30px;">
            If you didn't request this code, please ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">
            © ${new Date().getFullYear()} NaijaBites. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  try {
    const response = await sgMail.send(msg);
    console.log("🟢 SendGrid email sent successfully to:", to);
    return response;
  } catch (error) {
    console.error("🔴 SendGrid email send failed:", error);
    throw error;
  }
}

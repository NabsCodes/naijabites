// scripts/test-email.ts
import { sendEmail } from '../lib/email';

async function main() {
  try {
    const result = await sendEmail('admin@starboyholdings.com', 'Your OTP code is <b>123456</b>');
    console.log('✅ Email sent:', result);
  } catch (err) {
    console.error('❌ Failed to send email:', err);
  }
}

main();

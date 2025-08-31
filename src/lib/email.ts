//  resend for first try
 import { Resend } from 'resend';
 // sendgrid for second try
import sgMail from '@sendgrid/mail';

const resend = new Resend(process.env.RESEND_API_KEY); 
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);


export async function sendEmail(recipient: string, content: string) {
  try {
    const response = await resend.emails.send({
      from: 'Naijabites <no-reply@resend.dev>', // TODO: change to noreply@naijabites.com
      // to: recipient, TODO: change to recipient 
      to: 'admin@starboyholdings.com',
      subject: 'Your Naijabites OTP Code',
      html: `<p>${content}</p>`,
    });
    console.log('🟢 Email sent successfully:', response);
    return response;
  } catch (err) {
    console.error('🔴 Email send failed:', err);
    throw err;
  }
}




export async function resendEmail(to: string, content: string) {
  const msg = {
    to,
    from: 'no-reply@naijabites.com', // Must be verified
    subject: 'Your Naijabites OTP Code',
    html: `<p>${content}</p>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('🔴 Email send failed:', error);
    throw error;
  }
}


import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter for Zoho Mail
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
    minVersion: 'TLSv1.2'
  },
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Verify transporter configuration (non-blocking)
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter.verify()
    .then(() => {
      console.log('✅ SMTP server is ready to send emails (Zoho Mail)');
    })
    .catch((error) => {
      console.warn('⚠️  SMTP verification failed (emails may not work):', error.message);
      console.warn('   Server will continue running. Check SMTP credentials and firewall settings.');
    });
} else {
  console.warn('⚠️  SMTP credentials not configured. Email functionality will be disabled.');
}

// Get admin email recipients as array
const getAdminEmails = () => {
  return process.env.ADMIN_EMAILS.split(',').map(email => email.trim());
};

// Send contact form notification to admins
export async function sendContactNotification(contactData) {
  const adminEmails = getAdminEmails();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: adminEmails.join(', '),
    subject: `New Contact Form Submission from ${contactData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><strong style="color: #667eea;">Name:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;">${contactData.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><strong style="color: #667eea;">Email:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;"><a href="mailto:${contactData.email}" style="color: #667eea; text-decoration: none;">${contactData.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><strong style="color: #667eea;">Company:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;">${contactData.company || 'Not provided'}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message</h3>
            <p style="color: #555; line-height: 1.6; margin: 0;">${contactData.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f4f8; border-left: 4px solid #667eea; border-radius: 4px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>📅 Submitted:</strong> ${new Date().toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p style="margin: 0;">This is an automated notification from Aexon Contact Form</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Contact notification email sent to admins');
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending contact notification:', error);
    return { success: false, error: error.message };
  }
}

// Send confirmation email to user who submitted contact form
export async function sendContactConfirmation(contactData) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: contactData.email,
    subject: 'Thank You for Contacting Aexon Technologies',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 32px;">Thank You!</h1>
        </div>
        <div style="background: #f9f9f9; padding: 40px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Hi ${contactData.name},</h2>
            <p style="color: #555; line-height: 1.8; font-size: 16px;">
              Thank you for reaching out to <strong style="color: #667eea;">Aexon Technologies</strong>! 
              We have received your message and our team will review it shortly.
            </p>
            <p style="color: #555; line-height: 1.8; font-size: 16px;">
              We typically respond within <strong>24-48 hours</strong> during business days. 
              If your inquiry is urgent, please feel free to call us directly.
            </p>
            
            <div style="background: #f0f4ff; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #667eea;">
              <h3 style="color: #667eea; margin-top: 0; font-size: 18px;">Your Message Summary</h3>
              <p style="color: #666; margin: 10px 0; line-height: 1.6;">${contactData.message}</p>
            </div>
            
            <p style="color: #555; line-height: 1.8; font-size: 16px;">
              In the meantime, feel free to explore our website to learn more about our services and solutions.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://aexontech.com" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px;">Visit Our Website</a>
            </div>
            
            <div style="border-top: 2px solid #eee; margin-top: 30px; padding-top: 20px;">
              <p style="color: #999; font-size: 14px; margin: 5px 0;">
                <strong style="color: #667eea;">Aexon Technologies</strong><br>
                Email: <a href="mailto:info@aexontech.com" style="color: #667eea; text-decoration: none;">info@aexontech.com</a><br>
                Website: <a href="https://aexontech.com" style="color: #667eea; text-decoration: none;">www.aexontech.com</a>
              </p>
            </div>
          </div>
        </div>
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Aexon Technologies. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent to user');
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error);
    return { success: false, error: error.message };
  }
}

// Send job application notification to admins
export async function sendJobApplicationNotification(applicationData, jobTitle) {
  const adminEmails = getAdminEmails();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: adminEmails.join(', '),
    subject: `New Job Application for ${jobTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">New Job Application</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #11998e; padding-bottom: 10px;">Position Applied For</h2>
            <p style="font-size: 20px; color: #11998e; font-weight: bold; margin: 15px 0;">${jobTitle}</p>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #11998e; padding-bottom: 10px;">Applicant Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><strong style="color: #11998e;">Name:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;">${applicationData.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><strong style="color: #11998e;">Email:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;"><a href="mailto:${applicationData.email}" style="color: #11998e; text-decoration: none;">${applicationData.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><strong style="color: #11998e;">Phone:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;">${applicationData.phone || 'Not provided'}</td>
              </tr>
              ${applicationData.resume_url ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><strong style="color: #11998e;">Resume:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;"><a href="${applicationData.resume_url}" style="color: #11998e; text-decoration: none;">View Resume</a></td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          ${applicationData.cover_letter ? `
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #11998e; padding-bottom: 10px;">Cover Letter</h3>
            <p style="color: #555; line-height: 1.6; margin: 0; white-space: pre-line;">${applicationData.cover_letter}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f8f5; border-left: 4px solid #11998e; border-radius: 4px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>📅 Applied:</strong> ${new Date().toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p style="margin: 0;">This is an automated notification from Aexon Careers Portal</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Job application notification email sent to admins');
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending job application notification:', error);
    return { success: false, error: error.message };
  }
}

// Send confirmation email to applicant
export async function sendApplicationConfirmation(applicationData, jobTitle) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: applicationData.email,
    subject: `Application Received - ${jobTitle} at Aexon Technologies`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 32px;">Application Received!</h1>
        </div>
        <div style="background: #f9f9f9; padding: 40px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Hi ${applicationData.name},</h2>
            <p style="color: #555; line-height: 1.8; font-size: 16px;">
              Thank you for applying for the <strong style="color: #11998e;">${jobTitle}</strong> position at 
              <strong style="color: #11998e;">Aexon Technologies</strong>!
            </p>
            <p style="color: #555; line-height: 1.8; font-size: 16px;">
              We have successfully received your application and our recruitment team will carefully review your profile.
            </p>
            
            <div style="background: #e8f8f5; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #11998e;">
              <h3 style="color: #11998e; margin-top: 0; font-size: 18px;">What Happens Next?</h3>
              <ul style="color: #666; line-height: 1.8; margin: 10px 0; padding-left: 20px;">
                <li>Our team will review your application within <strong>5-7 business days</strong></li>
                <li>If your profile matches our requirements, we'll contact you for the next steps</li>
                <li>You'll receive updates via email at <strong>${applicationData.email}</strong></li>
              </ul>
            </div>
            
            <p style="color: #555; line-height: 1.8; font-size: 16px;">
              We appreciate your interest in joining our team and wish you the best of luck with your application!
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://aexontech.com/careers" style="display: inline-block; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px;">View More Opportunities</a>
            </div>
            
            <div style="border-top: 2px solid #eee; margin-top: 30px; padding-top: 20px;">
              <p style="color: #999; font-size: 14px; margin: 5px 0;">
                <strong style="color: #11998e;">Aexon Technologies</strong><br>
                Email: <a href="mailto:info@aexontech.com" style="color: #11998e; text-decoration: none;">info@aexontech.com</a><br>
                Website: <a href="https://aexontech.com" style="color: #11998e; text-decoration: none;">www.aexontech.com</a>
              </p>
            </div>
          </div>
        </div>
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Aexon Technologies. All rights reserved.</p>
          <p style="margin: 5px 0;">Please do not reply to this email. For inquiries, contact us at info@aexontech.com</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Application confirmation email sent to applicant');
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending application confirmation:', error);
    return { success: false, error: error.message };
  }
}

export default transporter;

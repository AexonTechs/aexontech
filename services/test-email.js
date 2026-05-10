import dotenv from 'dotenv';
import { 
  sendContactNotification, 
  sendContactConfirmation,
  sendJobApplicationNotification,
  sendApplicationConfirmation 
} from './mailer.js';

dotenv.config();

console.log('🧪 Testing Email Configuration...\n');

// Test data
const testContact = {
  name: 'Test User',
  email: 'test@example.com',
  company: 'Test Company',
  message: 'This is a test message to verify email configuration is working correctly.'
};

const testApplication = {
  name: 'Test Applicant',
  email: 'applicant@example.com',
  phone: '+1234567890',
  resume_url: 'https://example.com/resume.pdf',
  cover_letter: 'This is a test cover letter to verify job application emails are working correctly.'
};

const testJobTitle = 'Senior Software Engineer';

async function runTests() {
  console.log('📧 Email Configuration:');
  console.log(`   SMTP Host: ${process.env.SMTP_HOST}`);
  console.log(`   SMTP Port: ${process.env.SMTP_PORT}`);
  console.log(`   From Email: ${process.env.EMAIL_FROM}`);
  console.log(`   Admin Emails: ${process.env.ADMIN_EMAILS}\n`);

  console.log('⏳ Running email tests...\n');

  try {
    // Test 1: Contact form notification to admins
    console.log('1️⃣ Testing contact form notification to admins...');
    const result1 = await sendContactNotification(testContact);
    if (result1.success) {
      console.log('   ✅ Contact notification sent successfully\n');
    } else {
      console.log('   ❌ Failed to send contact notification\n');
    }

    // Test 2: Contact form confirmation to user
    console.log('2️⃣ Testing contact form confirmation to user...');
    const result2 = await sendContactConfirmation(testContact);
    if (result2.success) {
      console.log('   ✅ Contact confirmation sent successfully\n');
    } else {
      console.log('   ❌ Failed to send contact confirmation\n');
    }

    // Test 3: Job application notification to admins
    console.log('3️⃣ Testing job application notification to admins...');
    const result3 = await sendJobApplicationNotification(testApplication, testJobTitle);
    if (result3.success) {
      console.log('   ✅ Job application notification sent successfully\n');
    } else {
      console.log('   ❌ Failed to send job application notification\n');
    }

    // Test 4: Job application confirmation to applicant
    console.log('4️⃣ Testing job application confirmation to applicant...');
    const result4 = await sendApplicationConfirmation(testApplication, testJobTitle);
    if (result4.success) {
      console.log('   ✅ Job application confirmation sent successfully\n');
    } else {
      console.log('   ❌ Failed to send job application confirmation\n');
    }

    console.log('✅ All email tests completed!\n');
    console.log('📬 Check the following inboxes:');
    console.log('   - asthikshetty0@gmail.com');
    console.log('   - ombaikerikar1@gmail.com');
    console.log('   - harimarathi224@gmail.com');
    console.log('   - test@example.com (contact confirmation)');
    console.log('   - applicant@example.com (application confirmation)\n');
    console.log('💡 Note: Check spam folders if emails are not in inbox\n');

  } catch (error) {
    console.error('❌ Error during email tests:', error);
  }

  process.exit(0);
}

runTests();

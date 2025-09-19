import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

async function testEmailService() {
  console.log('🧪 Testing Nodemailer directly...\n');

  try {
    // Test 1: Create transporter
    console.log('1️⃣ Creating Gmail transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || 'jhasonal9142@gmail.com',
        pass: process.env.EMAIL_APP_PASSWORD || 'wpltxdaidyueikxt'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    console.log('✅ Transporter created successfully!\n');

    // Test 2: Verify connection
    console.log('2️⃣ Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified!\n');

    // Test 3: Send test email
    console.log('3️⃣ Sending test email...');
    const mailOptions = {
      from: {
        name: 'i2lense Contact Form Test',
        address: process.env.EMAIL_USER || 'jhasonal9142@gmail.com'
      },
      to: 'jhasonal9142@gmail.com',
      subject: '🧪 Test Email - Contact Form Functionality',
      text: 'This is a test email to verify the contact form email functionality is working correctly.',
      html: `
        <h2>🧪 Test Email</h2>
        <p>This is a test email to verify the contact form email functionality is working correctly.</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Status:</strong> Email service is working! ✅</p>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', result.messageId);
    console.log('📬 Email sent to: jhasonal9142@gmail.com\n');

    console.log('🎉 All tests passed! Nodemailer is working correctly.');
    console.log('📧 Check your inbox at jhasonal9142@gmail.com for the test email.');

  } catch (error) {
    console.error('❌ Email service test failed:');
    console.error('Error:', error.message);
    
    if (error.code) {
      console.error('Error Code:', error.code);
    }
    
    if (error.response) {
      console.error('SMTP Response:', error.response);
    }

    console.log('\n🔧 Troubleshooting Tips:');
    console.log('1. Check that Gmail 2FA is enabled for jhasonal9142@gmail.com');
    console.log('2. Verify the app password is correct: wpltxdaidyueikxt');
    console.log('3. Ensure "Less secure app access" is disabled (use app password instead)');
    console.log('4. Check your internet connection');
    console.log('5. Verify Gmail SMTP settings are correct');
  }
}

// Run the test
testEmailService();

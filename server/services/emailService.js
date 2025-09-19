import nodemailer from 'nodemailer';
import { logError, logInfo } from '../../src/utils/logger.js';

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    try {
      // Gmail SMTP configuration
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER || 'jhasonal9142@gmail.com',
          pass: process.env.EMAIL_APP_PASSWORD || 'wpltxdaidyueikxt'
        },
        tls: {
          rejectUnauthorized: false
        },
        debug: process.env.NODE_ENV === 'development', // Enable debug in development
        logger: process.env.NODE_ENV === 'development' // Enable logging in development
      });

      logInfo('Email transporter initialized successfully');
    } catch (error) {
      logError('Failed to initialize email transporter', error);
      throw error;
    }
  }

  async verifyConnection() {
    try {
      if (!this.transporter) {
        throw new Error('Email transporter not initialized');
      }

      await this.transporter.verify();
      logInfo('Email service connection verified successfully');
      return true;
    } catch (error) {
      logError('Email service connection verification failed', error);
      throw error;
    }
  }

  generateContactFormEmailHTML(formData) {
    const { name, email, phone, date, eventType, message } = formData;
    
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .email-container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #f5a623;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #f5a623;
            margin: 0;
            font-size: 28px;
          }
          .header p {
            color: #666;
            margin: 10px 0 0 0;
            font-size: 16px;
          }
          .form-data {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .field {
            margin-bottom: 15px;
            padding: 10px;
            background-color: #ffffff;
            border-radius: 5px;
            border-left: 4px solid #f5a623;
          }
          .field-label {
            font-weight: bold;
            color: #333;
            display: block;
            margin-bottom: 5px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .field-value {
            color: #555;
            font-size: 16px;
            word-wrap: break-word;
          }
          .message-field {
            background-color: #f0f8ff;
            border-left-color: #007bff;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 14px;
          }
          .timestamp {
            background-color: #e9ecef;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            margin: 20px 0;
            font-size: 14px;
            color: #666;
          }
          .priority-badge {
            display: inline-block;
            background-color: #28a745;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>📧 New Contact Form Submission</h1>
            <p>i2lense Photography & Videography Platform</p>
            <div class="priority-badge">NEW INQUIRY</div>
          </div>

          <div class="form-data">
            <div class="field">
              <span class="field-label">👤 Name</span>
              <div class="field-value">${name}</div>
            </div>

            <div class="field">
              <span class="field-label">📧 Email</span>
              <div class="field-value">
                <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
              </div>
            </div>

            ${phone ? `
            <div class="field">
              <span class="field-label">📞 Phone</span>
              <div class="field-value">
                <a href="tel:${phone}" style="color: #007bff; text-decoration: none;">${phone}</a>
              </div>
            </div>
            ` : ''}

            ${date ? `
            <div class="field">
              <span class="field-label">📅 Event Date</span>
              <div class="field-value">${new Date(date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</div>
            </div>
            ` : ''}

            ${eventType ? `
            <div class="field">
              <span class="field-label">🎯 Event Type</span>
              <div class="field-value">${eventType.charAt(0).toUpperCase() + eventType.slice(1)}</div>
            </div>
            ` : ''}

            <div class="field message-field">
              <span class="field-label">💬 Message</span>
              <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>

          <div class="timestamp">
            📅 Received on: ${new Date().toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short'
            })}
          </div>

          <div class="footer">
            <p><strong>Next Steps:</strong></p>
            <p>• Reply to this email to respond directly to the customer</p>
            <p>• Contact them within 24 hours for best response rates</p>
            <p>• Add their details to your CRM system</p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
            <p>This email was automatically generated by the i2lense contact form.</p>
            <p style="color: #999; font-size: 12px;">
              If you're receiving this in error, please contact your system administrator.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateContactFormEmailText(formData) {
    const { name, email, phone, date, eventType, message } = formData;
    
    return `
NEW CONTACT FORM SUBMISSION - i2lense

Contact Details:
================
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${date ? `Event Date: ${new Date(date).toLocaleDateString()}` : ''}
${eventType ? `Event Type: ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}` : ''}

Message:
========
${message}

Submission Details:
==================
Received: ${new Date().toLocaleString()}
Platform: i2lense Photography & Videography Platform

Next Steps:
===========
- Reply to this email to respond directly to the customer
- Contact them within 24 hours for best response rates
- Add their details to your CRM system

---
This email was automatically generated by the i2lense contact form.
    `.trim();
  }

  async sendContactFormEmail(formData) {
    try {
      if (!this.transporter) {
        throw new Error('Email transporter not initialized');
      }

      const { name, email } = formData;
      const recipientEmail = process.env.CONTACT_EMAIL || 'jhasonal9142@gmail.com';

      const mailOptions = {
        from: {
          name: 'i2lense Contact Form',
          address: process.env.EMAIL_USER || 'jhasonal9142@gmail.com'
        },
        to: recipientEmail,
        replyTo: email,
        subject: `🎯 New Contact Form Submission from ${name}`,
        text: this.generateContactFormEmailText(formData),
        html: this.generateContactFormEmailHTML(formData),
        headers: {
          'X-Priority': '1',
          'X-MSMail-Priority': 'High',
          'Importance': 'high'
        }
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      logInfo('Contact form email sent successfully', {
        messageId: result.messageId,
        from: email,
        to: recipientEmail,
        name: name
      });

      return result;
    } catch (error) {
      logError('Failed to send contact form email', error, {
        formData: { ...formData, message: '[REDACTED]' }
      });
      throw error;
    }
  }

  async sendTestEmail() {
    try {
      const testFormData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '+1 (555) 123-4567',
        date: new Date().toISOString().split('T')[0],
        eventType: 'wedding',
        message: 'This is a test message to verify the email service is working correctly. If you receive this email, the contact form functionality is properly configured.'
      };

      return await this.sendContactFormEmail(testFormData);
    } catch (error) {
      logError('Failed to send test email', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const emailService = new EmailService();
export default emailService;

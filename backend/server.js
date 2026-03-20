import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Per-drafter Email Configuration
const drafterEmails = {
  'thilak.drafters@gmail.com': {
    user: process.env.EMAIL_THILAK_USER,
    pass: process.env.EMAIL_THILAK_PASSWORD,
  },
  'pramith.drafters@gmail.com': {
    user: process.env.EMAIL_PRAMITH_USER,
    pass: process.env.EMAIL_PRAMITH_PASSWORD,
  },
  'ayush.drafters@gmail.com': {
    user: process.env.EMAIL_AYUSH_USER,
    pass: process.env.EMAIL_AYUSH_PASSWORD,
  },
  'abhishek.drafter@gmail.com': {
    user: process.env.EMAIL_ABHISHEK_USER,
    pass: process.env.EMAIL_ABHISHEK_PASSWORD,
  },
};

function getTransporter(drafterEmail) {
  const creds = drafterEmails[drafterEmail];
  if (!creds || !creds.user || !creds.pass) {
    // Fallback to first available credentials
    const fallback = Object.values(drafterEmails).find(c => c.user && c.pass);
    if (!fallback) return null;
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user: fallback.user, pass: fallback.pass },
    });
  }
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: creds.user, pass: creds.pass },
  });
}

// Send Reminder Email
app.post('/api/send-reminder', async (req, res) => {
  try {
    const {
      drafterName,
      drafterEmail,
      trackingCode,
      clientName,
      reminderType,
      dueDate,
      reminderDays,
      additionalComment,
    } = req.body;

    const transporter = getTransporter(drafterEmail);
    if (!transporter) {
      return res.status(500).json({ success: false, message: 'No email credentials configured for this drafter' });
    }

    const creds = drafterEmails[drafterEmail];
    const fromEmail = (creds && creds.user) || drafterEmail;

    const mailOptions = {
      from: fromEmail,
      to: drafterEmail,
      subject: `📋 Patent Reminder: ${reminderType} - ${trackingCode}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; }
            .reminder-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; border-radius: 4px; }
            .field { margin: 15px 0; }
            .label { font-weight: 600; color: #667eea; font-size: 12px; text-transform: uppercase; }
            .value { font-size: 16px; color: #333; margin-top: 5px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; text-align: center; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📋 Patent Reminder Notification</h1>
              <p>A new reminder has been set for you</p>
            </div>
            <div class="content">
              <p>Hello <strong>${drafterName}</strong>,</p>
              <p>A new patent reminder has been created and assigned to you. Please review the details below:</p>
              
              <div class="reminder-box">
                <div class="field">
                  <div class="label">Reminder Type</div>
                  <div class="value">${reminderType}</div>
                </div>
                
                <div class="field">
                  <div class="label">Tracking Code</div>
                  <div class="value">${trackingCode}</div>
                </div>
                
                <div class="field">
                  <div class="label">Client Name</div>
                  <div class="value">${clientName}</div>
                </div>
                
                <div class="field">
                  <div class="label">Due Date</div>
                  <div class="value">${new Date(dueDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                
                <div class="field">
                  <div class="label">Reminder Alert</div>
                  <div class="value">${reminderDays} day(s) before due date</div>
                </div>
                
                ${additionalComment ? `
                <div class="field">
                  <div class="label">Additional Comments</div>
                  <div class="value">${additionalComment}</div>
                </div>
                ` : ''}
              </div>
              
              <p>Please ensure you complete this task by the due date. If you have any questions, please reach out to your supervisor.</p>
              
              <div class="footer">
                <p>This is an automated notification from the Patent Reminder System. Please do not reply to this email.</p>
                <p>&copy; 2024 Patent Reminder System. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Patent Reminder API Server is running', timestamp: new Date() });
});

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Patent Reminder System API Server',
    version: '1.0.0',
    endpoints: {
      'POST /api/send-reminder': 'Send reminder email to drafter',
      'GET /api/health': 'Check server health'
    }
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Patent Reminder API Server running on port ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  const configuredDrafters = Object.entries(drafterEmails).filter(([, c]) => c.user && c.pass).map(([email]) => email);
  console.log(`📧 Email configured for ${configuredDrafters.length} drafters: ${configuredDrafters.join(', ') || 'None'}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

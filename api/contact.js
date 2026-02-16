// German Auto Specialists - Contact Form Handler
// Sends auto-reply + notification via SendGrid

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

async function sendEmail({ to, from, subject, html, replyTo }) {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from },
      reply_to: replyTo ? { email: replyTo } : undefined,
      subject,
      content: [{ type: 'text/html', value: html }],
    }),
  });
  return response.ok;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, phone, vehicle, service, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const siteName = 'German Auto Specialists';
    const siteEmail = process.env.SITE_EMAIL || 'vincen@germanautospecialists.com';
    const fromEmail = process.env.FROM_EMAIL || 'leads@gullstack.com';

    // Send confirmation to lead
    if (SENDGRID_API_KEY) {
      const confirmationHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a1a; padding: 30px; text-align: center;">
            <h1 style="color: #c4a052; margin: 0;">Thanks, ${name}!</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <p style="font-size: 16px; color: #333;">We've received your message and Vinny will get back to you within 24 hours.</p>
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
              <p style="margin: 5px 0;"><strong>Vehicle:</strong> ${vehicle || 'Not specified'}</p>
              <p style="margin: 5px 0;"><strong>Service:</strong> ${service || 'General inquiry'}</p>
              <p style="margin: 5px 0;"><strong>Message:</strong> ${message || 'N/A'}</p>
            </div>
            <p style="font-size: 16px; color: #333; margin-top: 20px;">Need faster help? Call Vinny directly: <strong>(801) 432-8790</strong></p>
          </div>
          <div style="background: #1a1a1a; padding: 20px; text-align: center;">
            <p style="color: #888; margin: 0; font-size: 14px;">${siteName} — Expert German Auto Repair in West Jordan, UT</p>
          </div>
        </div>
      `;

      await sendEmail({
        to: email,
        from: fromEmail,
        subject: `Thanks for contacting ${siteName}!`,
        html: confirmationHtml,
      });

      // Send notification to business
      const notificationHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #c4a052; padding: 20px; text-align: center;">
            <h1 style="color: #1a1a1a; margin: 0;">🔔 New Lead!</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${phone || 'Not provided'}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Vehicle:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${vehicle || 'Not specified'}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Service:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${service || 'General inquiry'}</td></tr>
            </table>
            <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px; border: 1px solid #ddd;">
              <strong>Message:</strong><br/>
              <p style="margin: 10px 0 0 0;">${message || 'No message'}</p>
            </div>
          </div>
        </div>
      `;

      await sendEmail({
        to: siteEmail,
        from: fromEmail,
        subject: `🔔 New Lead: ${name} - ${vehicle || service || 'General'}`,
        html: notificationHtml,
        replyTo: email,
      });
    }

    const acceptsHtml = req.headers.accept?.includes('text/html');
    if (acceptsHtml) {
      return res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Message Sent | ${siteName}</title>
          <meta http-equiv="refresh" content="3;url=/" />
          <style>
            body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #1a1a1a; color: white; }
            .container { text-align: center; padding: 2rem; }
            h1 { color: #c4a052; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>✓ Message Sent!</h1>
            <p>Thanks ${name}! Vinny will be in touch soon.</p>
          </div>
        </body>
        </html>
      `);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

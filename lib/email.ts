import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface PassEmailData {
  to: string;
  name: string;
  college: string;
  track: string;
  role: string;
  passId: string;
}

function buildPassEmail(data: PassEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NIRVAN '26 — Your Private Consultation Pass</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background-color: #0a0608;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #f3f4f6;
    }

    .email-wrapper {
      max-width: 600px;
      margin: 20px auto;
      background: #0e0c12;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
    }

    /* ── HEADER ── */
    .header {
      background: linear-gradient(180deg, #16121b 0%, #0e0c12 100%);
      padding: 44px 40px 28px;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .header-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 999px;
      padding: 4px 16px;
      font-size: 10px;
      color: #ffffff;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      margin-bottom: 14px;
    }

    .header-title {
      font-family: 'Dancing Script', cursive, Georgia, serif;
      font-size: 42px;
      font-weight: 700;
      color: #ffffff;
      line-height: 1;
    }

    .header-sub {
      font-size: 11px;
      color: rgba(255,255,255,0.5);
      letter-spacing: 0.2em;
      margin-top: 8px;
      text-transform: uppercase;
    }

    /* ── GREETING ── */
    .greeting {
      padding: 32px 40px 0;
    }

    .greeting h2 {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 26px;
      font-weight: 400;
      color: #fff;
      font-style: italic;
    }

    .greeting p {
      margin-top: 10px;
      font-size: 14px;
      color: rgba(255,255,255,0.65);
      line-height: 1.7;
    }

    /* ── PASS CARD ── */
    .pass-card {
      margin: 28px 40px;
      border-radius: 18px;
      background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%);
      border: 1px solid rgba(255,255,255,0.18);
      overflow: hidden;
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2);
    }

    .pass-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }

    .pass-event {
      font-family: 'Dancing Script', cursive;
      font-size: 22px;
      color: #fff;
    }

    .pass-role-badge {
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.25);
      border-radius: 999px;
      padding: 4px 14px;
      font-size: 10px;
      font-weight: 600;
      color: #ffffff;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .pass-body {
      padding: 24px;
    }

    .pass-name {
      font-size: 24px;
      font-weight: 600;
      color: #ffffff;
      letter-spacing: 0.02em;
      margin-bottom: 4px;
    }

    .pass-detail {
      font-size: 13px;
      color: rgba(255,255,255,0.55);
      margin-bottom: 8px;
    }

    .pass-focus {
      display: inline-block;
      background: rgba(255,255,255,0.06);
      border-left: 3px solid #ffffff;
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 12px;
      color: #ffffff;
      margin-top: 8px;
    }

    .pass-id-row {
      margin-top: 20px;
      padding-top: 14px;
      border-top: 1px dashed rgba(255,255,255,0.12);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .pass-id-label {
      font-size: 9px;
      color: rgba(255,255,255,0.4);
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }

    .pass-id-value {
      font-family: monospace;
      font-size: 13px;
      font-weight: 600;
      color: #ffffff;
      letter-spacing: 0.08em;
    }

    /* ── EVENT INFO ── */
    .info-section {
      margin: 0 40px 28px;
    }

    .info-grid {
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      background: rgba(255,255,255,0.02);
      overflow: hidden;
    }

    .info-row {
      display: flex;
      padding: 12px 18px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      font-size: 13px;
      color: rgba(255,255,255,0.7);
    }

    .info-row:last-child {
      border-bottom: none;
    }

    .info-row strong {
      color: #fff;
      margin-right: 8px;
      font-weight: 600;
    }

    /* ── CTA BUTTON ── */
    .cta-section {
      margin: 0 40px 32px;
      text-align: center;
    }

    .cta-btn {
      display: inline-block;
      background: #ffffff;
      color: #0a0608;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.12em;
      padding: 14px 32px;
      border-radius: 999px;
      text-decoration: none;
      text-transform: uppercase;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
    }

    /* ── FOOTER ── */
    .footer {
      background: rgba(255,255,255,0.02);
      border-top: 1px solid rgba(255,255,255,0.06);
      padding: 24px 40px;
      text-align: center;
    }

    .footer p {
      font-size: 11px;
      color: rgba(255,255,255,0.35);
      line-height: 1.8;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">

    <!-- Header -->
    <div class="header">
      <div class="header-badge">Consultation Confirmed</div>
      <div class="header-title">NIRVAN &apos;26</div>
      <div class="header-sub">Luxury Beauty &amp; Holistic Wellness</div>
    </div>

    <!-- Greeting -->
    <div class="greeting">
      <h2>Dear ${data.name.split(' ')[0]}, your consultation is reserved.</h2>
      <p>
        Thank you for trusting <strong style="color:#fff">NIRVAN '26</strong> with your wellness journey.
        Your official digital reservation pass has been generated below.
      </p>
    </div>

    <!-- Pass Card -->
    <div class="pass-card">
      <div class="pass-header">
        <div class="pass-event">NIRVAN &apos;26</div>
        <div class="pass-role-badge">${data.role}</div>
      </div>
      <div class="pass-body">
        <div class="pass-name">${data.name}</div>
        <div class="pass-detail">${data.college}</div>
        <div class="pass-focus">✦ Focus: ${data.track}</div>
        <div class="pass-id-row">
          <div class="pass-id-label">Reservation Pass ID</div>
          <div class="pass-id-value">${data.passId}</div>
        </div>
      </div>
    </div>

    <!-- Event Info -->
    <div class="info-section">
      <div class="info-grid">
        <div class="info-row">
          <strong>Practitioner:</strong> Dr. Mia Callahan &amp; Senior Wellness Team
        </div>
        <div class="info-row">
          <strong>Service:</strong> ${data.track}
        </div>
        <div class="info-row">
          <strong>Format:</strong> Private 1-on-1 Sanctuary Consultation
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="cta-section">
      <a class="cta-btn" href="http://localhost:3000">Access Sanctuary Portal &rarr;</a>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>
        NIRVAN &apos;26 &mdash; Gentle touch. Radiant presence.<br/>
        Delivered with warmth and intention by <strong style="color:rgba(255,255,255,0.6)">KernelCore Studio</strong>.<br/>
        <a href="mailto:kernelcorestudio2026@gmail.com" style="color:rgba(255,255,255,0.5)">kernelcorestudio2026@gmail.com</a>
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();
}

export async function sendPassEmail(data: PassEmailData): Promise<void> {
  const html = buildPassEmail(data);

  await transporter.sendMail({
    from: `"NIRVAN '26 · Luxury Wellness" <${process.env.EMAIL_USER}>`,
    to: data.to,
    subject: `✨ Your NIRVAN '26 Consultation Pass — ${data.passId}`,
    html,
    text: `
NIRVAN '26 — LUXURY WELLNESS CONSULTATION CONFIRMED

Dear ${data.name},

Your consultation pass has been confirmed.
- Pass ID  : ${data.passId}
- Name     : ${data.name}
- City     : ${data.college}
- Focus    : ${data.track}
- Tier     : ${data.role}

We look forward to welcoming you.
— Dr. Mia Callahan & NIRVAN '26 Team
    `.trim(),
  });
}

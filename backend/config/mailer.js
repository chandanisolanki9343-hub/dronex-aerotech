import nodemailer from "nodemailer";

// SMTP transporter is created lazily (inside the send function) so that
// process.env vars are read AFTER dotenv has loaded them — not at module import time.
const createSmtpTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.error("[Mailer] EMAIL_USER or EMAIL_PASS is not set in environment variables!");
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    family: 4,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });
};

const getBrevoApiKey = () => {
  const k1 = process.env.BREVO_API_KEY;
  const k2 = process.env.BREVO__API__KEY;
  if (k1 && k1.startsWith("xkeysib-")) return k1;
  if (k2 && k2.startsWith("xkeysib-")) return k2;
  return k1 || k2;
};

// Unified sendMail — uses Brevo HTTP API if key is present (required on Render free tier
// which blocks outbound SMTP), otherwise falls back to Gmail SMTP (works locally).
export const sendEmail = async ({ to, subject, html, text }) => {
  const brevoApiKey = getBrevoApiKey();

  if (brevoApiKey) {
    console.log("[Mailer] Using Brevo HTTP API → sending to:", to);
    // Use the dedicated club email as Brevo verified sender
    const BREVO_VERIFIED_SENDER = "dronexaerotech.mitsduclub08@gmail.com";
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Dronex AeroTech", email: BREVO_VERIFIED_SENDER },
        to: [{ email: to }],
        subject,
        htmlContent: html || `<p>${text}</p>`,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("[Mailer] Brevo API error:", data);
      throw new Error(data.message || `Brevo API error: ${response.status}`);
    }
    console.log("[Mailer] Brevo email sent successfully to:", to);
    return data;
  } else {
    // Gmail SMTP fallback (works locally; blocked on Render free tier)
    console.log("[Mailer] Using Gmail SMTP → sending to:", to);
    console.log("[Mailer] EMAIL_USER:", process.env.EMAIL_USER || "(NOT SET)");
    const smtpTransporter = createSmtpTransporter();
    const result = await smtpTransporter.sendMail({
      from: `"Dronex AeroTech" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text,
    });
    console.log("[Mailer] Gmail SMTP email sent successfully to:", to);
    return result;
  }
};

// Nodemailer-compatible wrapper (drop-in for transporter.sendMail calls)
const mailer = {
  sendMail: async ({ from, to, subject, html, text }) => {
    return sendEmail({ to, subject, html, text });
  },
  verify: (callback) => {
    if (getBrevoApiKey()) {
      console.log("[Mailer] Brevo API active — SMTP verification skipped.");
      callback(null, true);
    } else {
      console.log("[Mailer] Verifying Gmail SMTP connection...");
      createSmtpTransporter().verify(callback);
    }
  },
};

export default mailer;

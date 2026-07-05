import nodemailer from "nodemailer";

// Fallback SMTP Transporter (works locally)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  family: 4,
  connectionTimeout: 5000,
  greetingTimeout: 5000,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Unified sendMail function that automatically switches to Brevo HTTPS API on Render Free Tier
export const sendEmail = async ({ to, subject, html, text }) => {
  if (process.env.BREVO_API_KEY) {
    console.log("Using Brevo HTTP API to send email to:", to);
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Dronex AeroTech",
          email: process.env.EMAIL_USER || "chandanisolanki9343@gmail.com",
        },
        to: [
          {
            email: to,
          },
        ],
        subject: subject,
        htmlContent: html || text,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Brevo API error: ${response.status}`);
    }
    return data;
  } else {
    console.log("Using SMTP Transporter to send email to:", to);
    return transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: html,
      text: text,
    });
  }
};

const mailer = {
  sendMail: async ({ from, to, subject, html, text }) => {
    return sendEmail({ to, subject, html, text });
  },
  verify: (callback) => {
    if (process.env.BREVO_API_KEY) {
      console.log("Brevo API active - verification skipped (always active)");
      callback(null, true);
    } else {
      transporter.verify(callback);
    }
  }
};

export default mailer;

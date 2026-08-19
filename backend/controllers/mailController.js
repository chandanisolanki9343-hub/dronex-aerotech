import transporter from "../config/mailer.js";

export const sendTestMail = async (req, res) => {
  const diagnostics = {
    EMAIL_USER: process.env.EMAIL_USER || "(NOT SET)",
    EMAIL_PASS: process.env.EMAIL_PASS ? "SET (hidden)" : "(NOT SET)",
    BREVO_API_KEY: process.env.BREVO_API_KEY
      ? `SET — starts with: ${process.env.BREVO_API_KEY.substring(0, 12)}...`
      : "(NOT SET)",
    NODE_ENV: process.env.NODE_ENV || "not set",
  };

  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Dronex AeroTech — Email Diagnostic Test",
      html: `<p>✅ Email system is working. Sent at ${new Date().toISOString()}</p>`,
    });

    res.status(200).json({
      success: true,
      message: "Test email sent successfully — check your inbox!",
      diagnostics,
      result: result?.messageId || result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      diagnostics,
      stack: error.stack,
    });
  }
};

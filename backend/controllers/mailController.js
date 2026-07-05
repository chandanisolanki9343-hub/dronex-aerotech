import transporter from "../config/mailer.js";

const analyzeKey = (val) => {
  if (!val) return "Not defined";
  return {
    length: val.length,
    startsWith: val.substring(0, 10),
    endsWith: val.substring(val.length - 10),
    hasSpaces: val.trim() !== val,
    hasQuotes: (val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")),
    firstCharCodes: Array.from(val.substring(0, 5)).map(c => c.charCodeAt(0))
  };
};

export const sendTestMail = async (req, res) => {
  const brevoKey1 = process.env.BREVO_API_KEY;
  const brevoKey2 = process.env.BREVO__API__KEY;

  try {
    // Also try to send a test mail to verify connection
    let mailResponse = null;
    try {
      mailResponse = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "Dronex AeroTech Test Email",
        text: "Nodemailer / Brevo is working successfully!",
      });
    } catch (mailErr) {
      mailResponse = { error: mailErr.message };
    }

    res.status(200).json({
      success: true,
      diagnostics: {
        BREVO_API_KEY: analyzeKey(brevoKey1),
        BREVO__API__KEY: analyzeKey(brevoKey2),
        currentEnvUser: process.env.EMAIL_USER ? "Loaded" : "Missing"
      },
      mailResponse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

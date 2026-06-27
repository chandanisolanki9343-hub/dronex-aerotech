import transporter from "../config/mailer.js";

export const sendTestMail = async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Dronex AeroTech Test Email",
      text: "Nodemailer is working successfully!",
    });

    res.status(200).json({
      success: true,
      message: "Test email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import Recruitment from "../models/Recruitment.js";
import transporter from "../config/mailer.js";

// Submit Application
export const createApplication = async (req, res) => {
  try {
    const application = await Recruitment.create(req.body);

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: application.email,
        subject: "Application Received - Dronex AeroTech",
        html: `
          <h2>Thank You for Applying!</h2>
          <p>Your application has been received successfully.</p>
          <p>Our team will review it and contact you soon.</p>
          <br/>
          <h3>Dronex AeroTech</h3>
        `,
      });
    } catch (mailError) {
      console.error("Nodemailer failed to send email:", mailError.message);
    }

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Applications
export const getApplications = async (req, res) => {
  try {
    const applications = await Recruitment.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Status
export const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Recruitment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Application
export const deleteApplication = async (req, res) => {
  try {
    await Recruitment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Application deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

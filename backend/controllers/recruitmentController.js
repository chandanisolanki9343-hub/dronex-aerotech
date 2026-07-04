import Recruitment from "../models/Recruitment.js";
import transporter from "../config/mailer.js";

// Submit Application
export const createApplication = async (req, res) => {
  try {
    const application = await Recruitment.create(req.body);

    // 1. Send professional confirmation email to the applicant
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: application.email,
        subject: "Application Received - Dronex AeroTech",
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff; color: #333333;">
            <div style="text-align: center; border-bottom: 2px solid #28a745; padding-bottom: 15px; margin-bottom: 25px;">
              <h2 style="color: #28a745; margin: 0; font-size: 24px; letter-spacing: 1px;">DRONEX AEROTECH</h2>
              <p style="font-size: 14px; color: #666666; margin: 5px 0 0 0;">Recruitment & Membership Portal</p>
            </div>
            
            <div style="line-height: 1.6; font-size: 16px;">
              <p>Dear <strong>${application.name}</strong>,</p>
              
              <p>Thank you for your interest in joining <strong>Dronex AeroTech</strong>! We are writing to confirm that we have successfully received your recruitment application.</p>
              
              <div style="background-color: #f4faf6; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0; border-radius: 0 4px 4px 0;">
                <h4 style="margin: 0 0 10px 0; color: #28a745;">Application Summary</h4>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 4px 0; font-weight: bold; width: 120px; vertical-align: top;">Name:</td>
                    <td style="padding: 4px 0; color: #555555;">${application.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: bold; vertical-align: top;">Year:</td>
                    <td style="padding: 4px 0; color: #555555;">${application.year}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: bold; vertical-align: top;">Branch/Dept:</td>
                    <td style="padding: 4px 0; color: #555555;">${application.branch || application.department}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: bold; vertical-align: top;">Preferred Domain:</td>
                    <td style="padding: 4px 0; color: #555555;">${application.domain || application.skills || "N/A"}</td>
                  </tr>
                </table>
              </div>
              
              <p>Our review board is checking all applications. If your profile matches our requirements, we will contact you for an interview shortly.</p>
            </div>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #777777;">
              <p style="margin: 0 0 5px 0;">Best regards,</p>
              <p style="margin: 0; font-weight: bold; color: #28a745;">The Dronex AeroTech Recruitment Team</p>
            </div>
          </div>
        `,
      });
    } catch (mailError) {
      console.error("Nodemailer failed to send recruitment confirmation email to candidate:", mailError.message);
    }

    // 2. Send notification email to the Admin
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "chandanisolanki9343@gmail.com", // Developer Personal Email
        subject: `New Recruitment Application: ${application.name} - ${application.domain || application.skills}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h2 style="color: #28a745; margin-top: 0;">New Application Received</h2>
            <p>A student has applied to join Dronex AeroTech. Please find the summary below:</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 150px;">Applicant Name:</td>
                <td>${application.name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Email:</td>
                <td><a href="mailto:${application.email}">${application.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Phone:</td>
                <td>${application.phone}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Year:</td>
                <td>${application.year}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Branch / Dept:</td>
                <td>${application.branch || application.department}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Domain / Skills:</td>
                <td>${application.domain || application.skills}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; vertical-align: top;">Why Join / Msg:</td>
                <td style="white-space: pre-wrap;">${application.whyJoin || application.message || "N/A"}</td>
              </tr>
            </table>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="text-align: center; margin: 0;">
              <a href="http://localhost:5173/admin" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Review Application in Admin Dashboard</a>
            </p>
          </div>
        `
      });
    } catch (mailError) {
      console.error("Nodemailer failed to send recruitment admin notification email:", mailError.message);
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

    // Send selection email to candidate if status is updated to "Selected"
    if (req.body.status === "Selected" && application) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: application.email,
          subject: "Congratulations! You are selected for Dronex AeroTech 🎉",
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff; color: #333333;">
              <div style="text-align: center; border-bottom: 2px solid #0056b3; padding-bottom: 15px; margin-bottom: 25px;">
                <h2 style="color: #0056b3; margin: 0; font-size: 24px; letter-spacing: 1px;">CONGRATULATIONS!</h2>
                <p style="font-size: 14px; color: #666666; margin: 5px 0 0 0;">Dronex AeroTech Club Membership</p>
              </div>
              
              <div style="line-height: 1.6; font-size: 16px;">
                <p>Dear <strong>${application.name}</strong>,</p>
                
                <p>We are absolutely thrilled to inform you that your application to join <strong>Dronex AeroTech</strong> has been <strong>Approved</strong>! 🎉</p>
                
                <p>Our recruitment board was highly impressed by your skills and enthusiasm. You are now officially a member of Dronex AeroTech, working under the <strong>${application.domain || application.skills || "Technical"}</strong> department.</p>
                
                <div style="background-color: #f0f7ff; border-left: 4px solid #0056b3; padding: 15px; margin: 20px 0; border-radius: 0 4px 4px 0;">
                  <h4 style="margin: 0 0 10px 0; color: #0056b3;">Next Steps</h4>
                  <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #555555;">
                    <li style="margin-bottom: 8px;"><strong>Onboarding Session:</strong> We will send you an invite for the upcoming induction meeting soon.</li>
                    <li style="margin-bottom: 8px;"><strong>Slack/Discord Channels:</strong> You will receive a link to join our official communication channels shortly.</li>
                    <li style="margin-bottom: 0;"><strong>Hardware & Projects:</strong> Get ready to collaborate on building next-generation drones and fixed-wing aircraft!</li>
                  </ul>
                </div>
                
                <p>Once again, welcome to the team! We are excited to build the future of flight together with you.</p>
              </div>
              
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #777777;">
                <p style="margin: 0 0 5px 0;">Clear skies and happy flying,</p>
                <p style="margin: 0; font-weight: bold; color: #0056b3;">Parth Soni</p>
                <p style="margin: 0; font-size: 13px; color: #666666;">Club President, Dronex AeroTech</p>
              </div>
            </div>
          `,
        });
      } catch (mailError) {
        console.error("Nodemailer failed to send selection email to candidate:", mailError.message);
      }
    }

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

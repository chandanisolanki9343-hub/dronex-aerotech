import Message from "../models/Message.js";
import transporter from "../config/mailer.js";

// Submit Contact Form
export const createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);

    // Send confirmation email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: message.email,
        subject: `We've received your message: ${message.subject} - Dronex AeroTech`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff; color: #333333;">
            <div style="text-align: center; border-bottom: 2px solid #0056b3; padding-bottom: 15px; margin-bottom: 25px;">
              <h2 style="color: #0056b3; margin: 0; font-size: 24px; letter-spacing: 1px;">DRONEX AEROTECH</h2>
              <p style="font-size: 14px; color: #666666; margin: 5px 0 0 0;">Building the Future of Aerospace Technology</p>
            </div>
            
            <div style="line-height: 1.6; font-size: 16px;">
              <p>Dear <strong>${message.name}</strong>,</p>
              
              <p>Thank you for reaching out to <strong>Dronex AeroTech</strong>! We have successfully received your inquiry through our contact form.</p>
              
              <div style="background-color: #f7f9fa; border-left: 4px solid #0056b3; padding: 15px; margin: 20px 0; border-radius: 0 4px 4px 0;">
                <h4 style="margin: 0 0 10px 0; color: #0056b3;">Inquiry Summary</h4>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 4px 0; font-weight: bold; width: 80px; vertical-align: top;">Subject:</td>
                    <td style="padding: 4px 0; color: #555555;">${message.subject}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: bold; vertical-align: top;">Message:</td>
                    <td style="padding: 4px 0; color: #555555; white-space: pre-wrap;">${message.message}</td>
                  </tr>
                </table>
              </div>
              
              <p>Our team is currently reviewing your request and will get back to you within the next 24 to 48 hours.</p>
              
              <p>If you have any additional details to add in the meantime, feel free to reply directly to this email.</p>
            </div>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #777777;">
              <p style="margin: 0 0 5px 0;">Best regards,</p>
              <p style="margin: 0; font-weight: bold; color: #0056b3;">The Dronex AeroTech Support Team</p>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #999999;">This is an automated response to confirm receipt of your message. Please keep this email for your reference.</p>
            </div>
          </div>
        `,
      });
    } catch (mailError) {
      console.error("Nodemailer failed to send contact confirmation email:", mailError.message);
    }

    // Send notification email to Admin
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "chandanisolanki9343@gmail.com", // Developer Personal Email
        subject: `New Contact Inquiry: ${message.subject} from ${message.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h2 style="color: #0056b3; margin-top: 0;">New Contact Form Message</h2>
            <p>You have received a new inquiry from the Dronex website contact form.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 120px;">Sender Name:</td>
                <td>${message.name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Sender Email:</td>
                <td><a href="mailto:${message.email}">${message.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Subject:</td>
                <td>${message.subject}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; vertical-align: top;">Message:</td>
                <td style="white-space: pre-wrap;">${message.message}</td>
              </tr>
            </table>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="text-align: center; margin: 0;">
              <a href="http://localhost:5173/admin" style="background-color: #0056b3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Log in to Admin Dashboard</a>
            </p>
          </div>
        `
      });
    } catch (mailError) {
      console.error("Nodemailer failed to send contact admin notification email:", mailError.message);
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Messages (Admin)
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Message
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reply to Message
export const replyToMessage = async (req, res) => {
  try {
    const { replyText } = req.body;
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Send email using transporter
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: message.email,
      subject: `Re: ${message.subject} - Dronex AeroTech`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff; color: #333333;">
          <div style="text-align: center; border-bottom: 2px solid #0056b3; padding-bottom: 15px; margin-bottom: 25px;">
            <h2 style="color: #0056b3; margin: 0; font-size: 24px; letter-spacing: 1px;">DRONEX AEROTECH</h2>
            <p style="font-size: 14px; color: #666666; margin: 5px 0 0 0;">Official Reply to Your Inquiry</p>
          </div>
          
          <div style="line-height: 1.6; font-size: 16px;">
            <p>Dear <strong>${message.name}</strong>,</p>
            
            <p>This is in response to your recent inquiry regarding "<strong>${message.subject}</strong>".</p>
            
            <div style="background-color: #f7f9fa; border-left: 4px solid #0056b3; padding: 15px; margin: 20px 0; border-radius: 0 4px 4px 0;">
              <p style="margin: 0; color: #333333; white-space: pre-wrap;">${replyText}</p>
            </div>
            
            <p>If you have any further questions, feel free to reply directly to this thread.</p>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
          
          <div style="font-size: 13px; color: #666666; background-color: #fafafa; padding: 12px; border-radius: 6px;">
            <strong style="display: block; margin-bottom: 5px; color: #777;">Your Original Message:</strong>
            <p style="margin: 0; font-style: italic;">"${message.message}"</p>
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #777777;">
            <p style="margin: 0 0 5px 0;">Best regards,</p>
            <p style="margin: 0; font-weight: bold; color: #0056b3;">The Dronex AeroTech Support Team</p>
          </div>
        </div>
      `,
    });

    // Update Message document in DB
    message.isReplied = true;
    message.replyText = replyText;
    message.repliedAt = new Date();
    await message.save();

    res.status(200).json({
      success: true,
      message: "Reply sent successfully",
      messageData: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

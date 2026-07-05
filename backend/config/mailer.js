import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  family: 4, // Force IPv4 to prevent hanging on IPv6-unsupported cloud environments
  connectionTimeout: 5000, // 5 seconds connection timeout
  greetingTimeout: 5000, // 5 seconds greeting timeout
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;

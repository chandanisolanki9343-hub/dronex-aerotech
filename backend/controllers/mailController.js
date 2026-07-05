import nodemailer from "nodemailer";

export const sendTestMail = async (req, res) => {
  const results = {};

  // Test 1: service: "gmail" with family: 4
  try {
    const t1 = nodemailer.createTransport({
      service: "gmail",
      family: 4,
      connectionTimeout: 5000,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await new Promise((resolve, reject) => {
      t1.verify((err, success) => err ? reject(err) : resolve(success));
    });
    results.test1_service_gmail_family4 = "SUCCESS";
  } catch (error) {
    results.test1_service_gmail_family4 = "FAILED: " + error.message;
  }

  // Test 2: host/port 587 with family: 4
  try {
    const t2 = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      family: 4,
      connectionTimeout: 5000,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await new Promise((resolve, reject) => {
      t2.verify((err, success) => err ? reject(err) : resolve(success));
    });
    results.test2_smtp587_family4 = "SUCCESS";
  } catch (error) {
    results.test2_smtp587_family4 = "FAILED: " + error.message;
  }

  // Test 3: host/port 465 with family: 4
  try {
    const t3 = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      family: 4,
      connectionTimeout: 5000,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      }
    });
    await new Promise((resolve, reject) => {
      t3.verify((err, success) => err ? reject(err) : resolve(success));
    });
    results.test3_smtp465_family4 = "SUCCESS";
  } catch (error) {
    results.test3_smtp465_family4 = "FAILED: " + error.message;
  }

  // Test 4: service: "gmail" without family override (original behavior)
  try {
    const t4 = nodemailer.createTransport({
      service: "gmail",
      connectionTimeout: 5000,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await new Promise((resolve, reject) => {
      t4.verify((err, success) => err ? reject(err) : resolve(success));
    });
    results.test4_service_gmail_original = "SUCCESS";
  } catch (error) {
    results.test4_service_gmail_original = "FAILED: " + error.message;
  }

  res.status(200).json({
    success: true,
    results
  });
};

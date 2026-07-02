import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Gmail Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetEmail = async (email, name, token) => {
  try {
    // Reset Password Link
    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const mailOptions = {
      from: `"CCMS Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your CCMS Password",

      html: `
      <div style="font-family:Arial,sans-serif;background:#f4f6f9;padding:30px;">

        <div style="max-width:600px;margin:auto;background:white;border-radius:10px;padding:30px;box-shadow:0 5px 15px rgba(0,0,0,.1);">

          <h2 style="color:#2563eb;text-align:center;">
            Campus Complaint Management System
          </h2>

          <hr>

          <p>Hello <strong>${name}</strong>,</p>

          <p>
            We received a request to reset your password.
          </p>

          <p>
            Click the button below to create a new password.
          </p>

          <div style="text-align:center;margin:35px 0;">

            <a
              href="${resetLink}"
              style="
                background:#2563eb;
                color:white;
                padding:14px 28px;
                text-decoration:none;
                border-radius:8px;
                display:inline-block;
                font-weight:bold;
              "
            >
              Reset Password
            </a>

          </div>

          <p>
            Or copy and paste this link into your browser:
          </p>

          <p style="word-break:break-all;color:#2563eb;">
            ${resetLink}
          </p>

          <p style="color:#ef4444;font-weight:bold;">
            This link will expire in 15 minutes.
          </p>

          <hr>

          <p style="font-size:13px;color:#666;">
            If you did not request a password reset,
            please ignore this email.
          </p>

          <p style="font-size:13px;color:#666;">
            This is an automated email from CCMS.
          </p>

        </div>

      </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Password Reset Email Sent");

  } catch (error) {

    console.log("❌ Email Error");

    console.log(error);

  }
};

export default sendResetEmail;
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send complaint resolved email
const sendMail = async (
  studentEmail,
  studentName,
  complaintTitle,
  category,
  status
) => {
  try {
    const mailOptions = {
      from: `"CCMS Team" <${process.env.EMAIL_USER}>`,
      to: studentEmail,
      subject: "✅ Your Complaint Has Been Resolved",

      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;background:#f5f7fa;">
          
          <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;padding:30px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">

            <h2 style="color:#2563eb;text-align:center;">
              Campus Complaint Management System
            </h2>

            <hr>

            <p>Hello <strong>${studentName}</strong>,</p>

            <p>
              We are pleased to inform you that your complaint has been
              <strong style="color:green;">resolved successfully.</strong>
            </p>

            <table style="width:100%;border-collapse:collapse;margin-top:20px;">
              <tr>
                <td style="padding:10px;"><strong>Complaint</strong></td>
                <td style="padding:10px;">${complaintTitle}</td>
              </tr>

              <tr style="background:#f8fafc;">
                <td style="padding:10px;"><strong>Category</strong></td>
                <td style="padding:10px;">${category}</td>
              </tr>

              <tr>
                <td style="padding:10px;"><strong>Status</strong></td>
                <td style="padding:10px;color:green;">
                  ${status}
                </td>
              </tr>
            </table>

            <br>

            <p>
              Thank you for using the
              <strong>Campus Complaint Management System (CCMS)</strong>.
            </p>

            <p>
              If you continue to face the issue, you may submit a new complaint.
            </p>

            <br>

            <hr>

            <p style="font-size:13px;color:#777;text-align:center;">
              This is an automated email from CCMS.
              Please do not reply to this email.
            </p>

          </div>

        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email Sent Successfully");
    console.log(info.response);

  } catch (error) {

    console.log("❌ Email Sending Failed");
    console.log(error);

  }
};

export default sendMail;
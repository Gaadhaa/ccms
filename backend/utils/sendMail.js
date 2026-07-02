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

// Send Complaint Resolution Email
const sendMail = async (
  studentEmail,
  studentName,
  complaintTitle,
  category,
  status,
  remark
) => {
  try {
    const mailOptions = {
      from: `"CCMS Team" <${process.env.EMAIL_USER}>`,
      to: studentEmail,
      subject: "✅ Your Complaint Has Been Resolved",

      html: `
      <div style="font-family:Arial,sans-serif;background:#f4f6f9;padding:30px;">

        <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:12px;padding:30px;box-shadow:0 5px 15px rgba(0,0,0,.1);">

          <div style="text-align:center;">
            <h2 style="color:#2563eb;margin-bottom:5px;">
              Campus Complaint Management System
            </h2>

            <p style="color:#64748b;">
              Complaint Resolution Notification
            </p>
          </div>

          <hr>

          <p>Hello <strong>${studentName}</strong>,</p>

          <p>
            We are pleased to inform you that your complaint has been
            <strong style="color:green;">
              resolved successfully.
            </strong>
          </p>

          <table
            style="
              width:100%;
              border-collapse:collapse;
              margin-top:20px;
            "
          >

            <tr>
              <td
                style="
                  padding:12px;
                  background:#f8fafc;
                  font-weight:bold;
                  width:180px;
                "
              >
                Complaint
              </td>

              <td style="padding:12px;">
                ${complaintTitle}
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding:12px;
                  background:#f8fafc;
                  font-weight:bold;
                "
              >
                Category
              </td>

              <td style="padding:12px;">
                ${category}
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding:12px;
                  background:#f8fafc;
                  font-weight:bold;
                "
              >
                Status
              </td>

              <td
                style="
                  padding:12px;
                  color:green;
                  font-weight:bold;
                "
              >
                ${status}
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding:12px;
                  background:#f8fafc;
                  font-weight:bold;
                "
              >
                Admin Remark
              </td>

              <td
                style="
                  padding:12px;
                  color:#334155;
                "
              >
                ${
                  remark && remark.trim() !== ""
                    ? remark
                    : "No additional remarks provided."
                }
              </td>
            </tr>

          </table>

          <br>

          <div
            style="
              background:#eff6ff;
              border-left:5px solid #2563eb;
              padding:15px;
              border-radius:8px;
            "
          >
            <strong>Need Further Assistance?</strong>

            <p style="margin-top:8px;">
              If the issue still persists, you can
              submit a new complaint through the
              CCMS portal.
            </p>
          </div>

          <br>

          <p>
            Thank you for using the
            <strong>
              Campus Complaint Management System
            </strong>.
          </p>

          <hr>

          <p
            style="
              text-align:center;
              color:#94a3b8;
              font-size:13px;
            "
          >
            This is an automated email from CCMS.
            Please do not reply.
          </p>

        </div>

      </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Resolution Email Sent Successfully");

  } catch (error) {

    console.log("❌ Failed to Send Email");

    console.log(error);

  }
};

export default sendMail;
import express from "express";
import Complaint from "../models/Complaint.js";
import sendMail from "../utils/sendMail.js";

const router = express.Router();

// ================= GET ALL COMPLAINTS =================

router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({
      createdAt: -1,
    });

    res.json(complaints);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

// ================= CREATE COMPLAINT =================

router.post("/", async (req, res) => {

  try {

    let priority = "Low";

    if (
      req.body.category === "Internet" ||
      req.body.category === "Electrical"
    ) {
      priority = "High";
    }

    else if (
      req.body.category === "Hostel" ||
      req.body.category === "Transport"
    ) {
      priority = "Medium";
    }

    const complaint =
      await Complaint.create({

        title: req.body.title,

        category: req.body.category,

        status: "Pending",

        priority,

        remark: "",

        studentName:
          req.body.studentName,

        studentEmail:
          req.body.studentEmail,

      });

    res.status(201).json(
      complaint
    );

  } catch (error) {

    res.status(400).json({
      message: error.message,
    });

  }

});
// ================= UPDATE COMPLAINT =================

router.put("/:id", async (req, res) => {
  try {

    // Get existing complaint
    const oldComplaint = await Complaint.findById(
      req.params.id
    );

    if (!oldComplaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    // Update complaint
    const complaint =
      await Complaint.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
          remark: req.body.remark,
        },
        {
          new: true,
        }
      );

    // Send email only when status changes to Resolved
    if (
      oldComplaint.status !== "Resolved" &&
      complaint.status === "Resolved"
    ) {

      await sendMail(
        complaint.studentEmail,
        complaint.studentName,
        complaint.title,
        complaint.category,
        complaint.status,
        complaint.remark
      );

      console.log(
        "✅ Resolution email sent successfully."
      );
    }

    res.json(complaint);

  } catch (error) {

    console.log(error);

    res.status(400).json({
      message: error.message,
    });

  }
});
// ================= DELETE COMPLAINT =================

router.delete("/:id", async (req, res) => {

  try {

    const complaint =
      await Complaint.findById(req.params.id);

    if (!complaint) {

      return res.status(404).json({
        message: "Complaint not found",
      });

    }

    await Complaint.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Complaint Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});

// ================= EXPORT =================

export default router;
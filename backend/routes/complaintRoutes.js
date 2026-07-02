import express from "express";
import Complaint from "../models/Complaint.js";
import sendMail from "../utils/sendMail.js";

const router = express.Router();


// ================= GET ALL COMPLAINTS =================

router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find();
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
    } else if (
      req.body.category === "Hostel" ||
      req.body.category === "Transport"
    ) {
      priority = "Medium";
    }

    const complaint = await Complaint.create({
      ...req.body,
      priority,
    });

    res.status(201).json(complaint);

  } catch (error) {

    res.status(400).json({
      message: error.message,
    });

  }
});


// ================= UPDATE COMPLAINT =================

router.put("/:id", async (req, res) => {

  try {

    const oldComplaint = await Complaint.findById(
      req.params.id
    );

    const complaint =
      await Complaint.findByIdAndUpdate(
        req.params.id,
        req.body,
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
        complaint.status
      );

      console.log(
        "Resolution email sent successfully."
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

    await Complaint.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Complaint Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


export default router;
import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import User from "../models/User.js";
import sendResetEmail from "../utils/sendResetEmail.js";

const router = express.Router();

// ===========================
// STUDENT SIGNUP
// ===========================

router.post("/signup", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const exists = await User.findOne({
      email,
    });

    if (exists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registration Successful",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// ===========================
// STUDENT LOGIN
// ===========================

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    res.json({
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// ===========================
// FORGOT PASSWORD
// ===========================

router.post(
  "/forgot-password",
  async (req, res) => {

    try {

      const { email } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(404).json({
          message: "No account found with this email.",
        });
      }

      // Generate Secure Random Token

      const token =
        crypto.randomBytes(32).toString("hex");

      // Save Token

      user.resetPasswordToken =
        token;

      // Valid for 15 minutes

      user.resetPasswordExpires =
        Date.now() + 15 * 60 * 1000;

      await user.save();

      // Send Email

      await sendResetEmail(
        user.email,
        user.name,
        token
      );

      res.json({
        message:
          "Password reset link sent successfully.",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Something went wrong.",
      });

    }

  }
);
// ===========================
// RESET PASSWORD
// ===========================

router.post(
  "/reset-password/:token",
  async (req, res) => {

    try {

      const { token } = req.params;

      const { password } = req.body;

      // Find user using token

      const user =
        await User.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: {
            $gt: Date.now(),
          },
        });

      if (!user) {

        return res.status(400).json({
          message:
            "Reset link is invalid or has expired.",
        });

      }

      // Hash New Password

      const hashedPassword =
        await bcrypt.hash(password, 10);

      user.password = hashedPassword;

      // Remove token after successful reset

      user.resetPasswordToken = null;

      user.resetPasswordExpires = null;

      await user.save();

      res.json({
        message:
          "Password changed successfully.",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });

    }

  }
);


// ===========================
// EXPORT
// ===========================

export default router;
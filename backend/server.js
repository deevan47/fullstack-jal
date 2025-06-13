import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
const upload = multer({ dest: "uploads/" });

app.post("/api/send-pdf-email", upload.single("pdf"), async (req, res) => {
  const { email } = req.body;
  const file = req.file;

  console.log("Received email:", email);
  console.log("Received file:", file);

  if (!email || !file) {
    return res.status(400).send("Missing email or PDF file.");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Water Scorecard PDF Report",
      text: "Attached is your PDF scorecard from the Water Assessment Tool.",
      attachments: [
        {
          filename: file.originalname,
          path: file.path,
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", email);

    fs.unlinkSync(file.path);
    res.status(200).send("Email sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);

    if (file && file.path) {
      fs.unlinkSync(file.path);
    }

    res.status(500).send("Failed to send email");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

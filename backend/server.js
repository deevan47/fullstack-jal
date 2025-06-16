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
app.use(express.json()); 

const upload = multer({ dest: "uploads/" });

// API endpoint to send email with PDF
app.post("/api/send-pdf-email", upload.single("pdf"), async (req, res) => {
  const { email } = req.body;
  const file = req.file; 

  // Check if the email or file is missing and return error response
  if (!email || !file) {
    return res.status(400).send("Missing email or PDF file.");
  }

  try {
    // Set up the Nodemailer transporter for sending email via Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });

    // Define the email options, including hardcoded CC
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, 
      cc: "contact@jalsmruti.org", 
      subject: "JalSmruti Water Scorecard PDF Report",
      text: "Thank You for your Response, we are here to solve this issue for you, Thank you for your patience and will get back to you as soon as possible, thank you for your reposnse.",
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
    console.log("CC'd to: abcdef@gmail.com");

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

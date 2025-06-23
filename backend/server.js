import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import pg from "pg";
import multer from "multer";
import nodemailer from "nodemailer";

const app = express();
const upload = multer();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: ["https://frontend-hgu7.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

app.post("/api/submit", upload.none(), async (req, res) => {
  const form = req.body;

  // Required fields validation
  if (!form.fullName || !form.email) {
    return res.status(400).json({
      success: false,
      message: "Full name and email are required."
    });
  }

  // Map a default date if missing
  form.date = form.date || new Date().toISOString();

  const insertQuery = `
    INSERT INTO submissions (
      fullName, email, whatsapp, date, apartmentname, maplink, units,
      q1_1, q1_2, q1_3, q1_4,
      q2_1, q2_2, q2_3, q2_4, q2_5, q2_6,
      q3_1, q3_2, q3_3,
      q4_1, q4_2, q4_3,
      q5_1, q5_2, q5_3, q5_4
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      $8, $9, $10, $11,
      $12, $13, $14, $15, $16, $17,
      $18, $19, $20,
      $21, $22, $23,
      $24, $25, $26, $27
    ) RETURNING id;
  `;

  const values = [
    form.fullName, form.email, form.whatsapp || null, form.date, form.apartmentName || null,
    form.mapLink || null, form.units || null,
    form.q1_1 || null, form.q1_2 || null, form.q1_3 || null, form.q1_4 || null,
    form.q2_1 || null, form.q2_2 || null, form.q2_3 || null, form.q2_4 || null,
    form.q2_5 !== undefined ? form.q2_5 : null, form.q2_6 || null,
    form.q3_1 || null, form.q3_2 || null, form.q3_3 !== undefined ? form.q3_3 : null,
    form.q4_1 || null, form.q4_2 || null, form.q4_3 !== undefined ? form.q4_3 : null,
    form.q5_1 || null, form.q5_2 || null, form.q5_3 || null, form.q5_4 !== undefined ? form.q5_4 : null
  ];

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const result = await client.query(insertQuery, values);
    await client.query("COMMIT");

    return res.status(201).json({
      success: true,
      message: "Form submitted successfully!",
      submissionId: result.rows[0].id
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Database error:", err);
    return res.status(500).json({
      success: false,
      message: "Submission failed",
      error: err.message
    });
  } finally {
    client.release();
  }
});

app.post(
  "/api/send-pdf-email",
  upload.single("pdf"),
  async (req, res) => {
    const { email, cc_email } = req.body;
    const pdf = req.file;

    if (!email || !pdf) {
      return res.status(400).json({
        success: false,
        message: "Email and PDF file are required."
      });
    }

    const mailOptions = {
      from: `"Jal Smruti Foundation" <${process.env.EMAIL_USER}>`,
      to: email,
      cc: cc_email || process.env.EMAIL_USER,
      subject: "Your Water Management Assessment Report",
      text: "Hi,\n\nThank you for completing our assessment. Please find your report attached.\n\nRegards,\nTeam Jal Smruti",
      attachments: [
        {
          filename: pdf.originalname || "water_management_report.pdf",
          content: pdf.buffer
        }
      ]
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({
        success: true,
        message: "Report emailed successfully!"
      });
    } catch (err) {
      console.error("Email error:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to send email",
        error: err.message
      });
    }
  }
);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`CORS configured for origins: ${corsOptions.origin.join(", ")}`);
});

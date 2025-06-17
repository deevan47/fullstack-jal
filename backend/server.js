import dotenv from "dotenv";
dotenv.config();

import express from "express";
import pg from "pg";
import nodemailer from "nodemailer";
import cors from "cors";
import multer from "multer";

const sections = [
  {
    title: '1. Water Management',
    questions: [
      {
        key: 'q1_1',
        label: '1.1 Status of Water Policy',
        options: [
          'None',
          'Water policy making in progress',
          'Water Policy drafted',
          'Water Policy drafted & communicated to staff & tenants',
        ],
      },
      {
        key: 'q1_2',
        label: '1.2 Status of Water Pledge',
        options: [
          'None',
          'Management have taken a water pledge',
          'Management + Facility Staff have taken a water pledge',
          'Management + Facility Staff + Tenants have taken a water pledge',
        ],
      },      {
        key: 'q1_3',
        label: '1.3 Status of Water Charter',
        options: [
          'None',
          'Water Charter drafting in progress',
          'Water Charter finalized',
          'Water Charter finalized and displayed in public',
        ],
      },
      {
        key: 'q1_4',
        label: '1.4 Status of Water Saving Goals & Targets',
        options: [
          'None',
          'Work in progress',
          'Water saving goals & targets have been set',
          'Water saving goals & targets communicated to staff & tenants',
        ],
      },
    ],
  },
  {
    title: '2. Water Efficiency',
    questions: [
      {
        key: 'q2_1',
        label: '2.1 Status of Water Metering',
        options: [
          'Bulk water meter',
          'Bulk meter + submeter',
          'Bulk meter + submeter + monthly or weekly monitoring',
          'Smart water sub meters',
        ],
      },
      {
        key: 'q2_2',
        label: '2.2 Status of Water Fixtures (Average) Flow Rate in liters per minute (lpm)',
        options: ['(>15 lpm)', '(10-15 lpm)', '(5-10 lpm)', '(<5 lpm)'],
      },
      {
        key: 'q2_3',
        label: '2.3 Status of Toilet Flushing',
        options: [
          'Single flush (>12 litres)',
          'Single flush (10-12 litres)',
          'Dual flush (12 /6 litres)',
          'Dual flush (8 /4 litres)',
        ],
      },
      {
        key: 'q2_4',
        label: '2.4 Status of Water Conservation Signage & Communication',
        options: [
          'None',
          'Signage in washrooms',
          'Signage in washrooms and other areas',
          'Signage plus monthly staff and tenant awareness sessions',
        ],
      },
      {
        key: 'q2_5',
        label: '2.5 Status of Water Use in Cooling Tower',
        options: [
          'No submeter and/or single pass use',
          'Submeter and single pass use',
          'Submeter and water recirculation factor <3',
          'Submeter & water recirculation factor >3',
          'Not Applicable',
        ],
        notApplicableValue: -1,
      },
      {
        key: 'q2_6',
        label: '2.6 Status of Water Use Intensity',
        options: [
          '(>60% more than best practice benchmark)',
          '(51-60% more than best practice benchmark)',
          '(11-40% more than best practice benchmark)',
          '(Within 10% of best practice benchmark)',
        ],
      },
    ],
  },
  {
    title: '3. Groundwater Sustainability',
    questions: [
      {
        key: 'q3_1',
        label: '3.1 Status of Groundwater dependency expressed as percentage of total annual water consumed',
        options: ['(>50%)', '(20-50%)', '(5-20%)', '(<5%)'],
      },
      {
        key: 'q3_2',
        label: '3.2 Status of Groundwater Extraction',
        options: [
          'None',
          'Manual monitoring of pumped hours',
          'Manual metering',
          'Smart metering',
        ],
      },
      {
        key: 'q3_3',
        label: '3.3 Status of Groundwater Recharge expressed as percentage of Groundwater extraction',
        options: [
          '(<20%)',
          '(20-40%)',
          '(40-50%)',
          '(>50%)',
          'Not Applicable',
        ],
        notApplicableValue: -1,
      },
    ],
  },
  {
    title: '4. Water Circularity Status',
    questions: [
      {
        key: 'q4_1',
        label: '4.1 Status of Rainwater Harvesting',
        options: [
          'None',
          'Roofwater harvesting from <50% of roof',
          'Roofwater harvesting from >50% of roof',
          'Roofwater harvesting + Non roof water harvesting',
        ],
      },
      {
        key: 'q4_2',
        label: '4.2 Status of Greywater/Sewage Water Recycling or Reuse',
        options: [
          'None',
          'Footprint area available for siting a facility',
          'Work in progress - designed and waiting to be constructed',
          'Greywater/Sewage recycling is operational',
        ],
      },
      {
        key: 'q4_3',
        label: '4.3 Status of Collective Reverse Osmosis Treated Water',
        options: [
          'No Reuse - Reject Water is Discharged',
          'Technically feasible to organize for non potable reuse',
          'Plans in place and to be executed',
          'Reject Water is being reused for non potable use',
          'Not Applicable',
        ],
        notApplicableValue: -1,
      },
    ],
  },
  {
    title: '5. Status of Green Vegetation Cover',
    questions: [
      {
        key: 'q5_1',
        label: '5.1 Status of Green Cover Policy',
        options: [
          'None',
          'Green Cover Policy drafting in progress',
          'Green Cover Policy finalized',
          'Green Cover Policy finalized and shared with stakeholders',
        ],
      },
      {
        key: 'q5_2',
        label: '5.2 Status of Green Coverage Area',
        options: ['(<10%)', '(10-25%)', '(25-50%)', '(>50%)'],
      },
      {
        key: 'q5_3',
        label: '5.3 Status of Green Landscapes',
        options: [
          'High water using non-native species + no smart irrigation',
          'High water using non-native species + smart irrigation',
          'Native species + no smart irrigation',
          'Native species + smart irrigation',
        ],
      },
      {
        key: 'q5_4',
        label: '5.4 Status of Green Roofs & Green Walls',
        options: [
          'None',
          'Plans for Green Roofs & Green Walls in place',
          'Green Roofs operational',
          'Green Roofs + Green Walls operational',
          'Not Applicable',
        ],
        notApplicableValue: -1,
      },
    ],
  },
];

const { Pool } = pg;
const app = express();
const upload = multer();
const port = process.env.PORT || 5000;

// CORS setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://backend-jprs.onrender.com",
    methods: ["POST", "OPTIONS"],
  })
);

app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL === "true",
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/submit", upload.none(), async (req, res) => {
  const formData = req.body;
  
  if (!formData.email || !formData.fullName) {
    return res.status(400).json({ message: "Fullname and email are required." });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const insertQuery = `
      INSERT INTO submissions (
        fullName, email, q1_1, q1_2, q1_3, q1_4,
        q2_1, q2_2, q2_3, q2_4, q2_5, q2_6,
        q3_1, q3_2, q3_3,
        q4_1, q4_2, q4_3,
        q5_1, q5_2, q5_3, q5_4
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11, $12,
        $13, $14, $15,
        $16, $17, $18,
        $19, $20, $21, $22
      )
      RETURNING id
    `;

    const values = [
      formData.fullName,
      formData.email,
      formData.q1_1,
      formData.q1_2,
      formData.q1_3,
      formData.q1_4,
      formData.q2_1,
      formData.q2_2,
      formData.q2_3,
      formData.q2_4,
      formData.q2_5,
      formData.q2_6,
      formData.q3_1,
      formData.q3_2,
      formData.q3_3,
      formData.q4_1,
      formData.q4_2,
      formData.q4_3,
      formData.q5_1,
      formData.q5_2,
      formData.q5_3,
      formData.q5_4,
    ];

    const result = await client.query(insertQuery, values);
    const submissionId = result.rows[0].id;

    await client.query("COMMIT");
    res.status(200).json({ message: "Form submitted successfully!", submissionId });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to submit form", error: error.message });
  } finally {
    client.release();
  }
});

app.post("/api/send-pdf-email", upload.single("pdf"), async (req, res) => {
  try {
    const { email, name, cc_email } = req.body;
    const pdfFile = req.file;

    if (!email || !pdfFile) {
      return res.status(400).json({ error: "Email and PDF file are required" });
    }

    const mailOptions = {
      from: `"Jal Smruti Foundation" <${process.env.EMAIL_USER}>`,
      to: email,
      cc: cc_email || "deevankumar0706@gmail.com",
      subject: "Your Water Management Assessment Report",
      text: `Hi ,

Thank you for completing our Water Management Assessment. Please find your detailed report attached.

This report provides insights into your water management practices and suggestions for improvement.

Regards,
Team JalSmruti
      `,
      attachments: [{
        filename: pdfFile.originalname,
        content: pdfFile.buffer,
        contentType: "application/pdf"
      }]
    };

    await transporter.sendMail(mailOptions);
    console.log("Report emailed to:", email);
    res.status(200).json({ message: "Report sent to your email successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Failed to send email", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on https://backend-jprs.onrender.com`);
});

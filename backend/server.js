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

// Enhanced CORS configuration
const corsOptions = {
  origin: [
    "https://frontend-hgu7.onrender.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
  optionsSuccessStatus: 200 
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database configuration using only DATABASE_URL from .env
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Form sections configuration
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
      },
      {
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
        label: '3.3 Status of Groundwater Recharge expressed as % of Groundwater extraction',
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

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Form submission endpoint
app.post("/api/submit", upload.none(), async (req, res) => {
  try {
    const form = req.body;
    
    // Validate required fields
    if (!form.fullName || !form.email) {
      return res.status(400).json({ 
        success: false,
        message: "Full name and email are required." 
      });
    }

    const client = await pool.connect();
    
    try {
      await client.query("BEGIN");

    const insertQuery = `
  INSERT INTO submissions (
    fullName, email, whatsapp, units, apartment_name, map_link, date_of_assessment,
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
  form.fullName, form.email, form.whatsapp, form.units, form.apartmentName, form.mapLink, form.date,
  form.q1_1, form.q1_2, form.q1_3, form.q1_4,
  form.q2_1, form.q2_2, form.q2_3, form.q2_4, form.q2_5, form.q2_6,
  form.q3_1, form.q3_2, form.q3_3,
  form.q4_1, form.q4_2, form.q4_3,
  form.q5_1, form.q5_2, form.q5_3, form.q5_4,
];


      const result = await client.query(insertQuery, values);
      await client.query("COMMIT");

      res.status(201).json({ 
        success: true,
        message: "Form submitted successfully!", 
        submissionId: result.rows[0].id 
      });
    } catch (err) {
      await client.query("ROLLBACK");
      console.error("Database error:", err);
      res.status(500).json({ 
        success: false,
        message: "Submission failed", 
        error: err.message 
      });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ 
      success: false,
      message: "Internal server error",
      error: err.message 
    });
  }
});

// PDF email endpoint
app.post("/api/send-pdf-email", upload.single("pdf"), async (req, res) => {
  try {
    const { email, cc_email } = req.body;
    const pdf = req.file;

    if (!email || !pdf) {
      return res.status(400).json({ 
        success: false,
        error: "Email and PDF file are required." 
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
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true,
      message: "Report emailed successfully!" 
    });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ 
      success: false,
      error: "Failed to send email", 
      details: err.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ 
    success: false,
    message: "Internal server error",
    error: err.message 
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`CORS configured for: ${corsOptions.origin.join(', ')}`);
});

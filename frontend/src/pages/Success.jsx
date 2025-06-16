import React, { useEffect, useRef } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import bannerImage from "../assets/banner.png";



const sections = [
  {
    title: "Water Management",
    questions: [
      {
        key: "q1_1",
        label: "1.1 Status of Water Policy",
        options: {
          0: "None",
          1: "Water policy making in progress",
          2: "Water Policy drafted",
          3: "Water Policy drafted & communicated to staff & tenants",
        },
      },
      {
        key: "q1_2",
        label: "1.2 Status of Water Pledge",
        options: {
          0: "None",
          1: "Management have taken a water pledge",
          2: "Management + Facility Staff have taken a water pledge",
          3: "Management + Facility Staff + Tenants have taken a water pledge",
        },
      },
      {
        key: "q1_3",
        label: "1.3 Status of Water Charter",
        options: {
          0: "None",
          1: "Water Charter drafting in progress",
          2: "Water Charter finalized",
          3: "Water Charter finalized and displayed in public",
        },
      },
      {
        key: "q1_4",
        label: "1.4 Status of Water Saving Goals & Targets",
        options: {
          0: "None",
          1: "Work in progress",
          2: "Water saving goals & targets have been set",
          3: "Water saving goals & targets communicated to staff & tenants",
        },
      },
    ],
  },
  {
    title: "Water Efficiency",
    questions: [
      {
        key: "q2_1",
        label: "2.1 Status of Water Metering",
        options: {
          0: "Bulk water meter",
          1: "Bulk meter + submeter",
          2: "Bulk meter + submeter + monthly or weekly monitoring",
          3: "Smart water sub meters",
        },
      },
      {
        key: "q2_2",
        label: "2.2 Status of Water Fixtures (Average Flow Rate in lpm)",
        options: {
          0: "(>15 lpm)",
          1: "(10-15 lpm)",
          2: "(5-10 lpm)",
          3: "(<5 lpm)",
        },
      },
      {
        key: "q2_3",
        label: "2.3 Status of Toilet Flushing",
        options: {
          0: "Single flush (>12 litres)",
          1: "Single flush (10-12 litres)",
          2: "Dual flush (12 / 6 litres)",
          3: "Dual flush (8 / 4 litres)",
        },
      },
      {
        key: "q2_4",
        label: "2.4 Status of Water Conservation Signage & Communication",
        options: {
          0: "None",
          1: "Signage in washrooms",
          2: "Signage in washrooms and other areas",
          3: "Signage plus monthly staff and tenant awareness sessions",
        },
      },
      {
        key: "q2_5",
        label: "2.5 Status of Water Use in Cooling Tower",
        options: {
          "N/A": "Not Applicable",
          0: "No submeter and/or single pass use",
          1: "Submeter and single pass use",
          2: "Submeter and water recirculation factor <3",
          3: "Submeter & water recirculation factor >3",
        },
        notApplicableValue: "N/A",
      },
      {
        key: "q2_6",
        label: "2.6 Status of Water Use Intensity",
        options: {
          0: "(>60% more than best practice benchmark)",
          1: "(51-60% more than best practice benchmark)",
          2: "(11-40% more than best practice benchmark)",
          3: "(Within 10% of best practice benchmark)",
        },
      },
    ],
  },
  {
    title: "Groundwater sustainability",
    questions: [
      {
        key: "q3_1",
        label: "3.1 Status of Groundwater dependency (percentage of total annual water consumed)",
        options: {
          0: "(>50%)",
          1: "(20-50%)",
          2: "(5-20%)",
          3: "(<5%)",
        },
      },
      {
        key: "q3_2",
        label: "3.2 Status of Groundwater Extraction",
        options: {
          0: "None",
          1: "Manual monitoring of pumped hours",
          2: "Manual metering",
          3: "Smart metering",
        },
      },
      {
        key: "q3_3",
        label: "3.3 Status of Groundwater Recharge (percentage of Groundwater extraction)",
        options: {
          0: "(<20%)",
          1: "(20-40%)",
          2: "(40-50%)",
          3: "(>50%)",
        },
      },
    ],
  },
  {
    title: "Water Circularity Status",
    questions: [
      {
        key: "q4_1",
        label: "4.1 Status of Rainwater Harvesting",
        options: {
          0: "None",
          1: "Roofwater harvesting from <50% of roof",
          2: "Roofwater harvesting from >50% of roof",
          3: "Roofwater harvesting + Non roof water harvesting",
        },
      },
      {
        key: "q4_2",
        label: "4.2 Status of Greywater/Sewage Water Recycling or Reuse",
        options: {
          0: "None",
          1: "Footprint area available for siting a facility",
          2: "Work in progress - designed and waiting to be constructed",
          3: "Greywater/Sewage recycling is operational",
        },
      },
      {
        key: "q4_3",
        label: "4.3 Status of Collective Reverse Osmosis Treated Water",
        options: {
          0: "No Reuse - Reject Water is Discharged",
          1: "Technically feasible to organize for non potable reuse",
          2: "Plans in place and to be executed",
          3: "Reject Water is being reused for non potable use",
        },
      },
    ],
  },
  {
    title: "Status of Green Vegetation Cover",
    questions: [
      {
        key: "q5_1",
        label: "5.1 Status of Green Cover Policy",
        options: {
          0: "None",
          1: "Green Cover Policy drafting in progress",
          2: "Green Cover Policy finalized",
          3: "Green Cover Policy finalized and shared with stakeholders",
        },
      },
      {
        key: "q5_2",
        label: "5.2 Status of Green Coverage Area",
        options: {
          0: "(<10%)",
          1: "(10-25%)",
          2: "(25-50%)",
          3: "(>50%)",
        },
      },
      {
        key: "q5_3",
        label: "5.3 Status of Green Landscapes",
        options: {
          0: "High water using non-native species + no smart irrigation",
          1: "High water using non-native species + smart irrigation",
          2: "Native species + no smart irrigation",
          3: "Native species + smart irrigation",
        },
      },
      {
        key: "q5_4",
        label: "5.4 Status of Green Roofs & Green Walls",
        options: {
          0: "None",
          1: "Plans for Green Roofs & Green Walls in place",
          2: "Green Roofs operational",
          3: "Green Roofs + Green Walls operational",
        },
      },
    ],
  },
];
function getColorForScore(score) {
  if (score <= 1) {
    // interpolate between red (#e74c3c) and orange (#f39c12)
    return interpolateColor("#e74c3c", "#f39c12", score);
  } else if (score <= 2) {
    // interpolate between orange (#f39c12) and yellow (#f1c40f)
    return interpolateColor("#f39c12", "#f1c40f", score - 1);
  } else if (score <= 3) {
    // interpolate between yellow (#f1c40f) and green (#27ae60)
    return interpolateColor("#f1c40f", "#27ae60", score - 2);
  } else {
    return "#27ae60"; // clamp max to green
  }
}

function calculateSectionScore(section, form) {
  let total = 0, count = 0;
  section.questions.forEach((q) => {
    const val = form[q.key];
    if (!(q.notApplicableValue && val === q.notApplicableValue)) {
      const numVal = Number(val);
      if (!isNaN(numVal)) {
        total += numVal;
        count++;
      }
    }
  });
  return { score: total, count };
}

function calculateOverallAverage(form, sections) {
  let total = 0, count = 0;
  sections.forEach((section) =>
    section.questions.forEach((q) => {
      const val = form[q.key];
      if (!(q.notApplicableValue && val === q.notApplicableValue)) {
        const numVal = Number(val);
        if (!isNaN(numVal)) {
          total += numVal;
          count++;
        }
      }
    })
  );
  return { avg: count > 0 ? total / count : 0 };
}

function getMaturityLevel(score) {
  if (score < 1) return "Front Runner";
  else if (score < 2) return "Performer";
  else return "Achiever";
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToHex({ r, g, b }) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

function interpolateColor(color1, color2, factor) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  const result = {
    r: Math.round(c1.r + (c2.r - c1.r) * factor),
    g: Math.round(c1.g + (c2.g - c1.g) * factor),
    b: Math.round(c1.b + (c2.b - c1.b) * factor),
  };
  return rgbToHex(result);
}

const Banner = () => (
  <Box
    component="img"
    src={bannerImage}
    alt="Banner"
    sx={{ width: "100%", height: "auto", borderRadius: 2 }}
  />
);

const Success = ({ form, sections, onRestart }) => {
  const containerRefs = useRef([]);
  const { avg } = calculateOverallAverage(form, sections);
  const maturity = getMaturityLevel(avg);
  const overallColor = getColorForScore(avg);

  const addRef = (el) => {
    if (el && !containerRefs.current.includes(el)) {
      containerRefs.current.push(el);
    }
  };

  const getImageBase64 = (url) =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => resolve(null);
      img.src = url;
    });

  const generatePdfBlob = async () => {
    const pdf = new jsPDF("p", "pt");
    const pageWidth = pdf.internal.pageSize.getWidth();

    const bannerBase64 = await getImageBase64(bannerImage);
    if (bannerBase64) {
      pdf.addImage(bannerBase64, "PNG", 0, 0, pageWidth, 100);
    }

    let y = bannerBase64 ? 120 : 40;

    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Name: ${form.fullName || "N/A"}`, pageWidth / 2, y, { align: "center" });
    y += 20;
    pdf.text(`Email: ${form.email || "N/A"}`, pageWidth / 2, y, { align: "center" });
    y += 20;
    pdf.setFillColor(...Object.values(hexToRgb(overallColor)));
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.rect(40, y, pageWidth - 80, 50, "F");
    pdf.text(`Overall Average Score: ${avg.toFixed(2)}`, pageWidth / 2, y + 18, { align: "center" });
    pdf.text(`Maturity Level: ${maturity}`, pageWidth / 2, y + 38, { align: "center" });
    y += 70;

    for (const section of sections) {
      const { score, count } = calculateSectionScore(section, form);
      const sectionAvg = count > 0 ? score / count : 0;
      const sectionColor = getColorForScore(sectionAvg);
      const rgb = hexToRgb(sectionColor);

      const estimatedHeight = 35 + section.questions.length * 25;
      const pageHeight = pdf.internal.pageSize.getHeight();

      if (y + estimatedHeight > pageHeight - 40) {
        pdf.addPage();
        y = 40;
      }

      pdf.setFillColor(rgb.r, rgb.g, rgb.b);
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.setFont(undefined, "bold");
      pdf.rect(40, y, pageWidth - 80, 25, "F");
      pdf.text(`${section.title}`, 50, y + 17);
      pdf.text(`Average Score: ${sectionAvg.toFixed(2)}`, pageWidth - 50, y + 17, { align: "right" });
      y += 25;

      const body = section.questions.map((q) => {
        const val = form[q.key];
        if (q.notApplicableValue && val === q.notApplicableValue) {
          return [q.label, "Not Applicable", "-"];
        }
        const numVal = Number(val);
        const optionLabel = q.options?.[numVal] ?? "No response";
        return [q.label, optionLabel, !isNaN(numVal) ? numVal : "-"];
      });

      autoTable(pdf, {
        startY: y,
        head: [["Question", "Response", "Score"]],
        body,
        theme: "grid",
        styles: {
          fontSize: 9,
          cellPadding: 5,
          textColor: 0,
          lineWidth: 0.1,
          lineColor: [50, 50, 50],
        },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: 0,
          fontStyle: "bold",
        },
        margin: { left: 40, right: 40 },
        pageBreak: "auto",
        rowPageBreak: "avoid",
      });

      y = pdf.lastAutoTable.finalY + 30;
    }

// Add quote
pdf.setFontSize(11);
pdf.setTextColor(0, 0, 0);
pdf.setFont(undefined, "normal");

const quote = [
  "The driving force behind ",
  "Jalsmruti",
  " is empowering community to restore India's cherished legacy—a land that was once celebrated as ",
  "'Sujalaam Sufalaam'",
  ", abundant in water and lush vegetation."
];

const quoteLine = quote.map((word, i) => {
  if (word === "Jalsmruti") return `%Jalsmruti%`;
  if (word === "'Sujalaam Sufalaam'") return `%Sujalaam%`;
  return word;
}).join("");

let parts = quoteLine.split(/(%.*?%)/);
let cursorX = pageWidth / 2 - 200;
let quoteY = y;

pdf.setFontSize(11);
pdf.setFont(undefined, "normal");

parts.forEach((part) => {
  if (part === "%Jalsmruti%") {
    pdf.setTextColor(0, 102, 204); // Blue
    pdf.text("Jalsmruti", pageWidth / 2, quoteY, { align: "center" });
  } else if (part === "%Sujalaam%") {
    pdf.setTextColor(0, 128, 0); // Green
    pdf.text("'Sujalaam Sufalaam'", pageWidth / 2, quoteY + 15, { align: "center" });
  }
});

quoteY += 35;
pdf.setFontSize(12);
pdf.setTextColor(0, 0, 0);
pdf.setFont(undefined, "bold");
pdf.text("Your donation to Jal Smruti Foundation is tax deductible", 40, quoteY);

quoteY += 20;
pdf.setFontSize(10);
pdf.setFont(undefined, "normal");

const bankDetails = [
  "Bank Details",
  "Name of Account - Jjala Ssmruti Foundation",
  "Name of Bank - State Bank of India",
  "IFSC Code - SBIN0003866",
  "Account Number - 40131834676",
  "Type of Account - Current",
  "",
  "UPI ID",
  "jalsmrutifoundation@ybl"
];
bankDetails.forEach((line, i) => {
  pdf.text(line, 40, quoteY + i * 12);
});

y = quoteY + bankDetails.length * 12 + 20;

// --- Footer: Bottom layout ---
const pageHeight = pdf.internal.pageSize.getHeight();
const bottomY = pageHeight - 60;

const hours = [
  "Hours",
  "Mon-Fri / 7:00 – 18:00",
  "Saturday / 9:00 – 17:00"
];
const corporateOffices = [
  "Corporate offices",
  "Head Office: Amravati, Maharashtra 444602",
  "Corporate Office: New Delhi, Delhi 110049"
];
const contactInfo = [
  "Contact Info",
  "Email: contact@jalsmruti.org"
];

pdf.setFontSize(9);
pdf.setFont(undefined, "normal");

hours.forEach((line, i) => {
  pdf.text(line, 40, bottomY + i * 10);
});
corporateOffices.forEach((line, i) => {
  pdf.text(line, pageWidth / 2, bottomY + i * 10, { align: "center" });
});
contactInfo.forEach((line, i) => {
  pdf.text(line, pageWidth - 40, bottomY + i * 10, { align: "right" });
});


    return pdf.output("blob");
  };

  const sendPdfToBackend = async () => {
    try {
      const blob = await generatePdfBlob();
      const fileName = `${form.fullName || "Water Scorecard"} Report.pdf`;
      const formData = new FormData();
      formData.append("pdf", new File([blob], fileName, { type: "application/pdf" }));
      formData.append("email", form.email);
      formData.append("cc_email", "contact@jalsmruti.org");

      const res = await fetch("http://localhost:5000/api/send-pdf-email", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("Failed to send email");
      } else {
        console.log("PDF emailed successfully");
      }
    } catch (err) {
      console.error("Error generating/sending PDF", err);
    }
  };

  const handleDownloadPdf = async () => {
    const blob = await generatePdfBlob();
    const fileName = `${form.fullName || "Water Scorecard"} Report.pdf`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 100);
  };

  const hasSentRef = useRef(false);

  useEffect(() => {
    if (!hasSentRef.current) {
      sendPdfToBackend();
      hasSentRef.current = true;
    }
  }, []);

  containerRefs.current = [];

  return (
    <>
      <Box ref={addRef} sx={{ backgroundColor: "white", m: 2, p: 2, borderRadius: 2 }}>
        <Banner />
      </Box>

<Box sx={{ mx: 2, mb: 2, textAlign: "center" }}>
  <Typography variant="h4" fontWeight="bold">
    Thank you, {form.fullName} for your response. <br></br>Here is your Summary Report.
  </Typography>
</Box>

<Box sx={{ mx: 2, mb: 4, display: "inline-block", borderRadius: 1, backgroundColor: overallColor, color: "#fff", px: 2, py: 1 }}>
  <Typography variant="h5" gutterBottom sx={{ marginBottom: 0 }}>
    Overall Average Score: {avg.toFixed(2)}
  </Typography>
  <Typography variant="h6" gutterBottom sx={{ marginTop: 0 }}>
    Maturity Level: {maturity}
  </Typography>
</Box>



      {sections.map((section, idx) => {
        const { score, count } = calculateSectionScore(section, form);
        const sectionAvg = count > 0 ? score / count : 0;
        const sectionColor = getColorForScore(sectionAvg);
        return (
          <Box
            key={idx}
            ref={addRef}
            sx={{
              m: 2,
              p: 2,
              backgroundColor: sectionColor,
              borderRadius: 2,
              color: "#fff",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              {section.title} - Average Score: {sectionAvg.toFixed(2)}
            </Typography>
            <TableContainer sx={{ backgroundColor: "#fff", borderRadius: 1 }}>
              <Table size="small" aria-label={`${section.title} results`}>
                <TableHead>
                  <TableRow>
                    <TableCell>Question</TableCell>
                    <TableCell>Response</TableCell>
                    <TableCell>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {section.questions.map((q, qidx) => {
                    const val = form[q.key];
                    const isNA = q.notApplicableValue && val === q.notApplicableValue;
                    const numVal = Number(val);
                    const optionLabel = q.options?.[numVal] ?? (isNA ? "Not Applicable" : "No response");
                    return (
                      <TableRow key={qidx}>
                        <TableCell>{q.label}</TableCell>
                        <TableCell>{optionLabel}</TableCell>
                        <TableCell>{isNA ? "-" : !isNaN(numVal) ? numVal : "-"}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      })}

      <Box sx={{ textAlign: "center", my: 4 }}>
        <Button variant="contained" color="primary" onClick={handleDownloadPdf}>
          Download Report as PDF
        </Button>
        <Button variant="outlined" color="secondary" onClick={onRestart} sx={{ ml: 2 }}>
          Submit Another Form
        </Button>
      </Box>
    </>
  );
};

export default Success;
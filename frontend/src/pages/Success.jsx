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
        label:
          "3.1 Status of Groundwater dependency (percentage of total annual water consumed)",
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
        label:
          "3.3 Status of Groundwater Recharge (percentage of Groundwater extraction)",
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
// Helper Functions
function getColorForScore(score) {
  if (score < 1) return "#e74c3c"; // red
  else if (score < 2) return "#f39c12"; // orange
  else return "#27ae60"; // green
}

function calculateSectionScore(section, form) {
  let total = 0,
    count = 0;
  section.questions.forEach((q) => {
    const val = form[q.key];
    // exclude not applicable values from scoring
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
  let total = 0,
    count = 0;
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

// Placeholder Banner component (replace with your actual Banner)
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

  // Manage refs for potential future use (scroll, print, etc)
  const addRef = (el) => {
    if (el && !containerRefs.current.includes(el)) {
      containerRefs.current.push(el);
    }
  };

  // Convert image URL to base64 for jsPDF
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
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = () => {
        // fallback if image fails
        resolve(null);
      };
      img.src = url;
    });

  // Generate PDF Blob for download or sending
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
    pdf.text(`Name: ${form.fullName || "N/A"}`, pageWidth / 2, y, {
      align: "center",
    });
    y += 20;
    pdf.text(`Email: ${form.email || "N/A"}`, pageWidth / 2, y, {
      align: "center",
    });
    y += 20;
    pdf.setFillColor(...Object.values(hexToRgb(overallColor)));
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.rect(40, y, pageWidth - 80, 50, "F");
    pdf.text(
      `Overall Average Score: ${avg.toFixed(2)}`,
      pageWidth / 2,
      y + 18,
      {
        align: "center",
      }
    );
    pdf.text(`Maturity Level: ${maturity}`, pageWidth / 2, y + 38, {
      align: "center",
    });
    y += 70;

    for (const section of sections) {
      const { score, count } = calculateSectionScore(section, form);
      const sectionAvg = count > 0 ? score / count : 0;
      const sectionColor = getColorForScore(sectionAvg);
      const rgb = hexToRgb(sectionColor);

      // Estimate upcoming height: header (35) + approx 25px per row
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

      pdf.text(
        `Average Score: ${sectionAvg.toFixed(2)}`,
        pageWidth - 50,
        y + 17,
        {
          align: "right",
        }
      );

      y += 35;

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

    return pdf.output("blob");
  };

  // Send generated PDF via backend API
  const sendPdfToBackend = async () => {
    try {
      const blob = await generatePdfBlob();
      const fileName = `${form.fullName || "Water Scorecard"} Report.pdf`;
      const formData = new FormData();
      formData.append(
        "pdf",
        new File([blob], fileName, { type: "application/pdf" })
      );
      formData.append("email", form.email);
      formData.append("additionalInfo", "Your additional info text here");

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

  // Handle manual PDF download by user
  const handleDownloadPdf = async () => {
    const blob = await generatePdfBlob();
    const fileName = `${form.fullName || "Water Scorecard"} Report.pdf`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    // Cleanup URL object after download
    setTimeout(() => URL.revokeObjectURL(link.href), 100);
  };

  const hasSentRef = useRef(false);

  useEffect(() => {
    if (!hasSentRef.current) {
      sendPdfToBackend();
      hasSentRef.current = true;
    }
  }, []);

  // Reset refs to prevent duplicates on rerender
  containerRefs.current = [];

  return (
    <>
      <Box
        ref={addRef}
        sx={{ backgroundColor: "white", m: 2, p: 2, borderRadius: 2 }}
      >
        <Banner />
      </Box>

      <Box
        ref={addRef}
        sx={{
          backgroundColor: "white",
          m: 2,
          p: 2,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Thank you, {form.fullName}, your response has been submitted.
        </Typography>
        <Typography variant="h6">Summary of your Results:</Typography>
      </Box>

      <Box
        ref={addRef}
        sx={{
          backgroundColor: overallColor,
          color: "white",
          m: 2,
          p: 3,
          borderRadius: 2,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        <div>Overall Average Score: {avg.toFixed(2)}</div>
        <div>Maturity Level: {maturity}</div>
      </Box>

      {sections.map((section, idx) => {
        const { score, count } = calculateSectionScore(section, form);
        const sectionAvg = count > 0 ? score / count : 0;
        const sectionColor = getColorForScore(sectionAvg);

        return (
          <Box
            key={idx}
            ref={addRef}
            sx={{ backgroundColor: "white", m: 2, p: 3, borderRadius: 2 }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6" fontWeight="bold">
                {section.title}
              </Typography>
              <Typography
                sx={{
                  backgroundColor: sectionColor,
                  color: "white",
                  fontWeight: "bold",
                  p: 1,
                  borderRadius: 1,
                  minWidth: 130,
                  textAlign: "right",
                }}
              >
                Average Score: {sectionAvg.toFixed(2)}
              </Typography>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Question</TableCell>
                    <TableCell>Response</TableCell>
                    <TableCell>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {section.questions.map((q, i) => {
                    const val = form[q.key];
                    if (q.notApplicableValue && val === q.notApplicableValue) {
                      return (
                        <TableRow key={i}>
                          <TableCell>{q.label}</TableCell>
                          <TableCell>Not Applicable</TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                      );
                    }
                    const numVal = Number(val);
                    const optionLabel = q.options?.[numVal] ?? "No response";
                    return (
                      <TableRow key={i}>
                        <TableCell>{q.label}</TableCell>
                        <TableCell>{optionLabel}</TableCell>
                        <TableCell>{!isNaN(numVal) ? numVal : "-"}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      })}

      <Box
        className="no-print"
        sx={{
          maxWidth: 900,
          margin: "20px auto",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Button variant="outlined" onClick={onRestart} color="error">
          Start Again
        </Button>
        <Button variant="contained" onClick={handleDownloadPdf}>
          Download Report
        </Button>
      </Box>
    </>
  );
};

export default Success;

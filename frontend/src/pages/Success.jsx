import React, { useRef, useEffect } from "react";
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
    title: "1. Water Management",
    questions: [
      {
        key: "q1_1",
        label: "1.1 Status of Water Policy",
        options: [
          "None",
          "Water policy making in progress",
          "Water Policy drafted",
          "Water Policy drafted & communicated to staff & tenants",
        ],
      },
      {
        key: "q1_2",
        label: "1.2 Status of Water Pledge",
        options: [
          "None",
          "Management have taken a water pledge",
          "Management + Facility Staff have taken a water pledge",
          "Management + Facility Staff + Tenants have taken a water pledge",
        ],
      },
      {
        key: "q1_3",
        label: "1.3 Status of Water Charter",
        options: [
          "None",
          "Water Charter drafting in progress",
          "Water Charter finalized",
          "Water Charter finalized and displayed in public",
        ],
      },
      {
        key: "q1_4",
        label: "1.4 Status of Water Saving Goals & Targets",
        options: [
          "None",
          "Work in progress",
          "Water saving goals & targets have been set",
          "Water saving goals & targets communicated to staff & tenants",
        ],
      },
    ],
  },
  {
    title: "2. Water Efficiency",
    questions: [
      {
        key: "q2_1",
        label: "2.1 Status of Water Metering",
        options: [
          "Bulk water meter",
          "Bulk meter + submeter",
          "Bulk meter + submeter + monthly or weekly monitoring",
          "Smart water sub meters",
        ],
      },
      {
        key: "q2_2",
        label:
          "2.2 Status of Water Fixtures (Average) Flow Rate in liters per minute (lpm)",
        options: ["(>15 lpm)", "(10-15 lpm)", "(5-10 lpm)", "(<5 lpm)"],
      },
      {
        key: "q2_3",
        label: "2.3 Status of Toilet Flushing",
        options: [
          "Single flush (>12 litres)",
          "Single flush (10-12 litres)",
          "Dual flush (12 /6 litres)",
          "Dual flush (8 /4 litres)",
        ],
      },
      {
        key: "q2_4",
        label: "2.4 Status of Water Conservation Signage & Communication",
        options: [
          "None",
          "Signage in washrooms",
          "Signage in washrooms and other areas",
          "Signage plus monthly staff and tenant awareness sessions",
        ],
      },
      {
        key: "q2_5",
        label: "2.5 Status of Water Use in Cooling Tower",
        options: [
          "No submeter and/or single pass use",
          "Submeter and single pass use",
          "Submeter and water recirculation factor <3",
          "Submeter & water recirculation factor >3",
          "Not Applicable",
        ],
        notApplicableValue: -1,
      },
      {
        key: "q2_6",
        label: "2.6 Status of Water Use Intensity",
        options: [
          "(>60% more than best practice benchmark)",
          "(51-60% more than best practice benchmark)",
          "(11-40% more than best practice benchmark)",
          "(Within 10% of best practice benchmark)",
        ],
      },
    ],
  },
  {
    title: "3. Groundwater Sustainability",
    questions: [
      {
        key: "q3_1",
        label:
          "3.1 Status of Groundwater dependency expressed as percentage of total annual water consumed",
        options: ["(>50%)", "(20-50%)", "(5-20%)", "(<5%)"],
      },
      {
        key: "q3_2",
        label: "3.2 Status of Groundwater Extraction",
        options: [
          "None",
          "Manual monitoring of pumped hours",
          "Manual metering",
          "Smart metering",
        ],
      },
      {
        key: "q3_3",
        label:
          "3.3 Status of Groundwater Recharge expressed as % of Groundwater extraction",
        options: ["(<20%)", "(20-40%)", "(40-50%)", "(>50%)", "Not Applicable"],
        notApplicableValue: -1,
      },
    ],
  },
  {
    title: "4. Water Circularity Status",
    questions: [
      {
        key: "q4_1",
        label: "4.1 Status of Rainwater Harvesting",
        options: [
          "None",
          "Roofwater harvesting from <50% of roof",
          "Roofwater harvesting from >50% of roof",
          "Roofwater harvesting + Non roof water harvesting",
        ],
      },
      {
        key: "q4_2",
        label: "4.2 Status of Greywater/Sewage Water Recycling or Reuse",
        options: [
          "None",
          "Footprint area available for siting a facility",
          "Work in progress - designed and waiting to be constructed",
          "Greywater/Sewage recycling is operational",
        ],
      },
      {
        key: "q4_3",
        label: "4.3 Status of Collective Reverse Osmosis Treated Water",
        options: [
          "No Reuse - Reject Water is Discharged",
          "Technically feasible to organize for non potable reuse",
          "Plans in place and to be executed",
          "Reject Water is being reused for non potable use",
          "Not Applicable",
        ],
        notApplicableValue: -1,
      },
    ],
  },
  {
    title: "5. Status of Green Vegetation Cover",
    questions: [
      {
        key: "q5_1",
        label: "5.1 Status of Green Cover Policy",
        options: [
          "None",
          "Green Cover Policy drafting in progress",
          "Green Cover Policy finalized",
          "Green Cover Policy finalized and shared with stakeholders",
        ],
      },
      {
        key: "q5_2",
        label: "5.2 Status of Green Coverage Area",
        options: ["(<10%)", "(10-25%)", "(25-50%)", "(>50%)"],
      },
      {
        key: "q5_3",
        label: "5.3 Status of Green Landscapes",
        options: [
          "High water using non-native species + no smart irrigation",
          "High water using non-native species + smart irrigation",
          "Native species + no smart irrigation",
          "Native species + smart irrigation",
        ],
      },
      {
        key: "q5_4",
        label: "5.4 Status of Green Roofs & Green Walls",
        options: [
          "None",
          "Plans for Green Roofs & Green Walls in place",
          "Green Roofs operational",
          "Green Roofs + Green Walls operational",
          "Not Applicable",
        ],
        notApplicableValue: -1,
      },
    ],
  },
];

// Helper functions
function getColorForScore(score) {
  if (score <= 1) {
    return interpolateColor("#e74c3c", "#f39c12", score);
  } else if (score <= 2) {
    return interpolateColor("#f39c12", "#f1c40f", score - 1);
  } else if (score <= 3) {
    return interpolateColor("#f1c40f", "#27ae60", score - 2);
  } else {
    return "#27ae60";
  }
}

function calculateSectionScore(section, form) {
  let total = 0,
    count = 0;
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
  return count ? total / count : 0;
}

function calculateTotalScore(form) {
  let total = 0,
    count = 0;
  sections.forEach((section) => {
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
  });
  return count ? total / count : 0;
}

function interpolateColor(color1, color2, factor) {
  var hex = function (x) {
    x = x.toString(16);
    return x.length === 1 ? "0" + x : x;
  };

  var r1 = parseInt(color1.substring(1, 3), 16);
  var g1 = parseInt(color1.substring(3, 5), 16);
  var b1 = parseInt(color1.substring(5, 7), 16);

  var r2 = parseInt(color2.substring(1, 3), 16);
  var g2 = parseInt(color2.substring(3, 5), 16);
  var b2 = parseInt(color2.substring(5, 7), 16);

  var r = Math.round(r1 + factor * (r2 - r1));
  var g = Math.round(g1 + factor * (g2 - g1));
  var b = Math.round(b1 + factor * (b2 - b1));

  return "#" + hex(r) + hex(g) + hex(b);
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function getMaturityLevel(score) {
  if (score < 1) return "Front Runner";
  else if (score < 2) return "Performer";
  else return "Achiever";
}

const Success = ({ form, sections, onRestart }) => {
  const pdfRef = useRef(null);
  const hasSentRef = useRef(false);
  const totalScore = calculateTotalScore(form);
  const overallColor = getColorForScore(totalScore);
  const maturity = getMaturityLevel(totalScore);

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

  const addFooter = (doc) => {
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    const footerY = pageHeight - 40;
    const leftX = margin;
    const centerX = doc.internal.pageSize.getWidth() / 2;
    const rightX = doc.internal.pageSize.getWidth() - margin;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    const leftText = "Hours\nMon-Fri / 7:00 – 18:00\nSaturday / 9:00 – 17:00";
    const centerText =
      "Corporate offices\nHead Office: Amravati, Maharashtra 444602\nCorporate Office: New Delhi, Delhi 110049";
    const rightText = "Contact Info\nEmail: contact@jalsmruti.org";

    const lineSpacing = 10;

    leftText.split("\n").forEach((line, i) => {
      doc.text(
        line,
        leftX,
        footerY - (leftText.split("\n").length - 1 - i) * lineSpacing
      );
    });

    centerText.split("\n").forEach((line, i) => {
      doc.text(
        line,
        centerX,
        footerY - (centerText.split("\n").length - 1 - i) * lineSpacing,
        {
          align: "center",
        }
      );
    });

    rightText.split("\n").forEach((line, i) => {
      doc.text(
        line,
        rightX,
        footerY - (rightText.split("\n").length - 1 - i) * lineSpacing,
        {
          align: "right",
        }
      );
    });
  };

  const generatePdfBlob = async () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const centerX = pageWidth / 2;

    const bannerBase64 = await getImageBase64(bannerImage);
    if (bannerBase64) {
      doc.addImage(bannerBase64, "PNG", 0, 0, pageWidth, 100);
    }
    let startY = bannerBase64 ? 120 : 40;

    const slogan =
      "The driving force behind Jalsmruti is empowering communities to restore India's cherished legacy — a land that was once celebrated as 'Sujalaam Sufalaam', abundant in water and lush vegetation.";

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);

    const marginX = 40;
    const maxWidth = pageWidth - marginX * 2;
    const words = slogan.split(" ");
    let line = "";
    const lines = [];

    words.forEach((word) => {
      const testLine = line + word + " ";
      const testWidth = doc.getTextWidth(testLine);
      if (testWidth > maxWidth) {
        lines.push(line.trim());
        line = word + " ";
      } else {
        line = testLine;
      }
    });
    if (line) lines.push(line.trim());

    lines.forEach((lineText, i) => {
      const y = startY + i * 18;
      const wordsInLine = lineText.split(" ");

      const lineWidth = wordsInLine.reduce((sum, word) => {
        return sum + doc.getTextWidth(word + " ");
      }, 0);

      let cursorX = (pageWidth - lineWidth) / 2;

      wordsInLine.forEach((word) => {
        if (word === "Jalsmruti") {
          doc.setTextColor(0, 102, 204); // Blue
          doc.setFont(undefined, "bold");
        } else if (
          word.includes("Sujalaam") ||
          word.includes("Sufalaam") ||
          word.includes("'Sujalaam") ||
          word.includes("Sufalaam',")
        ) {
          doc.setTextColor(0, 153, 76); // Green
          doc.setFont("helvetica", "italic");
        } else {
          doc.setTextColor(0, 0, 0);
          doc.setFont("helvetica", "normal");
        }

        const wordWidth = doc.getTextWidth(word + " ");
        doc.text(word + " ", cursorX, y);
        cursorX += wordWidth;
      });
    });

    startY += lines.length * 18 + 20;

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Name: ${form.fullName || "N/A"}`, centerX, startY, {
      align: "center",
    });
    startY += 20;
    doc.text(`Email: ${form.email || "N/A"}`, centerX, startY, {
      align: "center",
    });
    startY += 30;

    for (let i = 0; i < 3; i++) {
      const section = sections[i];
      const sectionScore = calculateSectionScore(section, form);
      const sectionColor = getColorForScore(sectionScore);
      const { r, g, b } = hexToRgb(sectionColor);

      doc.setFillColor(r, g, b);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.rect(40, startY, pageWidth - 80, 25, "F");
      doc.text(section.title, 50, startY + 17);
      doc.text(
        `Average Score: ${sectionScore.toFixed(2)}`,
        pageWidth - 50,
        startY + 17,
        { align: "right" }
      );
      startY += 25;

      const tableRows = section.questions.map((q) => {
        const val = form[q.key];
        const answerText =
          q.notApplicableValue && val === q.notApplicableValue
            ? "Not Applicable"
            : q.options?.[val] || val || "N/A";
        return [
          q.label,
          answerText,
          q.notApplicableValue && val === q.notApplicableValue ? "-" : val,
        ];
      });

      autoTable(doc, {
        startY,
        head: [["Question", "Answer", "Score"]],
        body: tableRows,
        margin: { left: 40, right: 40 },
        theme: "grid",
        styles: {
          fontSize: 9,
          textColor: 0,
          cellPadding: 5,
          lineWidth: 0.1,
          lineColor: [50, 50, 50],
        },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: 0,
          fontStyle: "bold",
        },
      });

      startY = doc.lastAutoTable.finalY + 28;
    }

    doc.addPage();
    startY = 40;

    for (let i = 3; i < 5; i++) {
      const section = sections[i];
      const sectionScore = calculateSectionScore(section, form);
      const sectionColor = getColorForScore(sectionScore);
      const { r, g, b } = hexToRgb(sectionColor);

      doc.setFillColor(r, g, b);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.rect(40, startY, pageWidth - 80, 25, "F");
      doc.text(section.title, 50, startY + 17);
      doc.text(
        `Average Score: ${sectionScore.toFixed(2)}`,
        pageWidth - 50,
        startY + 17,
        { align: "right" }
      );
      startY += 25;

      const tableRows = section.questions.map((q) => {
        const val = form[q.key];
        const answerText =
          q.notApplicableValue && val === q.notApplicableValue
            ? "Not Applicable"
            : q.options?.[val] || val || "N/A";
        return [
          q.label,
          answerText,
          q.notApplicableValue && val === q.notApplicableValue ? "-" : val,
        ];
      });

      autoTable(doc, {
        startY,
        head: [["Question", "Answer", "Score"]],
        body: tableRows,
        margin: { left: 40, right: 40 },
        theme: "grid",
        styles: {
          fontSize: 9,
          textColor: 0,
          cellPadding: 5,
          lineWidth: 0.1,
          lineColor: [50, 50, 50],
        },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: 0,
          fontStyle: "bold",
        },
      });

      startY = doc.lastAutoTable.finalY + 50;
    }

    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("OUR SERVICES", 40, startY);
    startY += 25;

    doc.setFontSize(13);
    doc.setFont(undefined, "normal");
    const services = [
      "• Water Body Rejuvenation & Restoration",
      "• Capacity Building & Behaviour Change",
      "• Water Positive Program for Urban Built Forms",
    ];

    services.forEach((service) => {
      doc.text(service, 50, startY);
      startY += 25;
    });

    startY += 10;

    if (startY + 200 > pageHeight - 60) {
      doc.addPage();
      startY = 40;
    }

    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    doc.setTextColor(0, 0, 0);

    doc.text("Donate", 40, startY);
    startY += 25;

    startY += 4;
    const text =
      "Jal Smruti Foundation is a Section 80G approved non profit entity based in India";

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);

    const wrappedLines = doc.splitTextToSize(text, maxWidth);

    wrappedLines.forEach((line) => {
      doc.text(line, marginX, startY);
      startY += 18;
    });

    startY += 5;

    doc.setFontSize(12);
    doc.setFont(undefined, "normal");
    doc.text(
      "Your donation to Jal Smruti Foundation is tax deductible",
      40,
      startY
    );
    startY += 30;

    doc.setFont(undefined, "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    const bankHeader = "Bank Details";
    doc.setFont(undefined, "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(bankHeader, 40, startY);

    const bankHeaderWidth = doc.getTextWidth(bankHeader);
    doc.line(40, startY + 2, 40 + bankHeaderWidth, startY + 2); // underline
    startY += 18;


    doc.setFont(undefined, "normal");
    const bankLines = [
      "Account Name: Jal Smruti Foundation",
      "Bank Name: State Bank of India",
      "Account Number: 40131834676",
      "Account Type: Current",
      "IFSC Code: SBIN0003866",
      "",
    ];
    bankLines.forEach((line) => {
      doc.text(line, 40, startY);
      startY += 15;
    });
    const upiLabel = "UPI:";
    doc.setFont(undefined, "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    doc.text(upiLabel, 40, startY);
    const upiLabelWidth = doc.getTextWidth(upiLabel);
    doc.line(40, startY + 2, 40 + upiLabelWidth, startY + 2);

    startY += 18;
    doc.setFont(undefined, "normal");
    doc.text("jalsmrutifoundation@ybl", 40, startY);
    startY += 20;


    addFooter(doc);

    return doc.output("blob");
  };

  const sendPdfToBackend = async () => {
    try {
      const blob = await generatePdfBlob();
      const fileName = `${form.fullName || "Water_Scorecard"}_Report.pdf`;
      const formData = new FormData();
      formData.append(
        "pdf",
        new File([blob], fileName, { type: "application/pdf" })
      );
      formData.append("email", form.email);
      formData.append("cc_email", "abcd.gmail.com");

      const res = await fetch("https://backend-8cq5.onrender.com/api/send-pdf-email", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        console.log("PDF emailed successfully");
      } else {
        console.error("Failed to send email");
      }
    } catch (err) {
      console.error("Error generating/sending PDF", err);
    }
  };

  const handleDownloadPdf = async () => {
    const blob = await generatePdfBlob();
    const fileName = `${
      form.fullName || "Water_Management"
    }_Assessment_Report.pdf`;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };


  useEffect(() => {
    if (!hasSentRef.current) {
      sendPdfToBackend();
      hasSentRef.current = true;
    }
  }, []);

  return (
    <Box sx={{ padding: 4, maxWidth: 900, margin: "auto" }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          component="img"
          src={bannerImage}
          alt="Banner"
          sx={{ width: "100%", maxHeight: 150, objectFit: "contain" }}
        />
        <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
          Thank you, {form.fullName || "User"} for completing the assessment!
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: overallColor,
          color: "white",
          textAlign: "center",
          py: 2,
          mb: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Overall Water Management Score: {totalScore.toFixed(2)}
        </Typography>
        <Typography variant="h6">Maturity Level: {maturity}</Typography>
      </Box>

      {sections.map((section) => {
        const sectionScore = calculateSectionScore(section, form);
        const color = getColorForScore(sectionScore);

        return (
          <Box
            key={section.title}
            sx={{
              marginBottom: 4,
              border: `2px solid ${color}`,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                backgroundColor: color,
                color: "white",
                p: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {section.title} (Average Score: {sectionScore.toFixed(2)})
              </Typography>
            </Box>

            <TableContainer>
              <Table size="small" aria-label={`${section.title} summary`}>
                <TableHead>
                  <TableRow>
                    <TableCell>Question</TableCell>
                    <TableCell>Answer</TableCell>
                    <TableCell>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {section.questions.map((q) => {
                    const val = form[q.key];
                    let answerText = "N/A";

                    if (val !== undefined) {
                      if (
                        q.notApplicableValue &&
                        val === q.notApplicableValue
                      ) {
                        answerText = "Not Applicable";
                      } else if (q.options) {
                        answerText = q.options[val] || val;
                      } else {
                        answerText = val;
                      }
                    }

                    return (
                      <TableRow key={q.key}>
                        <TableCell>{q.label}</TableCell>
                        <TableCell>{answerText}</TableCell>
                        <TableCell>
                          {q.notApplicableValue && val === q.notApplicableValue
                            ? "-"
                            : val}
                        </TableCell>
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
        sx={{
          textAlign: "center",
          marginTop: 4,
          padding: 2,
          borderTop: "2px solid #154360",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: 2 }}
          onClick={handleDownloadPdf}
        >
          Download PDF Report
        </Button>

        <Button variant="outlined" color="secondary" onClick={onRestart}>
          Submit Another Form
        </Button>
      </Box>
    </Box>
  );
};

export default Success;

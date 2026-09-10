import jwt from "../backend/node_modules/jsonwebtoken/index.js";
import dotenv from "../backend/node_modules/dotenv/lib/main.js";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../backend/.env") });

async function generatePDF() {
  try {
    const secret = process.env.JWT_SECRET || "dronx_secret_key";
    const token = jwt.sign({ id: "admin", role: "admin" }, secret, { expiresIn: "1h" });

    const response = await fetch("http://localhost:5000/api/recruitment", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (!data.success && !data.applications) {
      console.error("API response error:", data);
      return;
    }

    const allApps = data.applications || [];
    const pendingApps = allApps.filter(
      (app) => app.status === "Pending" || !app.status
    );

    console.log(`Total Applications: ${allApps.length}, Pending: ${pendingApps.length}`);

    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const today = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

    // Top Header Banner
    doc.setFillColor(9, 9, 11);
    doc.rect(0, 0, 210, 36, "F");

    doc.setTextColor(223, 165, 87);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("DRONEX AEROTECH", 105, 15, { align: "center" });

    doc.setFontSize(11);
    doc.setTextColor(200, 200, 200);
    doc.setFont("helvetica", "normal");
    doc.text("Pending Recruitment Applications Report", 105, 23, { align: "center" });

    doc.setFontSize(8.5);
    doc.setTextColor(160, 160, 160);
    doc.text(`Generated on: ${today} | Total Pending Candidates: ${pendingApps.length}`, 105, 30, { align: "center" });

    // Table Data
    const tableData = pendingApps.map((st, idx) => {
      const name = st.fullName || st.name || "N/A";
      const phone = st.phone || "N/A";
      const branch = st.branch || st.department || "N/A";
      const year = st.year || "N/A";
      const domain = st.domain || "N/A";
      const date = st.createdAt ? new Date(st.createdAt).toLocaleDateString("en-IN") : "N/A";
      return [idx + 1, name, phone, branch, year, domain, date];
    });

    autoTable(doc, {
      startY: 42,
      head: [["#", "Candidate Name", "Phone Number", "Branch", "Year", "Domain", "Applied Date"]],
      body: tableData,
      headStyles: {
        fillColor: [9, 9, 11],
        textColor: [223, 165, 87],
        fontStyle: "bold",
        fontSize: 9,
        halign: "center"
      },
      styles: {
        fontSize: 8.5,
        cellPadding: 3.5,
        textColor: [30, 30, 30],
        lineColor: [220, 220, 220],
        lineWidth: 0.2
      },
      alternateRowStyles: {
        fillColor: [248, 248, 250]
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 38, fontStyle: "bold" },
        2: { cellWidth: 30, halign: "center", fontStyle: "bold" },
        3: { cellWidth: 26 },
        4: { cellWidth: 18, halign: "center" },
        5: { cellWidth: 38 },
        6: { cellWidth: 25, halign: "center" }
      },
      margin: { left: 12, right: 12 }
    });

    // Footer with page numbering
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(130, 130, 130);
      doc.text(
        `Page ${i} of ${pageCount} — Dronex AeroTech Confidential Recruitment Document`,
        105,
        290,
        { align: "center" }
      );
    }

    const outputBuffer = Buffer.from(doc.output("arraybuffer"));

    // Save to workspace root
    const rootPath = path.join(__dirname, "../Pending_Recruitment_Students.pdf");
    fs.writeFileSync(rootPath, outputBuffer);
    console.log(`✅ Saved PDF to: ${rootPath}`);

    // Save to public dir for download link
    const publicPath = path.join(__dirname, "public/Pending_Recruitment_Students.pdf");
    fs.writeFileSync(publicPath, outputBuffer);
    console.log(`✅ Saved PDF to: ${publicPath}`);

    console.log("PDF generation finished successfully!");
  } catch (err) {
    console.error("Error generating PDF:", err);
  }
}

generatePDF();

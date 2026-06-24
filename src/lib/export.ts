import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const exportCSV = (data: any[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

  XLSX.writeFile(workbook, "orders.csv");
};

export const exportExcel = (data: any[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

  XLSX.writeFile(workbook, "orders.xlsx");
};

export const exportPDF = (
  data: any[],
  mode: "light" | "dark" = "light"
) => {
  const doc = new jsPDF();

  // DARK MODE BACKGROUND
  if (mode === "dark") {
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 297, "F");
    doc.setTextColor(248, 250, 252);
  }

  // TITLE
  doc.setFontSize(22);
  doc.text("StorePulse Analytics Report", 14, 20);

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);

  // KPI CARDS
  if (mode === "dark") {
    doc.setFillColor(37, 99, 235);
    doc.roundedRect(14, 38, 42, 20, 3, 3, "F");

    doc.setFillColor(139, 92, 246);
    doc.roundedRect(62, 38, 42, 20, 3, 3, "F");

    doc.setFillColor(6, 182, 212);
    doc.roundedRect(110, 38, 42, 20, 3, 3, "F");

    doc.setFillColor(16, 185, 129);
    doc.roundedRect(158, 38, 38, 20, 3, 3, "F");

    doc.setTextColor(255, 255, 255);

    doc.setFontSize(8);
    doc.text("Revenue", 18, 45);
    doc.text("Users", 68, 45);
    doc.text("Customers", 114, 45);
    doc.text("Growth", 163, 45);

    doc.setFontSize(12);
    doc.text("$1.24M", 18, 53);
    doc.text("48.2K", 68, 53);
    doc.text("1820", 114, 53);
    doc.text("24.6%", 163, 53);
  }

  if (mode === "light") {
    doc.setFillColor(243, 244, 246);
    doc.roundedRect(14, 38, 182, 20, 3, 3, "F");

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(11);
    doc.text(
      "Revenue: $1.24M   •   Users: 48.2K   •   Customers: 1820   •   Growth: 24.6%",
      18,
      50
    );
  }

  autoTable(doc, {
    startY: 70,
    head: [["Order ID", "Customer", "Date", "Status", "Amount"]],
    body: data.map((o) => [
      o.id,
      o.customer,
      o.date,
      o.status,
      `$${o.amount}`,
    ]),
    theme: "plain",
  });

  doc.save(
    mode === "dark"
      ? "storepulse-dark-report.pdf"
      : "storepulse-light-report.pdf"
  );
};

// ONLY LIGHT PRINT (dark removed)
export const printLight = () => {
  window.print();
};
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import toast from "react-hot-toast";
import { formatDate, formatToNaira } from "../commons/Utility";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import onwlLogo from "../assets/onwl-logo.png";

interface InvoiceModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  data: any | any[] | null;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  setIsOpen,
  data,
}) => {
  if (!data) return null;

  // Normalize to an array of orders
  const orders = Array.isArray(data) ? data : [data];

  // Build items array: use order.items if present, otherwise create one item per order
  const items: { description: string; qty: number; unitPrice: number }[] =
    orders.flatMap((order: any) => {
      if (Array.isArray(order.items) && order.items.length > 0) {
        return order.items.map((it: any) => ({
          description: it.description || it.name || `Order ${order.orderId}`,
          qty: Number(it.qty || it.quantity || 1),
          unitPrice: Number(
            it.unitPrice ?? it.unit_price ?? it.price ?? it.amount ?? 0
          ),
        }));
      } else {
        return [
          {
            description: `${order.orderId} - ${order.orderItem || "Order"}`,
            qty: Number(order.quantity ?? 1),
            unitPrice: Number(order.amount ?? 0),
          },
        ];
      }
    });

  const subtotal = items.reduce((s, it) => s + it.qty * it.unitPrice, 0);
  const vatRate = 0.075;
  const vat = +(subtotal * vatRate);
  const total = subtotal + vat;

  const invoiceLabel =
    orders.length > 1
      ? `Multiple Orders (${orders.length})`
      : orders[0].orderId;

  // Choose a single order to show as Bill To (first with a name, otherwise the first order)
  const billOrder =
    orders.find((o: any) => o.dropoffName || o.pickupName) || orders[0];
  const billName = billOrder.dropoffName || billOrder.pickupName || "";
  const billStreet = billOrder.dropoffStreet || billOrder.pickupStreet || "";
  const billPhone = billOrder.dropoffPhone || billOrder.pickupPhone || "";

  const handlePrint = () => {
    try {
      const printable = document.getElementById("invoice-content")?.outerHTML;
      if (!printable) {
        toast.error("Invoice content not available");
        return;
      }
      const w = window.open("", "_blank", "width=900,height=700");
      if (!w) {
        toast.error("Unable to open print window");
        return;
      }
      w.document.write(`
        <html><head><title>Invoice ${invoiceLabel}</title></head>
        <body>${printable}</body></html>
      `);
      w.document.close();
      w.focus();
      w.print();
    } catch {
      toast.error("Error printing invoice");
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const node = document.getElementById("invoice-content");
      if (!node) {
        toast.error("Invoice content not available");
        return;
      }

      // Better quality & CORS handling
      //const scale = Math.min(2, window.devicePixelRatio || 2);
      const canvas = await html2canvas(node, {
        useCORS: true,
        background: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Use jsPDF to compute image height in PDF units
      const imgProps = (pdf as any).getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      // Add pages while content overflows
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`invoice-${invoiceLabel}.pdf`);
    } catch (err: any) {
      console.error("PDF generation error:", err);
      toast.error("Error generating PDF: " + (err?.message || err));
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Invoice - {invoiceLabel}</DialogTitle>
      <DialogContent dividers>
        <div
          id="invoice-content"
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "#111827",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                src={onwlLogo}
                alt="Onwl Logo"
                style={{
                  maxWidth: 420,
                  maxHeight: 150,
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: 6,
                }}
              />
              <div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 18,
                    background: "linear-gradient(90deg,#ff7a18,#ff5500)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Onwl Business Solutions Ltd
                </div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>
                  75 CMD Road, Magodo, Lagod
                </div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>
                  business@goonwl.com | +234 806-424-4726
                </div>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700 }}>Invoice</div>
              <div>Invoice #: {invoiceLabel}</div>
              <div>Date: {formatDate(new Date().toISOString())}</div>
            </div>
          </div>

          {/* Bill To / From */}
          <div style={{ display: "flex", gap: 24, marginBottom: 12 }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Bill To</div>
              <div>{billName}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>{billStreet}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>{billPhone}</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>From</div>
              <div>Onwl Business Solution Ltd</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                TIN: 31341921-0001
              </div>
            </div>
          </div>

          {/* Items Table */}
          <table
            style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}
          >
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                <th style={{ padding: 12, textAlign: "left" }}>Description</th>
                <th style={{ padding: 12, textAlign: "left", width: 80 }}>
                  Qty
                </th>
                <th style={{ padding: 12, textAlign: "left", width: 120 }}>
                  Unit
                </th>
                <th style={{ padding: 12, textAlign: "right", width: 140 }}>
                  Line Total
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #e8e8e8" }}>
                  <td style={{ padding: 12 }}>{it.description}</td>
                  <td style={{ padding: 12 }}>{it.qty}</td>
                  <td style={{ padding: 12 }}>{formatToNaira(it.unitPrice)}</td>
                  <td style={{ padding: 12, textAlign: "right" }}>
                    {formatToNaira(it.qty * it.unitPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <table
            style={{
              width: "100%",
              maxWidth: 360,
              marginLeft: "auto",
              marginTop: 12,
            }}
          >
            <tbody>
              <tr>
                <td style={{ padding: 8 }}>Subtotal</td>
                <td style={{ padding: 8, textAlign: "right" }}>
                  {formatToNaira(subtotal)}
                </td>
              </tr>
              <tr>
                <td style={{ padding: 8 }}>VAT (7.5%)</td>
                <td style={{ padding: 8, textAlign: "right" }}>
                  {formatToNaira(vat)}
                </td>
              </tr>
              <tr style={{ fontWeight: 700 }}>
                <td style={{ padding: 8 }}>Total</td>
                <td style={{ padding: 8, textAlign: "right" }}>
                  {formatToNaira(total)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Bank Payment Options */}
          <div style={{ marginTop: 24, fontSize: "9px", color: "#374151" }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              Bank Payment Options
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              <div>
                <div style={{ fontWeight: 700 }}>
                  Onwl Business Solutions Limited
                </div>
                <div style={{ fontWeight: 700 }}>First City Monument Bank</div>
                <div>2000781137</div>
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>
                  Onwl Business Solutions Limited
                </div>
                <div style={{ fontWeight: 700 }}>Zenith Bank Plc</div>
                <div>1227983561</div>
              </div>
            </div>
          </div>

          {/* Signature */}
          <div
            style={{
              marginTop: 48,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 700 }}>Notes</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                Thank you for your business.
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 700, marginBottom: 24 }}>
                Authorized Signature
              </div>
              <div
                style={{
                  width: 260,
                  height: 70,
                  borderBottom: "2px solid #d1d5db",
                }}
              />
            </div>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
        <Button onClick={handlePrint}>Print</Button>
        {<Button onClick={handleDownloadPdf} color="primary">
          Download PDF
        </Button>}
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceModal;

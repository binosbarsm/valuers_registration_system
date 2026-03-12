"use client";

import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export default function CertificatePage() {

  const generateCertificate = async () => {

    const existingPdfBytes = await fetch("/cheti.pdf")
      .then(res => res.arrayBuffer());

    const fontBytes = await fetch("/fonts/certificatefont.ttf")
      .then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    pdfDoc.registerFontkit(fontkit);

    const customFont = await pdfDoc.embedFont(fontBytes);

    const page = pdfDoc.getPages()[0];

    const { width } = page.getSize();

    const name = "PAUL DANIEL Qia";

    const fontSize = 40;

    const textWidth = customFont.widthOfTextAtSize(name, fontSize);

    const x = (width - textWidth) / 2;

    const y = 350;

    page.drawText(name, {
      x,
      y,
      size: fontSize,
      font: customFont,
      color: rgb(0,0,0)
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "certificate.pdf";

    link.click();

  };

  return (
    <button onClick={generateCertificate}>
      Generate Certificate
    </button>
  );

}
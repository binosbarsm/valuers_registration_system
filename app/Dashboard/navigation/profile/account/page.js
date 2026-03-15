"use client";

import styles from "./account.module.css";
import { useRouter } from "next/navigation";
/** certificate gen imports */
import { PDFDocument} from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { rgb } from "pdf-lib";

export default function AccountPage(){

const router = useRouter();

/** certificate generation */
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

    const fontSize = 30;

    const textWidth = customFont.widthOfTextAtSize(name, fontSize);

    const x = (width - textWidth) / 2;

    const y = 380;

    function rgb255(r, g, b) {
  return rgb(r / 255, g / 255, b / 255);
}

    page.drawText(name, {
      x,
      y,
      size: fontSize,
      font: customFont,
      color: rgb255(11, 134, 75)
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes],{ type:"application/pdf"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "certificate.pdf";

    link.click();

  };

  /** code end */

return(

<div className={styles.container}>

{/* LEFT PROFILE */}

<div className={styles.sidebar}>

<img
src="/profile.jpg"
className={styles.avatar}
/>

<h2 className={styles.name}>
John Doe
</h2>

<div className={styles.section}>

<h3>Contact</h3>

<p>Dar es Salaam, Tanzania</p>
<p>+255 712 345 678</p>
<p>johndoe@email.com</p>

</div>

<div className={styles.section}>

<h3>Communication</h3>

<p>
Recognized for professional communication with clients
and maintaining ethical standards in property valuation.
</p>

</div>

</div>


{/* RIGHT SIDE */}

<div className={styles.main}>

<h1 className={styles.title}>
John Doe
</h1>

<p className={styles.subtitle}>
Registered Professional Valuer
</p>

<hr className={styles.line}/>

{/* EDUCATION */}

<section className={styles.block}>

<h2>Education</h2>

<p className={styles.school}>
University of Dar es Salaam
</p>

<p>Bachelor of Science in Real Estate</p>

<p className={styles.desc}>
Relevant coursework: Property valuation,
land economics, investment analysis and
urban development.
</p>

</section>


{/* EXPERIENCE */}

<section className={styles.block}>

<h2>Professional Experience</h2>

<p className={styles.date}>
2021 — Present
</p>

<p>
Registered Valuer | Tanzania Property Consultants
</p>

<p className={styles.desc}>
Responsible for property assessment, market analysis,
and valuation reporting for residential and commercial properties.
</p>

</section>

{/* REFAREES */}

<section className={styles.block}>

<h2>Refarees</h2>

<p className={styles.date}>
Frv Juma Kawoya
</p>

<p>
manager of Tpds
</p>

<p className={styles.desc}>contacts:093238293</p>
<p className={styles.desc}>Emails:Jkawoya@xxxx</p>
</section>

{/* CERTIFICATE BUTTON */}

<div className={styles.certificateArea}>

<button
className={styles.certificateBtn}
onClick={generateCertificate}
>

Generate Certificate

</button>

</div>

</div>

</div>

);

}
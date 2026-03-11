"use client";

import styles from "./account.module.css";
import { useRouter } from "next/navigation";

export default function AccountPage(){

const router = useRouter();

function handleCertificate(){
    router.push("/Dashboard/certificate");
}

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
onClick={handleCertificate}
>

Generate Certificate

</button>

</div>

</div>

</div>

);

}
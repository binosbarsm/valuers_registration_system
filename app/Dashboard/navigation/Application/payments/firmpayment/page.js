"use client";

import { useState } from "react";
import styles from "./payment.module.css";
import { useRouter } from "next/navigation";

export default function PaymentSection({ prevStep }) {
  const [controlNumber, setControlNumber] = useState("");
  const [loading, setLoading] = useState(false);
 const router = useRouter();
  // Generate random control number starting with 99 + 12 random digits
  const generateControlNumber = () => {
    setLoading(true);
    setControlNumber(""); // Clear before generating

    setTimeout(() => {
      let randomDigits = "";
      for (let i = 0; i < 12; i++) {
        randomDigits += Math.floor(Math.random() * 10);
      }
      setControlNumber(`99${randomDigits}`);
      setLoading(false);
    }, 1200); // simulate short delay for effect
  };

  function handlepayment(){
      router.push("/Dashboard/navigation/Application/submission/firmsubmission");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Payment Section</h1>

<p className={styles.instruction}>
  Click the button below to get your <strong>control number</strong> — 
  this number will be used to make payment for your application fee.
</p>

      <div className={styles.controlBox}>
          <button
        className={styles.controlBtn}
        onClick={generateControlNumber}
        disabled={loading}
      >
        {loading ? (
          <div className={styles.spinner}></div>
        ) : (
          "Get Control Number"
        )}
      </button>
        <div className={styles.controlNumber}>
          {controlNumber || "–––"}
        </div>
      </div>

   

      <div className={styles.confirmSection}>
        <button className={styles.confirmBtn} disabled={!controlNumber} onClick={handlepayment}>
          Confirm Payment
        </button>
      </div>

      <div className={styles.warning}>
      ⚠️ Please note: The application will <strong>not proceed</strong> unless payment is completed.
      </div>
    </div>
  );
}
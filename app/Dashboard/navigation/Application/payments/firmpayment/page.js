"use client";

import { useState } from "react";
import styles from "./payment.module.css";
import { useRouter } from "next/navigation";

export default function PaymentSection() {

  const [controlNumber, setControlNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // Generate control number
  const generateControlNumber = () => {

    if (controlNumber) return; // prevent regeneration

    setLoading(true);

    setTimeout(() => {

      let randomDigits = "";
      for (let i = 0; i < 12; i++) {
        randomDigits += Math.floor(Math.random() * 10);
      }

      setControlNumber(`99${randomDigits}`);
      setLoading(false);

    }, 1200);

  };

  const copyNumber = () => {

    navigator.clipboard.writeText(controlNumber);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);

  };

  function handlepayment(){
    setShowModal(true);
  }

  function handleNext(){
    router.push("/Dashboard");
  }

  return (

    <div className={styles.container}>

      <h1 className={styles.title}>Registration Payment</h1>

      <p className={styles.instruction}>
        Click the button below to generate your <strong>Control Number</strong>.  
        Use this number to complete your registration payment.
      </p>

      <div className={styles.controlBox}>

        <button
          className={styles.controlBtn}
          onClick={generateControlNumber}
          disabled={loading || controlNumber}
        >
          {loading ? <div className={styles.spinner}></div> : "Get Control Number"}
        </button>

        <div className={styles.controlNumber}>
          {controlNumber || "––– ––– ––– –––"}
        </div>

        {controlNumber && (
          <button
            className={styles.copyBtn}
            onClick={copyNumber}
          >
            {copied ? "Copied ✓" : "Copy Control Number"}
          </button>
        )}

      </div>

      <div className={styles.confirmSection}>
       <p>Amount: <span className={styles.amountin}>100,000</span>/=</p>
        <button
          className={styles.confirmBtn}
          disabled={!controlNumber}
          onClick={handlepayment}
        >
          Confirm Payment
        </button>
{/* SUCCESS MODAL */}

      {showModal && (

        <div className={styles.modalOverlay}>

          <div className={styles.modal}>

            <div className={styles.successAnimation}>
              <div className={styles.circle}></div>
              <div className={styles.check}>✓</div>
            </div>

            <h2 className={styles.successText}>
              Payment Successful!
            </h2>

            <button
              className={styles.nextBtn}
              onClick={handleNext}
            >
              Done
            </button>

          </div>

        </div>

      )}

      </div>

      <div className={styles.warning}>
        ⚠️ Your registration will <strong>not proceed</strong> until payment is completed.
      </div>

    </div>

  );

}
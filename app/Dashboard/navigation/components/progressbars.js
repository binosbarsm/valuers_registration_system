"use client"

import styles from "./progressbars.module.css";
import { FaUserEdit, FaFileAlt, FaUpload, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";
import { FaHourglassStart } from "react-icons/fa6";

export default function ProgressBar({ currentStep }) {

  const steps = [
     { label: "Introduction", icon: <FaHourglassStart /> },
    { label: "Registration Type", icon: <FaUserEdit /> },
    { label: "Fill Form", icon: <FaFileAlt /> },
    { label: "Upload Documents", icon: <FaUpload /> },
    { label: "Payment", icon: <FaMoneyBillWave /> },
    { label: "Review", icon: <FaCheckCircle /> },

  ];

  return (
    <div className={styles.container}>

      {steps.map((step, index) => {

        const stepNumber = index + 1;

        return (
          <div key={index} className={styles.step}>

            <div
              className={`${styles.circle}
              ${currentStep >= stepNumber ? styles.active : ""}`}
            >
              {currentStep > stepNumber ? "✓" : step.icon}
            </div>

            <p className={styles.label}>{step.label}</p>

            {index !== steps.length - 1 && (
              <div
                className={`${styles.line}
                ${currentStep > stepNumber ? styles.activeLine : ""}`}
              />
            )}

          </div>
        );
      })}

    </div>
  );
}
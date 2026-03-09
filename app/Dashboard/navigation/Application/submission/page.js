"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./submission.module.css";
import { FaEdit, FaEye } from "react-icons/fa";

export default function FinalStage({ prevStep }) {
  const [formData, setFormData] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedData = sessionStorage.getItem("frvApplication");
    if (storedData) setFormData(JSON.parse(storedData));
  }, []);

  if (!formData) return <p>Loading...</p>;

  const handleEdit = () => router.push("/Dashboard/navigation/Application/frv");
  const handlePreview = () => router.push("/Dashboard/navigation/Application/preview");
  const handleSubmit = () => {
    if (!agreed) return;
    console.log("Final data submitted:", formData);
    router.push("/Dashboard/navigation/Application/submitted");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Final Step: Review & Submit</h1>

      {/* --- Summary Row Card --- */}
      <div className={styles.summaryCard}>
        <div className={styles.summaryRow}>
          <div className={styles.summaryItem}>
            <span className={styles.label}>Full Name</span>
            <span className={styles.value}>{`${formData.surname} ${formData.firstName} ${formData.otherNames}`}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.label}>Gender</span>
            <span className={styles.value}>{formData.gender || "-"}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>{formData.email || "-"}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.label}>Employment</span>
            <span className={styles.value}>
              {formData.employed
                ? formData.employerName || "-"
                : formData.notEmployedOption === "student"
                ? formData.studentInstitution || "-"
                : formData.otherEngagement || "-"}
            </span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.label}>Education</span>
            <span className={styles.value}>{formData.education?.map((edu) => edu.level).join(", ") || "-"}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.label}>Exam</span>
            <span className={styles.value}>{formData.examType || "-"}</span>
          </div>
          <div className={styles.summaryActions}>
            <button onClick={handleEdit} className={styles.iconBtn}>
              <FaEdit /> Edit
            </button>
            <button onClick={handlePreview} className={styles.iconBtn}>
              <FaEye /> Preview
            </button>
          </div>
        </div>
      </div>

      {/* --- Declaration --- */}
      <div className={styles.declarationCard}>
        <div className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            id="agreeDeclaration"
          />
        </div>
        <div className={styles.declarationText}>
          <p>
            ⚠️ I have read and agreed to abide by the Examination Regulations and by-laws of the Board and accept that any false information supplied by me invalidates my application.
          </p>
          <span className={styles.note}>
            Once submitted, this information cannot be edited.
          </span>
        </div>
      </div>

      {/* --- Buttons --- */}
      <div className={styles.buttonGroup}>
        <button className={styles.prevBtn} onClick={prevStep}>
          Prev
        </button>
        <button className={styles.submitBtn} disabled={!agreed} onClick={handleSubmit}>
          Submit Application
        </button>
      </div>
    </div>
  );
}
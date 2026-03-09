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
            I/We the undersigned hereby declare as follows:
          </p>
          <ol>
            <li>
              My/our signing of this application form implies acceptance of responsibility for the veracity and
              accuracy of all information submitted therein or therewith.
            </li>
            <li>
              The information given will be used by the Board for the purpose of evaluating this application for
              registration. Such registration will be approved at the sole discretion of the Board.
            </li>
            <li>
              Any personal or board corporate may be requested to provide information on the competence and
              general reputation of our firm if so requested by the Board.
            </li>
            <li>
              The Board is welcome to visit and physically inspect my/our establishment, when it deems fit to
              do so, in order to verify the authenticity of the information given herein, or by my/our Referees, or
              obtained from any other source regarding our firm.
            </li>
            <li>
              I/we understand that my/our failure to provide the required information or any information
              provided may prohibit the registration of my/our firm.
            </li>
            <li>
              My/our firm shall not be engaged in any acts of bribery or corrupt practices in whatever form.
            </li>
          </ol>
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
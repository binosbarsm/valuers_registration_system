"use client"

import { useEffect, useState,useContext } from "react"
import { useRouter } from "next/navigation"
import styles from "./upload.module.css"
import { stageContext } from "../../layout"
import { FaFilePdf, FaFileWord, FaFileImage, FaFileAlt } from "react-icons/fa"

export default function UploadDocuments() {
const {now,setNow}= useContext(stageContext);
  const [education, setEducation] = useState([])
  const [files, setFiles] = useState({})
  const router = useRouter()

  // Load FRV form data from sessionStorage
  useEffect(() => {
    const storedData = sessionStorage.getItem("frvApplication")
    if (storedData) {
      const parsed = JSON.parse(storedData)
      setEducation(parsed.education || [])
    }
  }, [])

  // Handle file selection
  const handleFileChange = (key, file) => {
    setFiles((prev) => ({
      ...prev,
      [key]: file
    }))
  }

  // Navigate to payment page
  const handleClick = () => {
    router.push("/Dashboard/navigation/Application/submission")
    setNow((prev)=>prev + 1);
  }

  
  const handlePrev= ()=>{
  router.back();
  setNow((prev)=>prev - 1);
}

  // Determine icon based on file type
  const getFileIcon = (file) => {
    if (!file) return null
    const ext = file.name.split(".").pop().toLowerCase()
    if (ext === "pdf") return <FaFilePdf className={styles.fileIconPdf} />
    if (ext === "doc" || ext === "docx") return <FaFileWord className={styles.fileIconWord} />
    if (["jpg","jpeg","png"].includes(ext)) return <FaFileImage className={styles.fileIconImage} />
    return <FaFileAlt className={styles.fileIconGeneric} />
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Supporting Documents</h1>
      <p className={styles.subtitle}>
        Upload documents supporting your qualifications. Employment proof is mandatory.
      </p>

      <div className={styles.documentList}>

        {/* EDUCATION DOCUMENTS */}
        {education.length > 0 ? (
          education.map((edu, index) => (
            <div key={index} className={styles.documentRow}>
              <div className={styles.docInfo}>
                <h4>{edu.level || "Qualification"} Certificate</h4>
                <p>Upload certificate for this qualification</p>
              </div>

              <label className={styles.uploadBox}>
                <input
                  type="file"
                  className={styles.hiddenInput}
                  onChange={(e) =>
                    handleFileChange(`education_${index}`, e.target.files[0])
                  }
                />

                <div className={styles.uploadContent}>
                  {!files[`education_${index}`] ? (
                    <>
                      <p className={styles.uploadText}>Click to upload document</p>
                      <span className={styles.fileHint}>PDF, Word, or Image</span>
                    </>
                  ) : (
                    <div className={styles.filePreview}>
                      {getFileIcon(files[`education_${index}`])}
                      <p className={styles.fileName}>
                        {files[`education_${index}`].name}
                      </p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          ))
        ) : (
          <p style={{ color: "#888", marginBottom: "20px" }}>No education qualification added yet.</p>
        )}

        {/* EMPLOYMENT PROOF (ALWAYS SHOWN) */}
        <div className={styles.documentRow}>
          <div className={styles.docInfo}>
            <h4>Employer / Institutional Proof</h4>
            <p>Letter from employer or institution confirming your engagement</p>
          </div>

          <label className={styles.uploadBox}>
            <input
              type="file"
              className={styles.hiddenInput}
              onChange={(e) =>
                handleFileChange("employmentProof", e.target.files[0])
              }
            />

            <div className={styles.uploadContent}>
              {!files.employmentProof ? (
                <>
                  <p className={styles.uploadText}>Click to upload document</p>
                  <span className={styles.fileHint}>PDF, Word, or Image</span>
                </>
              ) : (
                <div className={styles.filePreview}>
                  {getFileIcon(files.employmentProof)}
                  <p className={styles.fileName}>
                    {files.employmentProof.name}
                  </p>
                </div>
              )}
            </div>
          </label>
        </div>

      </div>

      {/* BUTTONS */}
      <div className={styles.buttonGroup}>
        <button className={styles.prevBtn} onClick={handlePrev}>Prev</button>
        <button className={styles.nextBtn} onClick={handleClick}>Submit</button>
      </div>
    </div>
  )
}
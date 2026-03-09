"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import styles from "./upload.module.css"
import { FaFileImage, FaFilePdf, FaFileWord, FaFileAlt } from "react-icons/fa"

export default function UploadDocuments() {
  const router = useRouter()
  const [photo, setPhoto] = useState(null)
  const [documents, setDocuments] = useState([])

  // Load education & experience from PRV session storage
  useEffect(() => {
    const savedForm = sessionStorage.getItem("frvApplication")
    if (!savedForm) return

    const formData = JSON.parse(savedForm)
    const docs = []

    // Create document slots for education
    formData.education?.forEach((edu, index) => {
      docs.push({
        id: `edu-${index}`,
        type: `Education Certificate (${edu.level || "Qualification " + (index + 1)})`,
        file: null,
        name: ""
      })
    })

    // Create document slots for experience
    formData.experience?.forEach((exp, index) => {
      docs.push({
        id: `exp-${index}`,
        type: `Experience Certificate (${exp.institution || "Experience " + (index + 1)})`,
        file: null,
        name: ""
      })
    })

    setDocuments(docs)
  }, [])

  const handleFileChange = (id, file) => {
    setDocuments(prev =>
      prev.map(doc => doc.id === id ? { ...doc, file, name: file.name } : doc)
    )
  }

  const handlePhotoChange = (file) => setPhoto(file)

  const handleSubmit = () => {
    if (!photo) {
      alert("Please upload your passport photo before submitting.")
      return
    }

    // Ensure all documents are uploaded
    for (const doc of documents) {
      if (!doc.file) {
        alert(`Please upload the ${doc.type}.`)
        return
      }
    }

    // Save photo & documents metadata to sessionStorage
    sessionStorage.setItem("userPhoto", JSON.stringify({
      name: photo.name,
      type: photo.type,
      size: photo.size
    }))

    sessionStorage.setItem("userDocuments", JSON.stringify(
      documents.map(d => ({
        id: d.id,
        type: d.type,
        name: d.name,
        size: d.file.size,
        mimeType: d.file.type
      }))
    ))

    router.push("/Dashboard/navigation/Application/payments")
  }

  const getFileIcon = (file) => {
    if (!file) return <FaFileAlt className={styles.fileIconGeneric} />
    const ext = file.name.split(".").pop().toLowerCase()
    if (["jpg","jpeg","png"].includes(ext)) return <FaFileImage className={styles.fileIconImage} />
    if (ext === "pdf") return <FaFilePdf className={styles.fileIconPdf} />
    if (["doc","docx"].includes(ext)) return <FaFileWord className={styles.fileIconWord} />
    return <FaFileAlt className={styles.fileIconGeneric} />
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Your Photo & Certificates</h1>
      <p className={styles.subtitle}>
        Upload a recent passport-size photo and all relevant certificates based on your education and practical experience.
      </p>

      {/* Passport Photo */}
      <div className={styles.educationCard} style={{ borderLeftColor: "#00aa55" }}>
        <div className={styles.educationHeader}>
          <h4>Passport Photo</h4>
        </div>

        <label className={styles.uploadBox}>
          <input
            type="file"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={(e) => handlePhotoChange(e.target.files[0])}
          />
          <div className={styles.uploadContent}>
            {!photo ? (
              <>
                <p className={styles.uploadText}>Click to upload your photo</p>
                <span className={styles.fileHint}>JPEG, PNG, or JPG</span>
              </>
            ) : (
              <div className={styles.filePreview}>
                {getFileIcon(photo)}
                <p className={styles.fileName}>{photo.name}</p>
              </div>
            )}
          </div>
        </label>
      </div>

      {/* Dynamic Document Uploads */}
      <h2 className={styles.sectionTitle}>Supporting Documents</h2>
      <div className={styles.documentList}>
        {documents.map(doc => (
          <div key={doc.id} className={styles.documentRow}>
            <div className={styles.docInfo}>
              <h4>{doc.type}</h4>
              <p>{doc.name || "No file uploaded"}</p>
            </div>

            <label className={styles.uploadBox} style={{ width: "180px", padding: "12px" }}>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className={styles.hiddenInput}
                onChange={(e) => handleFileChange(doc.id, e.target.files[0])}
              />
              <div className={styles.uploadContent}>
                {!doc.file ? (
                  <span className={styles.uploadText}>Upload</span>
                ) : (
                  getFileIcon(doc.file)
                )}
              </div>
            </label>
          </div>
        ))}
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.prevBtn} onClick={() => router.back()}>Prev</button>
        <button className={styles.nextBtn} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}
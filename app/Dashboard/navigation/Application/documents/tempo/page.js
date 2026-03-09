"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import styles from "./upload.module.css"
import { FaFileImage, FaFilePdf, FaFileWord } from "react-icons/fa"

export default function UploadDocuments() {
  const router = useRouter()

  const [photo, setPhoto] = useState(null)
  const [educationDocs, setEducationDocs] = useState([])
  const [experienceDocs, setExperienceDocs] = useState([])
  const [projectDocs, setProjectDocs] = useState([])

  const [education, setEducation] = useState([])
  const [experience, setExperience] = useState([])
  const [projectDetails, setProjectDetails] = useState([])

  // Load data from sessionStorage
  useEffect(() => {
    const frvData = JSON.parse(sessionStorage.getItem("frvApplication"))
    if (frvData) {
      if (frvData.education?.length) setEducation(frvData.education)
      if (frvData.experience?.length) setExperience(frvData.experience)
    }

    const tempoData = JSON.parse(sessionStorage.getItem("tempoApplication"))
    if (tempoData && tempoData.projectdetails?.length) {
      setProjectDetails(tempoData.projectdetails)
    }
  }, [])

  const handleFileChange = (setter, index, file) => {
    setter(prev => {
      const updated = [...prev]
      updated[index] = file
      return updated
    })
  }

  const handlePhotoChange = (file) => setPhoto(file)

  const handleSubmit = () => {
    if (!photo) {
      alert("Please upload your passport photo before submitting.")
      
    }

    router.push("/Dashboard/navigation/Application/payments")
  }

  const renderFileIcon = (file) => {
    if (!file) return <FaFilePdf className={styles.fileIconGeneric} />
    if (file.type.includes("pdf")) return <FaFilePdf className={styles.fileIconPdf} />
    if (file.type.includes("word") || file.type.includes("msword") || file.type.includes("officedocument")) return <FaFileWord className={styles.fileIconWord} />
    if (file.type.includes("image")) return <FaFileImage className={styles.fileIconImage} />
    return <FaFileImage className={styles.fileIconGeneric} />
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Your Documents</h1>
      <p className={styles.subtitle}>
        Upload your passport photo and documents based on your education, experience, and project engagements.
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
                {renderFileIcon(photo)}
                <p className={styles.fileName}>{photo.name}</p>
              </div>
            )}
          </div>
        </label>
      </div>

      {/* Education Documents */}
      {education.length > 0 && education.map((edu, index) => (
        <div key={index} className={styles.educationCard} style={{ borderLeftColor: "#2563eb" }}>
          <div className={styles.educationHeader}>
            <h4>Education Document {index + 1}: {edu.institution || "Institution"}</h4>
          </div>

          <label className={styles.uploadBox}>
            <input
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              className={styles.hiddenInput}
              onChange={(e) => handleFileChange(setEducationDocs, index, e.target.files[0])}
            />
            <div className={styles.uploadContent}>
              {!educationDocs[index] ? (
                <>
                  <p className={styles.uploadText}>Upload certificate / transcript</p>
                  <span className={styles.fileHint}>PDF, Word, or Image</span>
                </>
              ) : (
                <div className={styles.filePreview}>
                  {renderFileIcon(educationDocs[index])}
                  <p className={styles.fileName}>{educationDocs[index].name}</p>
                </div>
              )}
            </div>
          </label>
        </div>
      ))}

      {/* Experience Documents */}
      {experience.length > 0 && experience.map((exp, index) => (
        <div key={index} className={styles.educationCard} style={{ borderLeftColor: "#dc2626" }}>
          <div className={styles.educationHeader}>
            <h4>Experience Document {index + 1}: {exp.institution || "Institution"}</h4>
          </div>

          <label className={styles.uploadBox}>
            <input
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              className={styles.hiddenInput}
              onChange={(e) => handleFileChange(setExperienceDocs, index, e.target.files[0])}
            />
            <div className={styles.uploadContent}>
              {!experienceDocs[index] ? (
                <>
                  <p className={styles.uploadText}>Upload experience certificate / reference letter</p>
                  <span className={styles.fileHint}>PDF, Word, or Image</span>
                </>
              ) : (
                <div className={styles.filePreview}>
                  {renderFileIcon(experienceDocs[index])}
                  <p className={styles.fileName}>{experienceDocs[index].name}</p>
                </div>
              )}
            </div>
          </label>
        </div>
      ))}

      {/* Project Documents */}
      {projectDetails.length > 0 && projectDetails.map((proj, index) => (
        <div key={index} className={styles.educationCard} style={{ borderLeftColor: "#eba225" }}>
          <div className={styles.educationHeader}>
            <h4>Project Document {index + 1}: {proj.Project_Name || "Project"}</h4>
          </div>

          <label className={styles.uploadBox}>
            <input
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              className={styles.hiddenInput}
              onChange={(e) => handleFileChange(setProjectDocs, index, e.target.files[0])}
            />
            <div className={styles.uploadContent}>
              {!projectDocs[index] ? (
                <>
                  <p className={styles.uploadText}>Upload project-related documents / engagement proof</p>
                  <span className={styles.fileHint}>PDF, Word, or Image</span>
                </>
              ) : (
                <div className={styles.filePreview}>
                  {renderFileIcon(projectDocs[index])}
                  <p className={styles.fileName}>{projectDocs[index].name}</p>
                </div>
              )}
            </div>
          </label>
        </div>
      ))}

      {/* Buttons */}
      <div className={styles.buttonGroup}>
        <button className={styles.prevBtn} onClick={() => router.back()}>Prev</button>
        <button className={styles.nextBtn} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}
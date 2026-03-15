"use client"

import react,{ useState,useContext } from "react"
import { useRouter } from "next/navigation"
import styles from "./upload.module.css"
import { FaFilePdf, FaFileWord, FaFileImage } from "react-icons/fa"
import { stageContext } from "../../layout"


export default function UploadDocuments() {
  const {now,setNow}= useContext(stageContext);

  const router = useRouter()
  // State for required documents
  const [othersCertificates, setOthersCertificates] = useState([null])
  const [bankStatement, setBankStatement] = useState(null)
  const [valuationReport, setValuationReport] = useState(null)
  const [lettersOfOffer, setLettersOfOffer] = useState(null)
  const [titleDeed, setTitleDeed] = useState(null)

  const handleFileChange = (setter, index, file) => {
    setter(prev => {
      const updated = [...prev]
      updated[index] = file
      return updated
    })
  }

  const addOtherCertificate = () => {
    setOthersCertificates([...othersCertificates, null])
  }

  const removeOtherCertificate = (index) => {
    setOthersCertificates(prev => prev.filter((_, i) => i !== index))
  }

  const renderFileIcon = (file) => {
    if (!file) return <FaFilePdf className={styles.fileIconGeneric} />
    if (file.type.includes("pdf")) return <FaFilePdf className={styles.fileIconPdf} />
    if (file.type.includes("word") || file.type.includes("msword") || file.type.includes("officedocument")) return <FaFileWord className={styles.fileIconWord} />
    if (file.type.includes("image")) return <FaFileImage className={styles.fileIconImage} />
    return <FaFileImage className={styles.fileIconGeneric} />
  }

  const handleSubmit = () => {
    const finalDocs = {
      othersCertificates,
      bankStatement,
      valuationReport,
      lettersOfOffer,
      titleDeed
    }
    sessionStorage.setItem("firmDocuments", JSON.stringify(finalDocs))
    router.push("/Dashboard/navigation/Application/submission/firmsubmission");
    setNow((prev)=>prev + 1);
  }

  const handlePrev= ()=>{
  router.back();
  setNow((prev)=>prev - 1);
}

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Firm Documents</h1>
      <p className={styles.subtitle}>
        Upload required documents for your firm based on the categories below.
      </p>

      {/* Others Certificates / Ownership Photocopies */}
      {othersCertificates.map((file, index) => (
        <div key={index} className={styles.educationCard}>
          <div className={styles.educationHeader}>
            <h4>Certificate / Photocopies of Ownership {index + 1}</h4>
            {index > 0 && (
              <button className={styles.deleteBtn} onClick={() => removeOtherCertificate(index)}>Delete</button>
            )}
          </div>

          <label className={styles.uploadBox}>
            <input
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              className={styles.hiddenInput}
              onChange={(e) => handleFileChange(setOthersCertificates, index, e.target.files[0])}
            />
            <div className={styles.uploadContent}>
              {!file ? (
                <>
                  <p className={styles.uploadText}>Upload certificate / ownership document</p>
                  <span className={styles.fileHint}>PDF, Word, or Image</span>
                </>
              ) : (
                <div className={styles.filePreview}>
                  {renderFileIcon(file)}
                  <p className={styles.fileName}>{file.name}</p>
                </div>
              )}
            </div>
          </label>
        </div>
      ))}

      <button className={styles.addBtn} onClick={addOtherCertificate}>+ Add Another Certificate</button>

      {/* Certified Bank Statement */}
      <div className={styles.educationCard}>
        <div className={styles.educationHeader}>
          <h4>Certified Bank Statement</h4>
        </div>

        <label className={styles.uploadBox}>
          <input
            type="file"
            accept=".pdf,.doc,.docx,image/*"
            className={styles.hiddenInput}
            onChange={(e) => setBankStatement(e.target.files[0])}
          />
          <div className={styles.uploadContent}>
            {!bankStatement ? (
              <>
                <p className={styles.uploadText}>Upload certified bank statement</p>
                <span className={styles.fileHint}>PDF, Word, or Image</span>
              </>
            ) : (
              <div className={styles.filePreview}>
                {renderFileIcon(bankStatement)}
                <p className={styles.fileName}>{bankStatement.name}</p>
              </div>
            )}
          </div>
        </label>
      </div>

      {/* Valuation Report */}
      <div className={styles.educationCard}>
        <div className={styles.educationHeader}>
          <h4>Valuation Report for Fixed Asset by Approved Valuers</h4>
        </div>

        <label className={styles.uploadBox}>
          <input
            type="file"
            accept=".pdf,.doc,.docx,image/*"
            className={styles.hiddenInput}
            onChange={(e) => setValuationReport(e.target.files[0])}
          />
          <div className={styles.uploadContent}>
            {!valuationReport ? (
              <>
                <p className={styles.uploadText}>Upload valuation report</p>
                <span className={styles.fileHint}>PDF, Word, or Image</span>
              </>
            ) : (
              <div className={styles.filePreview}>
                {renderFileIcon(valuationReport)}
                <p className={styles.fileName}>{valuationReport.name}</p>
              </div>
            )}
          </div>
        </label>
      </div>

      {/* Letters of Offer */}
      <div className={styles.educationCard}>
        <div className={styles.educationHeader}>
          <h4>Letters of Offer</h4>
        </div>

        <label className={styles.uploadBox}>
          <input
            type="file"
            accept=".pdf,.doc,.docx,image/*"
            className={styles.hiddenInput}
            onChange={(e) => setLettersOfOffer(e.target.files[0])}
          />
          <div className={styles.uploadContent}>
            {!lettersOfOffer ? (
              <>
                <p className={styles.uploadText}>Upload letters of offer</p>
                <span className={styles.fileHint}>PDF, Word, or Image</span>
              </>
            ) : (
              <div className={styles.filePreview}>
                {renderFileIcon(lettersOfOffer)}
                <p className={styles.fileName}>{lettersOfOffer.name}</p>
              </div>
            )}
          </div>
        </label>
      </div>

      {/* Title Deed */}
      <div className={styles.educationCard}>
        <div className={styles.educationHeader}>
          <h4>Title Deed</h4>
        </div>

        <label className={styles.uploadBox}>
          <input
            type="file"
            accept=".pdf,.doc,.docx,image/*"
            className={styles.hiddenInput}
            onChange={(e) => setTitleDeed(e.target.files[0])}
          />
          <div className={styles.uploadContent}>
            {!titleDeed ? (
              <>
                <p className={styles.uploadText}>Upload title deed</p>
                <span className={styles.fileHint}>PDF, Word, or Image</span>
              </>
            ) : (
              <div className={styles.filePreview}>
                {renderFileIcon(titleDeed)}
                <p className={styles.fileName}>{titleDeed.name}</p>
              </div>
            )}
          </div>
        </label>
      </div>

      {/* Buttons */}
      <div className={styles.buttonGroup}>
        <button className={styles.prevBtn} onClick={handlePrev}>Prev</button>
        <button className={styles.nextBtn} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}
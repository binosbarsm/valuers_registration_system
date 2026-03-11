"use client"

import { useState, useEffect } from "react"
import styles from "./review.module.css"
import DecisionModal from "../components/DecisionModal"
import AttachmentViewer from "../components/AttachmentModal"
import SectionCard from "../components/SectionCard"

export default function ApplicationReview() {

  const [application, setApplication] = useState(null)
  const [decision, setDecision] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showComment,setShowComment] = useState(false)
  const [comment,setComment] = useState("")
  useEffect(() => {

    // simulate fetching application data
    const data = {
      formType: "individual",
      personalDetails: {
        surname: "Sipendi",
        firstName: "Brian",
        nationality: "Tanzanian",
        phone: "+255 712 000000",
        email: "brian@email.com"
      },

      education: {
        oLevel: "Azania Secondary School",
        aLevel: "Tambaza High School",
        professional: "BSc Real Estate"
      },

      attachments: [
        { name: "Certificate.pdf", url: "/docs/certificate.pdf" },
        { name: "CV.pdf", url: "/docs/cv.pdf" }
      ]
    }

    setApplication(data)

  }, [])

  const handleDecision = (type) => {
    setDecision(type)
    setShowModal(true)
  }

  const confirmDecision = () => {
  const payload = {
    decision,
    comment
  }

  console.log(payload)

  setShowModal(false)
  }

  

  if (!application) return <p>Loading...</p>

  return (

    <div className={styles.container}>

      <h1 className={styles.title}>Application Review</h1>

      {/* Personal Details */}
   <SectionCard title="Personal Details">

  <div className={styles.personalWrapper}>

    <div className={styles.detailsArea}>
      {Object.entries(application.personalDetails).map(([key,value]) => (
        <div key={key} className={styles.fieldRow}>
          <span className={styles.label}>{key}</span>
          <span className={styles.value}>{value}</span>
        </div>
      ))}
    </div>

    <div className={styles.photoBox}>
      <img
        src="/profile-placeholder.png"
        alt="Applicant Photo"
        className={styles.photo}
      />
    </div>

  </div>

</SectionCard>

      {/* Education */}
      <SectionCard title="Education / Qualifications">
        {Object.entries(application.education).map(([key,value]) => (
          <div key={key} className={styles.fieldRow}>
            <span className={styles.label}>{key}</span>
            <span className={styles.value}>{value}</span>
          </div>
        ))}
      </SectionCard>

      {/* Attachments */}
      <SectionCard title="Attachments">
        <AttachmentViewer files={application.attachments}/>
      </SectionCard>
      <SectionCard title="Officer Comment">

  <button
    className={styles.commentToggle}
    onClick={() => setShowComment(!showComment)}
  >
    Add Comment
  </button>

  {showComment && (

    <textarea
      className={styles.commentBox}
      placeholder="Write your remarks about this application..."
      value={comment}
      onChange={(e)=>setComment(e.target.value)}
    />

  )}

</SectionCard>

      {/* Action Buttons */}
      <div className={styles.actions}>

        <button
        className={styles.reject}
        onClick={()=>handleDecision("reject")}
        >
        Reject
        </button>

        <button
        className={styles.accept}
        onClick={()=>handleDecision("accept")}
        >
        Accept
        </button>

      </div>

      {showModal &&
        <DecisionModal
          decision={decision}
          onClose={()=>setShowModal(false)}
          onConfirm={confirmDecision}
        />
      }

    </div>
  )
}
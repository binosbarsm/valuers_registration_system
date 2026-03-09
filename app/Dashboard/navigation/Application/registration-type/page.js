"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./type.module.css"

export default function RegistrationType() {

  const [selectedType, setSelectedType] = useState("")
  const router = useRouter();

  const types = [
    {
      id: "frv",
      title: "Full Valuer Registration",
      description: "For professionals with full academic and practical qualifications."
    },
    {
      id: "prv",
      title: "Provisional Valuer Registration",
      description: "For applicants completing required professional experience."
    },
    {
      id: "tv",
      title: "Technician Valuer Registration",
      description: "For technical professionals assisting valuation services."
    },
    {
      id: "tempo",
      title: "Temporary Valuer Registration",
      description: "For temporary authorization to conduct valuation."
    },
     {
      id: "firm",
      title: "Firm Registration",
      description: "For Firm/Company seeking authorization to perform valuation activities."
    }
    
  ]

const handleContinue = () => {
if (!selectedType) return

// Navigate directly to the selected registration form
router.push(`/Dashboard/navigation/Application/applicant-info/forms/${selectedType}`)

}

  const handlePrev = () => {
    router.push("/Dashboard/navigation/Application/registration-type") // Back to welcome page
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select Registration Type</h1>
      <p className={styles.description}>
        Please select the type of registration you are applying for.
      </p>

      <div className={styles.cards}>
        {types.map((type) => (
          <div
            key={type.id}
            className={`${styles.card} ${selectedType === type.id ? styles.selected : ""}`}
            onClick={() => setSelectedType(type.id)}
          >
            <h3>{type.title}</h3>
            <p>{type.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.prevBtn} onClick={handlePrev}>
          Prev
        </button>
        <button
          className={styles.continueBtn}
          onClick={handleContinue}
          disabled={!selectedType}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
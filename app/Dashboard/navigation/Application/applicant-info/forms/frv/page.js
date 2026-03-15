"use client"

import react,{ useState,useContext } from "react"
import styles from "./frv.module.css"
import { useRouter } from "next/navigation"
import { stageContext } from "../../../layout"


export default function FRV() {
const {now,setNow}= useContext(stageContext);
  const [formData, setFormData] = useState({
    surname: "",
    firstName: "",
    otherNames: "",
    gender: "",
    address: "",
    telephone: "",
    fax: "",
    email: "",
    placeOfBirth: "",
    dateOfBirth: "",
    nationality: "",

    employed: true,
    notEmployedOption: "",
    employerName: "",
    employerAddress: "",
    designation: "",
    dateOfAppointment: "",
    studentInstitution: "",
    otherEngagement: "",

    examType: ""
  })
const router = useRouter();
  // -------------------------
  // EDUCATION STATE
  // -------------------------

  const [education, setEducation] = useState([
    {
      level: "",
      institution: "",
      subject: "",
      grade: "",
      startDate: "",
      endDate: ""
    }
  ])

  const handleEducationChange = (index, field, value) => {
    const updated = [...education]
    updated[index][field] = value
    setEducation(updated)
  }

  const addEducation = () => {
    setEducation([
      ...education,
      {
        level: "",
        institution: "",
        subject: "",
        grade: "",
        startDate: "",
        endDate: ""
      }
    ])
  }

  const removeEducation = (index) => {
    const updated = education.filter((_, i) => i !== index)
    setEducation(updated)
  }

  // -------------------------
  // GENERAL INPUT CHANGE
  // -------------------------

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

const handleSubmit = () => {

  const finalData = {
    ...formData,
    education
  }

  
  // store temporarily for next page
  sessionStorage.setItem("frvApplication", JSON.stringify(finalData))

  // go to upload page
  router.push("/Dashboard/navigation/Application/documents/frv")
   setNow((prev)=>prev + 1);
}

const handlePrev= ()=>{
  router.back();
  setNow((prev)=>prev - 1);
}

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>APPLICATION FOR CANDIDACY REGISTRATION</h1>

      {/* PERSONAL DETAILS */}

      <h2 className={styles.sectionTitle}>Section A: Personal Details</h2>

      <div className={styles.formGrid}>

        <div className={styles.field}>
          <label>Surname</label>
          <input name="surname" value={formData.surname} onChange={handleChange}/>
        </div>

        <div className={styles.field}>
          <label>First Name</label>
          <input name="firstName" value={formData.firstName} onChange={handleChange}/>
        </div>

        <div className={styles.field}>
          <label>Other Names</label>
          <input name="otherNames" value={formData.otherNames} onChange={handleChange}/>
        </div>

        <div className={styles.field}>
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange}/>
        </div>

        <div className={styles.field}>
          <label>Telephone</label>
          <input name="telephone" value={formData.telephone} onChange={handleChange}/>
        </div>

        <div className={styles.field}>
          <label>Date of Birth</label>
          <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange}/>
        </div>

        <div className={styles.field}>
          <label>Nationality</label>
          <input name="nationality" value={formData.nationality} onChange={handleChange}/>
        </div>

      </div>

      {/* --- Employment Details --- */}

<h2 className={styles.sectionTitle}>Employment Details</h2>

<div className={styles.radioGroup}>
  <label>
    <input
      type="radio"
      checked={formData.employed}
      onChange={() =>
        setFormData({
          ...formData,
          employed: true,
          notEmployedOption: "",
          studentInstitution: "",
          otherEngagement: ""
        })
      }
    />
    Employed
  </label>

  <label>
    <input
      type="radio"
      checked={!formData.employed}
      onChange={() =>
        setFormData({
          ...formData,
          employed: false,
          employerName: "",
          employerAddress: "",
          designation: "",
          dateOfAppointment: ""
        })
      }
    />
    Not Employed
  </label>
</div>


{formData.employed ? (

  <div className={styles.formGrid}>

    <div className={styles.field}>
      <label>Employer Name</label>
      <input
        name="employerName"
        value={formData.employerName}
        onChange={handleChange}
      />
    </div>

    <div className={styles.field}>
      <label>Employer Address</label>
      <input
        name="employerAddress"
        value={formData.employerAddress}
        onChange={handleChange}
      />
    </div>

    <div className={styles.field}>
      <label>Designation / Position</label>
      <input
        name="designation"
        value={formData.designation}
        onChange={handleChange}
      />
    </div>

    <div className={styles.field}>
      <label>Date of Appointment</label>
      <input
        type="date"
        name="dateOfAppointment"
        value={formData.dateOfAppointment}
        onChange={handleChange}
      />
    </div>

  </div>

) : (

  <div className={styles.formGrid}>

    {/* Student */}

    <div className={styles.field}>

      <label>
        <input
          type="radio"
          name="notEmployedOption"
          value="student"
          checked={formData.notEmployedOption === "student"}
          onChange={(e) =>
            setFormData({
              ...formData,
              notEmployedOption: e.target.value,
              studentInstitution: "",
              otherEngagement: ""
            })
          }
        />
        Student
      </label>

      {formData.notEmployedOption === "student" && (

        <input
          placeholder="Institution Name"
          value={formData.studentInstitution}
          onChange={(e) =>
            setFormData({
              ...formData,
              studentInstitution: e.target.value
            })
          }
        />

      )}

    </div>


    {/* Other */}

    <div className={styles.field}>

      <label>
        <input
          type="radio"
          name="notEmployedOption"
          value="other"
          checked={formData.notEmployedOption === "other"}
          onChange={(e) =>
            setFormData({
              ...formData,
              notEmployedOption: e.target.value,
              studentInstitution: "",
              otherEngagement: ""
            })
          }
        />
        Others
      </label>

      {formData.notEmployedOption === "other" && (

        <input
          placeholder="Type of Engagement"
          value={formData.otherEngagement}
          onChange={(e) =>
            setFormData({
              ...formData,
              otherEngagement: e.target.value
            })
          }
        />

      )}

    </div>

  </div>

)}

      {/* ---------------- EDUCATION SECTION ---------------- */}

      <h2 className={styles.sectionTitle}>
        Education / Professional Qualification
      </h2>

      {education.map((edu, index) => (

        <div key={index} className={styles.educationCard}>

          <div className={styles.educationHeader}>
            <h4>Qualification {index + 1}</h4>

            {index !== 0 && (
              <button
                className={styles.deleteBtn}
                onClick={() => removeEducation(index)}
              >
                Delete
              </button>
            )}
          </div>

          <div className={styles.formGridTwo}>

            <div className={styles.field}>
              <label>Education Level</label>
              <select
                value={edu.level}
                onChange={(e) =>
                  handleEducationChange(index,"level",e.target.value)
                }
              >
                <option value="">Select Level</option>
                <option value="olevel">Secondary O Level</option>
                <option value="alevel">Secondary A Level</option>
                <option value="diploma">Diploma</option>
                <option value="degree">Degree</option>
                <option value="certificate">Certificate</option>
                <option value="professional">Professional Qualification</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Institution</label>
              <input
                value={edu.institution}
                onChange={(e)=>
                  handleEducationChange(index,"institution",e.target.value)
                }
              />
            </div>

            <div className={styles.field}>
              <label>Subject / Program</label>
              <input
                value={edu.subject}
                onChange={(e)=>
                  handleEducationChange(index,"subject",e.target.value)
                }
              />
            </div>

            <div className={styles.field}>
              <label>Grade</label>
              <input
                value={edu.grade}
                onChange={(e)=>
                  handleEducationChange(index,"grade",e.target.value)
                }
              />
            </div>

            <div className={styles.field}>
              <label>Start Date</label>
              <input
                type="date"
                value={edu.startDate}
                onChange={(e)=>
                  handleEducationChange(index,"startDate",e.target.value)
                }
              />
            </div>

            <div className={styles.field}>
              <label>End Date</label>
              <input
                type="date"
                value={edu.endDate}
                onChange={(e)=>
                  handleEducationChange(index,"endDate",e.target.value)
                }
              />
            </div>

          </div>

          {index === 0 && (
            <div className={styles.addContainer}>
              <button
                className={styles.addBtn}
                onClick={addEducation}
              >
                + Add Another Qualification
              </button>
            </div>
          )}

        </div>

      ))}

      {/* EXAMINATION */}

      <h2 className={styles.sectionTitle}>Examination Type</h2>

      <div className={styles.field}>
        <label>Select the exam you want to undertake</label>
        <select name="examType" value={formData.examType} onChange={handleChange}>
          <option value="">Select Exam</option>
          <option value="technician">Technician Level</option>
          <option value="professional1">Professional Level I</option>
          <option value="professional2">Professional Level II</option>
        </select>
      </div>

      {/* BUTTONS */}

      <div className={styles.buttonGroup}>
        <button className={styles.prevBtn} onClick={handlePrev}>Prev</button>
        <button className={styles.nextBtn} onClick={handleSubmit}>Continue</button>
      </div>

    </div>
  )
}
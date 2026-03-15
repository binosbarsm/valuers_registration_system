"use client"
import react,{ useState,useContext } from "react"
import styles from "./tv.module.css"
import { useRouter } from "next/navigation"
import { stageContext } from "../../../layout"

export default function TV() {
   const {now,setNow}=useContext(stageContext);

  const router = useRouter()

  const [formData, setFormData] = useState({
    surname: "",
    firstName: "",
    otherNames: "",
    gender: "",
    nationality: "",
    dateOfBirth: "",

    poBox: "",
    phone: "",
    mobile: "",
    email: "",

    plot: "",
    block: "",
    street: "",
    district: "",
    region: "",

    professionalBodies: ""
  })

  /* ---------------- EDUCATION ---------------- */

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

  /* ---------------- EXPERIENCE ---------------- */

  const [experience, setExperience] = useState([
    {
      institution: "",
      from: "",
      to: "",
      nature: "",
      capacity: "",
      supervisor: ""
    }
  ])

  const handleExperienceChange = (index, field, value) => {
    const updated = [...experience]
    updated[index][field] = value
    setExperience(updated)
  }

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        institution: "",
        from: "",
        to: "",
        nature: "",
        capacity: "",
        supervisor: ""
      }
    ])
  }

  const removeExperience = (index) => {
    const updated = experience.filter((_, i) => i !== index)
    setExperience(updated)
  }

  /* ---------------- REFEREES ---------------- */

  const [referees, setReferees] = useState([
    { fullname: "", address: "", email: "", tel: "", regNo: "" },
    { fullname: "", address: "", email: "", tel: "", regNo: "" }
  ])

  const handleRefereeChange = (index, field, value) => {
    const updated = [...referees]
    updated[index][field] = value
    setReferees(updated)
  }

  const addReferee = () => {
    setReferees([
      ...referees,
      { fullname: "", address: "", email: "", tel: "", regNo: "" }
    ])
  }

  const removeReferee = (index) => {
    if (referees.length <= 2) return
    const updated = referees.filter((_, i) => i !== index)
    setReferees(updated)
  }

  /* ---------------- INPUT CHANGE ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = () => {
    const finalData = {
      ...formData,
      education,
      experience,
      referees
    }

    sessionStorage.setItem("frvApplication", JSON.stringify(finalData))
    router.push("/Dashboard/navigation/Application/documents/prv")
    setNow((prev)=>prev + 1);
  }


  const handlePrev= ()=>{
  router.back();
  setNow((prev)=>prev - 1);
}
  /* ================================================= */

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>APPLICATION FOR ENLISTMENT </h1>

      {/* PERSONAL DETAILS */}
      <h2 className={styles.sectionTitle}>Section A: Personal Details</h2>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label>Surname</label>
          <input name="surname" value={formData.surname} onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label>First Name</label>
          <input name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label>Other Names</label>
          <input name="otherNames" value={formData.otherNames} onChange={handleChange} />
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
          <label>Date of Birth</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label>Nationality</label>
          <input name="nationality" value={formData.nationality} onChange={handleChange} />
        </div>
      </div>

      {/* ADDRESS */}
      <h2 className={styles.sectionTitle}>Address</h2>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label>P.O. Box</label>
          <input name="poBox" value={formData.poBox} onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label>Phone</label>
          <input name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label>Mobile</label>
          <input name="mobile" value={formData.mobile} onChange={handleChange} />
        </div>
      </div>

      <h3 className={styles.subSectionTitle}>Physical Address</h3>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label>Plot / House No</label>
          <input name="plot" value={formData.plot} onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label>Block</label>
          <input name="block" value={formData.block} onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label>Location / Street</label>
          <input name="street" value={formData.street} onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label>District</label>
          <input name="district" value={formData.district} onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label>Region</label>
          <input name="region" value={formData.region} onChange={handleChange} />
        </div>
      </div>

      {/* EDUCATION */}
      <h2 className={styles.sectionTitle}>Education / Professional Qualification</h2>
      {education.map((edu, index) => (
        <div key={index} className={styles.educationCard}>
          <div className={styles.educationHeader}>
            <h4>Qualification {index + 1}</h4>
            {index !== 0 && (
              <button className={styles.deleteBtn} onClick={() => removeEducation(index)}>Delete</button>
            )}
          </div>

          <div className={styles.formGridTwo}>
            <div className={styles.field}>
              <label>Education Level</label>
              <select value={edu.level} onChange={(e) => handleEducationChange(index, "level", e.target.value)}>
                <option value="">Select Education Level</option>
                <option value="Secondary School (O-Level)">Secondary School (O-Level)</option>
                <option value="Secondary School (A-Level)">Secondary School (A-Level)</option>
                <option value="Higher Learning Institution">Higher Learning Institution</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Institution</label>
              <input value={edu.institution} onChange={(e) => handleEducationChange(index, "institution", e.target.value)} />
            </div>

            <div className={styles.field}>
              <label>Subject / Program</label>
              <input value={edu.subject} onChange={(e) => handleEducationChange(index, "subject", e.target.value)} />
            </div>

            <div className={styles.field}>
              <label>Grade</label>
              <input value={edu.grade} onChange={(e) => handleEducationChange(index, "grade", e.target.value)} />
            </div>

            <div className={styles.field}>
              <label>Start Date</label>
              <input type="date" value={edu.startDate} onChange={(e) => handleEducationChange(index, "startDate", e.target.value)} />
            </div>

            <div className={styles.field}>
              <label>End Date</label>
              <input type="date" value={edu.endDate} onChange={(e) => handleEducationChange(index, "endDate", e.target.value)} />
            </div>
          </div>

          {index === 0 && (<div  style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '8px' }}> <button className={styles.addBtn} onClick={addEducation}>+ Add Another Qualification</button></div>
          
          )}
        </div>
      ))}

      {/* PROFESSIONAL MEMBERSHIP */}
      <h2 className={styles.sectionTitle}>Membership in Professional Bodies</h2>
      <div className={styles.field}>
        <label>Professional Memberships</label>
        <textarea
          className={styles.textArea}
          name="professionalBodies"
          value={formData.professionalBodies}
          onChange={handleChange}
          placeholder="Describe your memberships in professional organisations"
        />
      </div>

      {/* EXPERIENCE */}
      <h2 className={styles.sectionTitle}>Practical Experience and Training in Valuation</h2>
      {experience.map((exp, index) => (
        <div key={index} className={styles.educationCard}>
          <div className={styles.educationHeader}>
            <h4>Experience {index + 1}</h4>
            {index !== 0 && (
              <button className={styles.deleteBtn} onClick={() => removeExperience(index)}>Delete</button>
            )}
          </div>

          <div className={styles.formGridTwo}>
            <div className={styles.field}>
              <label>Institution / Firm Name</label>
              <input value={exp.institution} onChange={(e) => handleExperienceChange(index, "institution", e.target.value)} />
            </div>

            <div className={styles.field}>
              <label>From</label>
              <input type="date" value={exp.from} onChange={(e) => handleExperienceChange(index, "from", e.target.value)} />
            </div>

            <div className={styles.field}>
              <label>To</label>
              <input type="date" value={exp.to} onChange={(e) => handleExperienceChange(index, "to", e.target.value)} />
            </div>

            <div className={styles.field}>
              <label>Nature of Valuation</label>
              <input value={exp.nature} onChange={(e) => handleExperienceChange(index, "nature", e.target.value)} />
            </div>

            <div className={styles.field}>
              <label>Capacity</label>
              <input value={exp.capacity} onChange={(e) => handleExperienceChange(index, "capacity", e.target.value)} />
            </div>

            <div className={styles.field}>
              <label>Supervisor Name</label>
              <input value={exp.supervisor} onChange={(e) => handleExperienceChange(index, "supervisor", e.target.value)} />
            </div>
          </div>

          {index === 0 && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '8px' }}>
 <button className={styles.addBtn} onClick={addExperience}>+ Add Another Experience</button>
            </div>
           
          )}
        </div>
      ))}

      {/* REFEREES */}
      <h2 className={styles.sectionTitle}>Referees</h2>
      {referees.map((ref, index) => (
        <div key={index} className={styles.educationCard}>
          <div className={styles.educationHeader}>
            <h4>Referee {index + 1}</h4>
            {referees.length > 2 && (
              <button className={styles.deleteBtn} onClick={() => removeReferee(index)}>Delete</button>
            )}
          </div>

          <div className={styles.formGridTwo}>
            <div className={styles.field}>
              <label>Full Name</label>
              <input value={ref.fullname} onChange={(e) => handleRefereeChange(index, "fullname", e.target.value)} />
            </div>

            <div className={styles.field}>
              <label>Address</label>
              <input value={ref.address} onChange={(e) => handleRefereeChange(index, "address", e.target.value)} />
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input value={ref.email} onChange={(e) => handleRefereeChange(index, "email", e.target.value)} />
            </div>

            <div className={styles.field}>
              <label>Telephone</label>
              <input value={ref.tel} onChange={(e) => handleRefereeChange(index, "tel", e.target.value)} />
            </div>

            <div className={styles.field}>
              <label>Registration No</label>
              <input value={ref.regNo} onChange={(e) => handleRefereeChange(index, "regNo", e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      <button className={styles.addBtn} onClick={addReferee}>+ Add Referee</button>

      {/* BUTTONS */}
      <div className={styles.buttonGroup}>
        <button className={styles.prevBtn} onClick={handlePrev}>Prev</button>
        <button className={styles.nextBtn} onClick={handleSubmit}>Continue</button>
      </div>

    </div>
  )
}
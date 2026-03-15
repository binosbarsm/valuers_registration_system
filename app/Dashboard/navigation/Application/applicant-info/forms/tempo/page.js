"use client"


import react,{ useState,useContext } from "react"
import styles from "./tempo.module.css"
import { useRouter } from "next/navigation"
import { stageContext } from "../../../layout"

export default function TEMPO() {
    const {now,setNow}=useContext(stageContext);

  const router = useRouter()

  const [formData, setFormData] = useState({
    surname: "", firstName: "", otherNames: "", gender: "", nationality: "",
    dateOfBirth: "", poBox: "", phone: "", mobile: "", email: "",
    plot: "", block: "", street: "", district: "", region: "",
    professionalBodies: "", yes: true, arrivaldate: "", startdate: "", enddate: "",
  })

  // ----- EDUCATION -----
  const [education, setEducation] = useState([{ level: "", institution: "", subject: "", grade: "", startDate: "", endDate: "" }])
  const handleEducationChange = (i, field, val) => { const tmp = [...education]; tmp[i][field] = val; setEducation(tmp) }
  const addEducation = () => setEducation([...education, { level:"", institution:"", subject:"", grade:"", startDate:"", endDate:"" }])
  const removeEducation = (i) => setEducation(education.filter((_, idx) => idx!==i))

  // ----- EXPERIENCE -----
  const [experience, setExperience] = useState([{ institution:"", from:"", to:"", nature:"", capacity:"", supervisor:"" }])
  const handleExperienceChange = (i, f, v) => { const tmp=[...experience]; tmp[i][f]=v; setExperience(tmp) }
  const addExperience = () => setExperience([...experience, { institution:"", from:"", to:"", nature:"", capacity:"", supervisor:"" }])
  const removeExperience = (i) => setExperience(experience.filter((_, idx)=>idx!==i))

  // ----- PREVIOUS REG -----
  const [previousReg, setPreviousReg] = useState([{ Registration_No:"", from:"", to:"", Assignment:"", Firm:"" }])
  const handlePreviousReg = (i,f,v)=>{ const tmp=[...previousReg]; tmp[i][f]=v; setPreviousReg(tmp) }
  const addPreviousReg = () => setPreviousReg([...previousReg, { Registration_No:"", from:"", to:"", Assignment:"", Firm:"" }])
  const removePreviousReg = (i) => setPreviousReg(previousReg.filter((_,idx)=>idx!==i))

  // ----- PROJECT DETAILS -----
  const [projectdetails,setProjectDetails]=useState([{ Project_Name:"", from:"", to:"", Engagement:"", Firm:"" }])
  const handleProjectChange=(i,f,v)=>{const tmp=[...projectdetails]; tmp[i][f]=v; setProjectDetails(tmp)}
  const addProjectDetails=()=>setProjectDetails([...projectdetails,{ Project_Name:"", from:"", to:"", Engagement:"", Firm:"" }])
  const removeProjectDetails=(i)=>setProjectDetails(projectdetails.filter((_,idx)=>idx!==i))

  // ----- REFEREES -----
  const [referees,setReferees]=useState([{ fullname:"", address:"", email:"", tel:"", regNo:""},{ fullname:"", address:"", email:"", tel:"", regNo:"" }])
  const handleRefereeChange=(i,f,v)=>{const tmp=[...referees]; tmp[i][f]=v; setReferees(tmp)}
  const addReferee=()=>setReferees([...referees,{ fullname:"", address:"", email:"", tel:"", regNo:"" }])
  const removeReferee=(i)=>{if(referees.length<=2)return; setReferees(referees.filter((_,idx)=>idx!==i))}

  // ----- INPUT CHANGE -----
  const handleChange=(e)=>{const {name,value}=e.target; setFormData({...formData,[name]:value})}
  const handleSubmit=()=>{ const finalData={...formData,education,experience,previousReg,projectdetails,referees}; sessionStorage.setItem("frvApplication",JSON.stringify(finalData)); router.push("/Dashboard/navigation/Application/documents/tempo");  router.back();
  setNow((prev)=>prev + 1); }
  
  const handlePrev= ()=>{
  router.back();
  setNow((prev)=>prev - 1);
}
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Application For Temporary Registration</h1>
      <p className={styles.subtitle}>Please complete all sections of this application form carefully.</p>

      {/* PERSONAL DETAILS */}
      <h2 className={styles.sectionTitle}>Section A: Personal Details</h2>
      <div className={styles.formGrid}>
        {["surname","firstName","otherNames","gender","dateOfBirth","nationality"].map((f,i)=>(
          <div key={i} className={styles.field}>
            <label>{f==="firstName"?"First Name":f==="otherNames"?"Other Names":f==="dateOfBirth"?"Date of Birth":f.charAt(0).toUpperCase()+f.slice(1)}</label>
            {f==="gender"?(
              <select name={f} value={formData[f]} onChange={handleChange}><option value="">Select Gender</option><option>Male</option><option>Female</option></select>
            ):f==="dateOfBirth"?(
              <input type="date" name={f} value={formData[f]} onChange={handleChange}/>
            ):(
              <input name={f} value={formData[f]} onChange={handleChange}/>
            )}
          </div>
        ))}
      </div>

      {/* ADDRESS */}
      <h2 className={styles.sectionTitle}>Address</h2>
      {["Personal Address","Official Address"].map((addr,i)=>(
        <div key={i}>
          <h3 className={styles.subSectionTitle}>{addr}</h3>
          <div className={styles.formGrid}>
            {["poBox","email","phone","mobile"].map((f,j)=>(
              <div key={j} className={styles.field}>
                <label>{f==="poBox"?"P.O. Box":f.charAt(0).toUpperCase()+f.slice(1)}</label>
                <input name={f} value={formData[f]} onChange={handleChange}/>
              </div>
            ))}
          </div>
        </div>
      ))}

      <h3 className={styles.subSectionTitle}>Physical Address</h3>
      <div className={styles.formGrid}>
        {["plot","block","street","district","region"].map((f,i)=>(
          <div key={i} className={styles.field}>
            <label>{f==="plot"?"Plot / House No":f.charAt(0).toUpperCase()+f.slice(1)}</label>
            <input name={f} value={formData[f]} onChange={handleChange}/>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <h2 className={styles.sectionTitle}>Education / Professional Qualification</h2>
      {education.map((edu,i)=>(
        <div key={i} className={styles.card}>
          <div className={styles.cardHeader}>
            <h4>Qualification {i+1}</h4>
            {i!==0 && <button className={styles.deleteBtn} onClick={()=>removeEducation(i)}>Delete</button>}
          </div>
          <div className={styles.formGridTwo}>
            <div className={styles.field}>
              <label>Education Level</label>
              <select value={edu.level} onChange={(e)=>handleEducationChange(i,"level",e.target.value)}>
                <option value="">Select Education Level</option>
                <option value="Secondary School (O-Level)">Secondary School (O-Level)</option>
                <option value="Secondary School (A-Level)">Secondary School (A-Level)</option>
                <option value="Higher Learning Institution">Higher Learning Institution</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={styles.field}><label>Institution</label><input value={edu.institution} onChange={(e)=>handleEducationChange(i,"institution",e.target.value)}/></div>
            <div className={styles.field}><label>Subject / Program</label><input value={edu.subject} onChange={(e)=>handleEducationChange(i,"subject",e.target.value)}/></div>
            <div className={styles.field}><label>Grade</label><input value={edu.grade} onChange={(e)=>handleEducationChange(i,"grade",e.target.value)}/></div>
            <div className={styles.field}><label>Start Date</label><input type="date" value={edu.startDate} onChange={(e)=>handleEducationChange(i,"startDate",e.target.value)}/></div>
            <div className={styles.field}><label>End Date</label><input type="date" value={edu.endDate} onChange={(e)=>handleEducationChange(i,"endDate",e.target.value)}/></div>
          </div>
          {i===0 && <button className={styles.addBtn} onClick={addEducation}>+ Add Another Qualification</button>}
        </div>
      ))}

      {/* PROFESSIONAL MEMBERSHIP */}
      <h2 className={styles.sectionTitle}>Membership in Professional Bodies</h2>
      <div className={styles.field}>
        <label>Professional Memberships</label>
        <textarea className={styles.textArea} name="professionalBodies" value={formData.professionalBodies} onChange={handleChange} placeholder="Describe your memberships in professional organisations"/>
      </div>

      {/* EXPERIENCE */}
      <h2 className={styles.sectionTitle}>Practical Experience and Training in Valuation</h2>
      {experience.map((exp,i)=>(
        <div key={i} className={styles.card}>
          <div className={styles.cardHeader}>
            <h4>Experience {i+1}</h4>
            {i!==0 && <button className={styles.deleteBtn} onClick={()=>removeExperience(i)}>Delete</button>}
          </div>
          <div className={styles.formGridTwo}>
            {["institution","from","to","nature","capacity","supervisor"].map((f,j)=>(
              <div key={j} className={styles.field}>
                <label>{f==="institution"?"Institution / Firm Name":f==="from"||f==="to"?"Date "+f.charAt(0).toUpperCase()+f.slice(1):f==="nature"?"Nature of Valuation":f==="capacity"?"Capacity":"Supervisor Name"}</label>
                <input type={f==="from"||f==="to"?"date":"text"} value={exp[f]} onChange={(e)=>handleExperienceChange(i,f,e.target.value)}/>
              </div>
            ))}
          </div>
          {i===0 && <button className={styles.addBtn} onClick={addExperience}>+ Add Another Experience</button>}
        </div>
      ))}

      {/* PREVIOUS TEMP REG */}
      <h2 className={styles.sectionTitle}> Previous Temporary Registrations of Professional Stay in Tanzania</h2>
      {previousReg.map((pre,i)=>(
        <div key={i} className={styles.card}>
          <div className={styles.cardHeader}>
            <h4>Previous Temporary Stay {i+1}</h4>
            {i!==0 && <button className={styles.deleteBtn} onClick={()=>removePreviousReg(i)}>Delete</button>}
          </div>
          <div className={styles.formGridTwo}>
            {["Registration_No","from","to","Assignment","Firm"].map((f,j)=>(
              <div key={j} className={styles.field}>
                <label>{f==="Registration_No"?"Registration Number":f==="from"||f==="to"?"Date "+f.charAt(0).toUpperCase()+f.slice(1):f==="Assignment"?"Assignment Undertaken":"Consulting Firm"}</label>
                <input type={f==="from"||f==="to"?"date":"text"} value={pre[f]} onChange={(e)=>handlePreviousReg(i,f,e.target.value)}/>
              </div>
            ))}
          </div>
          {i===0 && <button className={styles.addBtn} onClick={addPreviousReg}>+ Add another Temporary Registration</button>}
        </div>
      ))}

      {/* CURRENT DUTY STATION */}
      <h2 className={styles.sectionTitle}>Current Duty Station</h2>
      <div className={styles.radioGroup}>
        <h3>Are you currently stationed in Tanzania?</h3>
        <label><input type="radio" checked={formData.yes} onChange={()=>setFormData({...formData,yes:true,arrivaldate:"",startdate:"",enddate:""})}/> Yes</label>
        <label><input type="radio" checked={!formData.yes} onChange={()=>setFormData({...formData,yes:false,arrivaldate:"",startdate:"",enddate:""})}/> No</label>
      </div>

      <div className={styles.formGrid}>
  
        {!formData.yes && <div className={styles.field}><label>State Date of your Arrival</label><input type="date" name="arrivaldate" value={formData.arrivaldate} onChange={handleChange}/></div>}
                <h3>State the dates of intended arrival</h3>
        <div className={styles.field}><label>From</label><input type="date" name="startdate" value={formData.startdate} onChange={handleChange}/></div>
        <div className={styles.field}><label>To</label><input type="date" name="enddate" value={formData.enddate} onChange={handleChange}/></div>
      </div>

      {/* PROJECT DETAILS */}
      <h2 className={styles.sectionTitle}>Nature and Duration of the Project in which you will be Engaged</h2>
      {projectdetails.map((pro,i)=>(
        <div key={i} className={styles.card}>
          <div className={styles.cardHeader}>
            <h4>Project {i+1}</h4>
            {i!==0 && <button className={styles.deleteBtn} onClick={()=>removeProjectDetails(i)}>Delete</button>}
          </div>
          <div className={styles.formGridTwo}>
            {["Project_Name","Engagement","from","to","Firm"].map((f,j)=>(
              <div key={j} className={styles.field}>
                <label>{f==="Project_Name"?"Project Name":f==="Engagement"?"Nature of Engagement":f==="from"||f==="to"?"Date "+f.charAt(0).toUpperCase()+f.slice(1):"Consulting Firm"}</label>
                <input type={f==="from"||f==="to"?"date":"text"} value={pro[f]} onChange={(e)=>handleProjectChange(i,f,e.target.value)}/>
              </div>
            ))}
          </div>
          {i===0 && <button className={styles.addBtn} onClick={addProjectDetails}>+ Add another Project Information</button>}
        </div>
      ))}

      {/* REFEREES */}
      <h2 className={styles.sectionTitle}>Referees</h2>
      {referees.map((ref,i)=>(
        <div key={i} className={styles.card}>
          <div className={styles.cardHeader}>
            <h4>Referee {i+1}</h4>
            {referees.length>2 && <button className={styles.deleteBtn} onClick={()=>removeReferee(i)}>Delete</button>}
          </div>
          <div className={styles.formGridTwo}>
            {["fullname","address","email","tel","regNo"].map((f,j)=>(
              <div key={j} className={styles.field}>
                <label>{f==="fullname"?"Full Name":f==="tel"?"Telephone":f==="regNo"?"Registration No":f.charAt(0).toUpperCase()+f.slice(1)}</label>
                <input value={ref[f]} onChange={(e)=>handleRefereeChange(i,f,e.target.value)}/>
              </div>
            ))}
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
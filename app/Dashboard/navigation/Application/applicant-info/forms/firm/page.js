"use client"

import react,{ useState,useContext } from "react"
import { stageContext } from "../../../layout"
import { useRouter } from "next/navigation"
import styles from "./firm.module.css"

export default function FirmRegistrationForm(){
const {now,setNow}= useContext(stageContext);

const router = useRouter()

/* =========================
COMPANY PROFILE
========================= */

const [company,setCompany] = useState({
companyName:"",
headOffice:"",
telephone:"",
fax:"",
email:"",
website:"",
bankerName:"",
bankerAddress:"",
businessLocations:"",
registrationNumber:"",
registrationDate:"",
authorisedCapital:"",
paidUpCapital:"",
tin:""
})

/* =========================
DIRECTORS / PARTNERS
========================= */

const [directors,setDirectors] = useState([
{
name:"",
qualification:"",
nationality:""
}
])

/* =========================
FINANCIAL STATUS
========================= */

const [financial,setFinancial] = useState({
cashInBank:"",
stocks:""
})

/* =========================
FIXED ASSETS
========================= */

const [assets,setAssets] = useState([
{
assetName:"",
value:""
}
])

/* =========================
OFFICE FACILITIES
========================= */

const [facilities,setFacilities] = useState({
officeSize:"",
officeRooms:"",
workshopSize:"",
workshopRooms:"",
yardSize:"",
yardRooms:""
})

/* =========================
PERSONNEL
========================= */

const [personnel,setPersonnel] = useState([
{
name:"",
nationality:"",
qualification:"",
position:"",
experience:"",
employmentTerms:""
}
])

/* =========================
REFERENCES
========================= */

const [references,setReferences] = useState([
{
name:"",
registrationNo:"",
postalAddress:"",
telephone:""
}
])

/* =========================
GENERIC HANDLERS
========================= */

const handleCompanyChange = (e)=>{
setCompany({...company,[e.target.name]:e.target.value})
}

const handleFinancialChange = (e)=>{
setFinancial({...financial,[e.target.name]:e.target.value})
}

const handleFacilityChange = (e)=>{
setFacilities({...facilities,[e.target.name]:e.target.value})
}

const updateArray = (array,setArray,index,field,value)=>{
const updated = [...array]
updated[index][field] = value
setArray(updated)
}

/* =========================
ADD ROW FUNCTIONS
========================= */

const addDirector = ()=>{
setDirectors([...directors,{name:"",qualification:"",nationality:""}])
}

const addAsset = ()=>{
setAssets([...assets,{assetName:"",value:""}])
}

const addPersonnel = ()=>{
setPersonnel([...personnel,{
name:"",
nationality:"",
qualification:"",
position:"",
experience:"",
employmentTerms:""
}])
}

const addReference = ()=>{
setReferences([...references,{
name:"",
registrationNo:"",
postalAddress:"",
telephone:""
}])
}

/* =========================
SUBMIT
========================= */

const handlePrev= ()=>{
  router.back();
  setNow((prev)=>prev - 1);
}


const handleSubmit = ()=>{

const firmData = {
company,
directors,
financial,
assets,
facilities,
personnel,
references
}

sessionStorage.setItem("firmRegistration",JSON.stringify(firmData))

router.push("/Dashboard/navigation/Application/documents/firm")
setNow((prev)=>prev + 1);
}

/* =========================
UI
========================= */

return(

<div className={styles.container}>

<h1 className={styles.title}>Firm Registration</h1>
<p className={styles.subtitle}>Provide company registration information</p>


{/* ================= COMPANY PROFILE ================= */}

<h2 className={styles.sectionTitle}>Part 1: Company Profile</h2>

<div className={styles.formGrid}>

<input name="companyName" value={company.companyName} onChange={handleCompanyChange} placeholder="Company Name"/>

<input name="headOffice" value={company.headOffice} onChange={handleCompanyChange} placeholder="Head Office Address"/>

<input name="telephone" value={company.telephone} onChange={handleCompanyChange} placeholder="Telephone"/>

<input name="fax" value={company.fax} onChange={handleCompanyChange} placeholder="Fax"/>

<input name="email" value={company.email} onChange={handleCompanyChange} placeholder="Email"/>

<input name="website" value={company.website} onChange={handleCompanyChange} placeholder="Website"/>

<input name="bankerName" value={company.bankerName} onChange={handleCompanyChange} placeholder="Banker's Name"/>

<input name="bankerAddress" value={company.bankerAddress} onChange={handleCompanyChange} placeholder="Banker's Address"/>

<input name="businessLocations" value={company.businessLocations} onChange={handleCompanyChange} placeholder="Business Locations"/>

<input name="registrationNumber" value={company.registrationNumber} onChange={handleCompanyChange} placeholder="Certificate of Incorporation No."/>

<input type="date" name="registrationDate" value={company.registrationDate} onChange={handleCompanyChange}/>

<input name="authorisedCapital" value={company.authorisedCapital} onChange={handleCompanyChange} placeholder="Authorised Capital"/>

<input name="paidUpCapital" value={company.paidUpCapital} onChange={handleCompanyChange} placeholder="Paid Up Capital"/>

<input name="tin" value={company.tin} onChange={handleCompanyChange} placeholder="TIN Number"/>

</div>


{/* ================= DIRECTORS ================= */}

<h3 className={styles.subSection}>Directors / Partners</h3>

<p className={styles.subtitle}>(Including Directors/Partners, Technical and Administrative Staff) 
</p>
{directors.map((director,index)=>(
<div key={index} className={styles.card}>

<input
placeholder="Name"
value={director.name}
onChange={(e)=>updateArray(directors,setDirectors,index,"name",e.target.value)}
/>

<input
placeholder="Qualification / Experience"
value={director.qualification}
onChange={(e)=>updateArray(directors,setDirectors,index,"qualification",e.target.value)}
/>

<input
placeholder="Nationality"
value={director.nationality}
onChange={(e)=>updateArray(directors,setDirectors,index,"nationality",e.target.value)}
/>

</div>
))}

<button onClick={addDirector} className={styles.addBtn}>
+ Add Director
</button>


{/* ================= FINANCIAL ================= */}

<h2 className={styles.sectionTitle}>Part 2: Financial Status</h2>

<div className={styles.formGrid}>

<input
name="cashInBank"
value={financial.cashInBank}
onChange={handleFinancialChange}
placeholder="Cash in Bank"
/>

<input
name="stocks"
value={financial.stocks}
onChange={handleFinancialChange}
placeholder="Stocks / Securities"
/>

</div>


{/* ================= FIXED ASSETS ================= */}

<h3 className={styles.subSection}>Fixed Assets</h3>

{assets.map((asset,index)=>(
<div key={index} className={styles.card}>

<input
placeholder="Asset Name"
value={asset.assetName}
onChange={(e)=>updateArray(assets,setAssets,index,"assetName",e.target.value)}
/>

<input
placeholder="Estimated Value"
value={asset.value}
onChange={(e)=>updateArray(assets,setAssets,index,"value",e.target.value)}
/>

</div>
))}

<button onClick={addAsset} className={styles.addBtn}>
+ Add Asset
</button>


{/* ================= FACILITIES ================= */}

<h2 className={styles.sectionTitle}>Part 3: Office & Service Facilities</h2>

<div className={styles.formGrid}>

<input name="officeSize" value={facilities.officeSize} onChange={handleFacilityChange} placeholder="Office Size (m²)"/>

<input name="officeRooms" value={facilities.officeRooms} onChange={handleFacilityChange} placeholder="Office Rooms"/>

<input name="workshopSize" value={facilities.workshopSize} onChange={handleFacilityChange} placeholder="Workshop Size (m²)"/>

<input name="workshopRooms" value={facilities.workshopRooms} onChange={handleFacilityChange} placeholder="Workshop Rooms"/>

<input name="yardSize" value={facilities.yardSize} onChange={handleFacilityChange} placeholder="Yard Size (m²)"/>

<input name="yardRooms" value={facilities.yardRooms} onChange={handleFacilityChange} placeholder="Yard Rooms"/>

</div>


{/* ================= PERSONNEL ================= */}

<h2 className={styles.sectionTitle}>Part 4: Permanent Personnel</h2>

{personnel.map((person,index)=>(
<div key={index} className={styles.card}>

<input placeholder="Name"
value={person.name}
onChange={(e)=>updateArray(personnel,setPersonnel,index,"name",e.target.value)}
/>

<input placeholder="Nationality"
value={person.nationality}
onChange={(e)=>updateArray(personnel,setPersonnel,index,"nationality",e.target.value)}
/>

<input placeholder="Academic Qualification"
value={person.qualification}
onChange={(e)=>updateArray(personnel,setPersonnel,index,"qualification",e.target.value)}
/>

<input placeholder="Position"
value={person.position}
onChange={(e)=>updateArray(personnel,setPersonnel,index,"position",e.target.value)}
/>

<input placeholder="Years of Experience"
value={person.experience}
onChange={(e)=>updateArray(personnel,setPersonnel,index,"experience",e.target.value)}
/>

<input placeholder="Employment Terms"
value={person.employmentTerms}
onChange={(e)=>updateArray(personnel,setPersonnel,index,"employmentTerms",e.target.value)}
/>

</div>
))}

<button onClick={addPersonnel} className={styles.addBtn}>
+ Add Personnel
</button>


{/* ================= REFERENCES ================= */}

<h2 className={styles.sectionTitle}>Part 5: References</h2>

{references.map((ref,index)=>(
<div key={index} className={styles.card}>

<input placeholder="Name"
value={ref.name}
onChange={(e)=>updateArray(references,setReferences,index,"name",e.target.value)}
/>

<input placeholder="Registration Number"
value={ref.registrationNo}
onChange={(e)=>updateArray(references,setReferences,index,"registrationNo",e.target.value)}
/>

<input placeholder="Postal Address"
value={ref.postalAddress}
onChange={(e)=>updateArray(references,setReferences,index,"postalAddress",e.target.value)}
/>

<input placeholder="Telephone"
value={ref.telephone}
onChange={(e)=>updateArray(references,setReferences,index,"telephone",e.target.value)}
/>

</div>
))}

<button onClick={addReference} className={styles.addBtn}>
+ Add Reference
</button>


{/* ================= BUTTONS ================= */}

<div className={styles.buttonGroup}>

<button className={styles.prevBtn} onClick={handlePrev}>
Prev
</button>

<button className={styles.nextBtn} onClick={handleSubmit}>
Next
</button>

</div>

</div>

)

}
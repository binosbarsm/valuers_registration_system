"use client"

import { useRouter } from "next/navigation"
import styles from "./registration.module.css"

export default function RegistrationPage() {

const router = useRouter()

const approvedRecord = {
    name: "John Doe",
    type: "Professional Valuer",
    dateApproved: "10 Mar 2026",
    Registration_fee:"100,000",
    status: "Approved"

}

const handleControlNumber = () => {
    router.push("/Dashboard/navigation/Registration/payment")
}

return (

<div className={styles.container}>

<h2 className={styles.title}>Registration Status</h2>

<div className={styles.notification}>
Your application has been approved. Please proceed with payments to fully get your Certificate!
</div>

<table className={styles.table}>

<thead>
<tr>
<th>Name</th>
<th>Registration Type</th>
<th>Registration Fee</th>
<th>Date Approved</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>
<tr>
<td>{approvedRecord.name}</td>
<td>{approvedRecord.type}</td>
<td>{approvedRecord.Registration_fee}<span>Tsh</span></td>
<td>{approvedRecord.dateApproved}</td>
<td className={styles.approved}>{approvedRecord.status}</td>
<td>

<button
className={styles.controlBtn}
onClick={handleControlNumber}
>
Get Control Number
</button>

</td>
</tr>
</tbody>

</table>

</div>

)

}
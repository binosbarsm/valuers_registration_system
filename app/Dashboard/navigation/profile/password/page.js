"use client";

import { useState } from "react";
import styles from "./password.module.css";

export default function PasswordPage(){

const [currentPassword,setCurrentPassword] = useState("");
const [newPassword,setNewPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");

const [success,setSuccess] = useState(false);

function handleSubmit(e){

e.preventDefault();

if(newPassword !== confirmPassword){
alert("Passwords do not match");
return;
}

setSuccess(true);

setTimeout(()=>{
setSuccess(false);
},3000);

}

return(

<div className={styles.container}>

<h1 className={styles.title}>
Change Password
</h1>

<form
className={styles.form}
onSubmit={handleSubmit}
>

<div className={styles.field}>

<label>Current Password</label>

<input
type="password"
value={currentPassword}
onChange={(e)=>setCurrentPassword(e.target.value)}
required
/>

</div>

<div className={styles.field}>

<label>New Password</label>

<input
type="password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
required
/>

</div>

<div className={styles.field}>

<label>Confirm Password</label>

<input
type="password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
required
/>

</div>

<button className={styles.button}>
Save Changes
</button>

{success && (
<p className={styles.success}>
✓ Password updated successfully
</p>
)}

</form>

</div>

)

}
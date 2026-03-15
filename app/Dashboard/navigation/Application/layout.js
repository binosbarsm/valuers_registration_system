"use client"

import ProgressBar from "../components/progressbars"

import react,{ useState,createContext } from "react"

export const stageContext = createContext();

export default function ApplicationLayout({children}){
  
const [now,setNow]= useState(1);

return(
<div>
<ProgressBar currentStep={now} />
<div>
<stageContext.Provider value={{now,setNow}}>
{children}
</stageContext.Provider>
</div>

</div>

)

}
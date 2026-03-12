"use client"

import ProgressBar from "../components/progressbars"

export default function ApplicationLayout({children}){

return(

<div>
<ProgressBar/>
<div>
{children}
</div>

</div>

)

}
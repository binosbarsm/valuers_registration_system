"use client"

import react,{ useState,useContext } from "react";
import styles from "./application.module.css";
import { useRouter } from "next/navigation";
import { GiRead } from "react-icons/gi";
import { LuPanelTopClose } from "react-icons/lu";
import { stageContext } from "./layout";

export default function ApplicationWelcome() {
  
  const router = useRouter();
  const [showAttachments, setShowAttachments] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  
  const {now,setNow}= useContext(stageContext);

  function handleclick(n) {
    setNow((prev) => prev + n);
    router.push("/Dashboard/navigation/Application/registration-type")
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Valuers Registration Application
        </h1>

        <p className={styles.description}>
          This system allows qualified professionals to apply for
          registration as certified valuers. The board ensures that
          applicants possess the required academic and practical
          qualifications in order to maintain high standards in
          valuation practice.
        </p>

        {/* Requirements Section */}
        <div className={styles.requirements}>
          <h3>Required Attachments</h3>
          <ul>
            <li>1. A dully filled, signed and stamped application form.</li>
            <li>2. Certificate of incorporation or registration.</li>
            <li>3. Proof of ownership of office (i.e. rent/lease agreement endorsed by commissioner for Oath).</li>
            {showAttachments && (
              <>
                <li>4. CV’s of shareholders/partners each with certified copy.</li>
                <li>5. Certified copies of academic/professional certificate (for qualified shareholder/partners).</li>
                <li>6. Recently passport size photograph of directors.</li>
                <li>7. Certified true copies of registration cards/proof of ownership of plant and equipment. (Should bear the name of firm or shareholder).</li>
                <li>8. Dully filed & signed anti-bribery pledge.</li>
                <li>9. Referees form. (duly filled and signed).</li>
                <li>10. Company memorandum & articles of association or extract from registrar of companies.</li>
              </>
            )}
          </ul>
          <button 
            className={styles.readMoreBtn} 
            onClick={() => setShowAttachments(!showAttachments)}
          >
            {showAttachments ? <LuPanelTopClose /> :  <GiRead /> }
          </button>
        </div>

        {/* Notes Section */}
        <div className={styles.notes}>
          <h3>Notes Before Filling the Form</h3>
          <ul>
            <li>i. Should the space provided with application Form prove insufficient, additional details may be provided on a separate sheet of paper.</li>
            <li>ii. Application Form with incomplete submission shall not be processed.</li>
            <li>iii. Application forms must be submitted to the Board within thirty days from the date issued</li>
            {showNotes && (
              <>
                <li>iv. Application form shall be submitted along with a non-refundable processing fee prescribed by the Board.</li>
                <li>v. Submit passport size photographs of company execute directors endorsed on the back.</li>
                <li>vi. All key copies of supporting documents must be certified as true copies of the original.</li>
                <li>vii. Application forms must be filled in block letters or printed.</li>
                <li>viii. Referees must be a fully registered and licensed Valuer.</li>
                <li>ix. The referee must be a person who knows and can comment on the performance of the firm as per attached reference forms.</li>
                <li>x. Registration Number from relevant Professional Board must be given.</li>
                <li>xi. The signatory must be the Managing Director of the company; if not power of Attorney authorizing other person must be attached.</li>
                <li>xii. Attach copy of contract agreements of technical staff.</li>
                <li>xiii. Name as it appears in the Company’s Memorandum and Articles of Association or academic certificate or testimonials.</li>
                <li>xiv. Attach photocopy of Passport and Work Permits in case of foreign nationals.</li>
                <li>xv. Attach Certified Certificate or Testimonials and CV(s).</li>
                <li>xvi. Shareholders and Directors should be shown clearly.</li>
              </>
            )}
          </ul>
          <button 
            className={styles.readMoreBtn} 
            onClick={() => setShowNotes(!showNotes)}
          >
            {showNotes ? <LuPanelTopClose /> :<GiRead />}
          </button>
        </div>

        {/* Start Button */}
        <div className={styles.action}>
          <button className={styles.startBtn} onClick={()=>{handleclick(1)}}>
            Start Application
          </button>
        </div>
      </main>
    </div>
  );
}
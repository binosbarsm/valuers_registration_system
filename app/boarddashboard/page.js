"use client";

import styles from "./dashboard.module.css";

export default function DashboardHome() {
  return (
    <div className={styles.homepage}>
      {/* Dashboard Cards */}
      <div className={styles.cards}>

        {/* Applications Status with progress bar */}
        <div className={styles.cardItem}>
          <h3>Received Applications</h3>
          <p>100</p>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: "100%", backgroundColor: "#00aa55" }}
            />
          </div>
        </div>

        {/* Registrations Status with progress bar */}
        <div className={styles.cardItem}>
          <h3>Pending Requests</h3>
          <p>100</p>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: "100%", backgroundColor: "rgb(240,215,20)" }}
            />
          </div>
        </div>

        {/* Pending Payments */}
        <div className={styles.cardItem} style={{ borderLeftColor: "#ff901e" }}>
          <h3>Approved Applications</h3>
          <p>1</p>
        </div>

        {/* Certificates Issued */}
        <div className={styles.cardItem} style={{ borderLeftColor: "#02210f" }}>
          <h3>Total Valuers</h3>
          <p>1023</p>
        </div>

      </div>

      {/* Placeholder Panel */}
      <div className={styles.panel}>
        <h2>News</h2>
        <ul className={styles.panelContent}>
          <li>New update of applicants have been added you can view them on submission page</li>
        </ul>
      </div>
    </div>
  );
}
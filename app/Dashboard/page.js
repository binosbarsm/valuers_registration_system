"use client";

import styles from "./dashboard.module.css";

export default function DashboardHome() {
  return (
    <div className={styles.homepage}>
      {/* Dashboard Cards */}
      <div className={styles.cards}>

        {/* Applications Status with progress bar */}
        <div className={styles.cardItem}>
          <h3>Applications Status</h3>
          <p>100%</p>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: "100%", backgroundColor: "#00aa55" }}
            />
          </div>
        </div>

        {/* Registrations Status with progress bar */}
        <div className={styles.cardItem}>
          <h3>Registrations Status</h3>
          <p>100%</p>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: "100%", backgroundColor: "rgb(240,215,20)" }}
            />
          </div>
        </div>

        {/* Pending Payments */}
        <div className={styles.cardItem} style={{ borderLeftColor: "#ff901e" }}>
          <h3>Pending Payments</h3>
          <p>1</p>
        </div>

        {/* Certificates Issued */}
        <div className={styles.cardItem} style={{ borderLeftColor: "#02210f" }}>
          <h3>Certificates Issued</h3>
          <p>None</p>
        </div>

      </div>

      {/* Placeholder Panel */}
      <div className={styles.panel}>
        <h2>Announcements</h2>
        <div className={styles.panelContent}>
          <p>Here you can add company images, charts, or important notifications.</p>
        </div>
      </div>
    </div>
  );
}
"use client";

import styles from "./resetpassword.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [strength, setStrength] = useState(0);

  // Password strength calculation
  useEffect(() => {
    let score = 0;
    if (newPassword.length >= 6) score += 1;
    if (/[A-Z]/.test(newPassword)) score += 1;
    if (/[0-9]/.test(newPassword)) score += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) score += 1;
    setStrength(score);
  }, [newPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Password successfully reset!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        {/* Illustration at the top */}
        <div className={styles.illustration}>
          <Image
            src="/vrblogo.jpg" // Replace with your own illustration
            alt="Reset password illustration"
            width={120}
            height={120}
          />
        </div>

        <h2 className={styles.title}>Reset Password</h2>
        <p className={styles.subtitle}>
          Enter your new password and confirm it to secure your account.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>

          {/* New Password */}
          <div className={styles.inputWithIcon}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className={styles.inputpass}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            {showPassword ? (
              <FaEyeSlash className={styles.icon} onClick={() => setShowPassword(false)} />
            ) : (
              <FaEye className={styles.icon} onClick={() => setShowPassword(true)} />
            )}
          </div>

          {/* Password Strength Meter */}
          <div className={styles.strengthBar}>
            <div
              className={styles.strengthFill}
              style={{
                width: `${(strength / 4) * 100}%`,
                backgroundColor:
                  strength <= 1 ? "#ff4d4d" : strength === 2 ? "#ffae42" : "#00aa55",
              }}
            ></div>
          </div>

          {/* Confirm Password */}
          <div className={styles.inputWithIcon}>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className={styles.inputpass}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {showConfirm ? (
              <FaEyeSlash className={styles.icon} onClick={() => setShowConfirm(false)} />
            ) : (
              <FaEye className={styles.icon} onClick={() => setShowConfirm(true)} />
            )}
          </div>

          <button className={styles.button} type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
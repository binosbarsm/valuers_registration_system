"use client";

import styles from "./register.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  // Password strength calculation
  useEffect(() => {
    let score = 0;
    if(password.length >= 6) score += 1;
    if(/[A-Z]/.test(password)) score += 1;
    if(/[0-9]/.test(password)) score += 1;
    if(/[^A-Za-z0-9]/.test(password)) score += 1;
    setStrength(score);
  }, [password]);

  const getStrengthColor = () => {
    switch(strength){
      case 1: return "#ff4d4f"; // Red
      case 2: return "#ff9800"; // Orange
      case 3: return "#cddc39"; // Yellow-Green
      case 4: return "#00aa55"; // Green
      default: return "#ddd";    // Gray
    }
  }

  return (
    <div className={styles.container}>

      {/* LEFT PANEL */}
      <div className={styles.leftPanel}>
        <Image src="/vrblogo.jpg" width={120} height={120} alt="Company Logo" />
        <h1>Join Our Professional Network</h1>
        <p>
          Become part of a trusted network of professional valuers,
          committed to competence, integrity, and excellence in every valuation nationwide.
        </p>
        <p className={styles.tagline}>
          Ensuring high-quality valuations through certified expertise and ethical practice.
        </p>
        <div className={styles.decor}></div>
      </div>

      {/* RIGHT PANEL */}
      <div className={styles.rightPanel}>
        <div className={styles.card}>
          <h2 className={styles.title}>Register</h2>

          <form className={styles.form}>

            <input type="text" placeholder="First Name" className={styles.input} />
            <input type="text" placeholder="Surname" className={styles.input} />
            <input type="email" placeholder="Email Address" className={styles.input} />
            <input type="tel" placeholder="Phone Number" className={styles.input} />

            {/* Password */}
            <div className={styles.passwordField}>
              <div className={styles.inputWithIcon}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={styles.inputpass}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? 
                  <FaEyeSlash className={styles.icon} onClick={togglePassword} /> : 
                  <FaEye className={styles.icon} onClick={togglePassword} />
                }
              </div>

              <div className={styles.strengthContainer}>
                <div className={styles.strengthBar}>
                  <div
                    className={styles.strengthFill}
                    style={{
                      width: `${(strength/4)*100}%`,
                      backgroundColor: getStrengthColor()
                    }}
                  ></div>
                </div>
                <p className={styles.strengthText}>
                  {strength === 0 && ""}
                  {strength === 1 && "Weak"}
                  {strength === 2 && "Fair"}
                  {strength === 3 && "Good"}
                  {strength === 4 && "Strong"}
                </p>
              </div>
            </div>

            {/* Confirm Password */}
            <div className={styles.passwordField}>
              <div className={styles.inputWithIcon}>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  className={styles.inputpass}
                />
                {showConfirm ? 
                  <FaEyeSlash className={styles.icon} onClick={toggleConfirm} /> : 
                  <FaEye className={styles.icon} onClick={toggleConfirm} />
                }
              </div>
            </div>

            <button className={styles.button}>Create Account</button>
          </form>

          <p className={styles.loginText}>
            Already have an account?
            <span> Login</span>
          </p>
        </div>
      </div>

    </div>
  );
}
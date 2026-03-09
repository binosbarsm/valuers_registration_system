"use client";

import styles from "./forgotpassword.module.css";
import Image from "next/image";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        {/* Fancier Illustration */}
        <div className={styles.illustration}>
          <Image 
            src="/fishing.svg" 
            alt="Thinking person illustration" 
            width={120} 
            height={120} 
          />
        </div>

        <h2 className={styles.title}>Forgot Password?</h2>
        <p className={styles.subtitle}>
          Enter your email below and we'll send a secure link to reset your password.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email Address" 
            className={styles.input} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>Send Reset Link</button>
        </form>

        <p className={styles.loginText}>
          Remembered your password? <span>Login</span>
        </p>

      </div>
    </div>
  );
}
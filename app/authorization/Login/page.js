"use client";

import styles from "./Login.module.css";
import Image from "next/image";
import { useState } from "react";
 import { useRouter } from "next/navigation"
export default function LoginPage() {

  const [clicked, setClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  function handleClick() {
     router.push("/Dashboard"); ;
  }

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return (

    <div className={styles.container}>

      {/* Animated Background Shapes */}
      <div className={styles.shapes}>
        <span className={`${styles.shape} ${styles.shape1}`}></span>
        <span className={`${styles.shape} ${styles.shape2}`}></span>
        <span className={`${styles.shape} ${styles.shape3}`}></span>
        <span className={`${styles.shape} ${styles.shape4}`}></span>
      </div>


      {/* Login Card */}
      <div className={styles.card}>

        <div className={styles.logoArea}>
          <Image
            src="/vrblogo.jpg"
            width={110}
            height={110}
            alt="Company Logo"
          />
        </div>

        <h2 className={styles.title}>Welcome Back</h2>

        <p className={styles.subtitle}>
          Login to your account
        </p>


        <form className={styles.form}>

          {/* Gmail */}
          <input
            type="email"
            placeholder="Email Address"
            className={styles.input}
          />


          {/* Password with Toggle */}

          <div className={styles.passwordWrapper}>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={styles.input}
            />

            <span
              className={styles.eye}
              onClick={togglePassword}
            >
              {showPassword ? "🙈" : "👁"}
            </span>

          </div>


          <button
            className={`${styles.button} ${clicked ? styles.clicked : ""}`}
            onClick={handleClick}
          >
            Log In
          </button>

        </form>


        <div className={styles.signup}>
          <p>
            Don't have an account?
            <span className={styles.link}>
              Create Account
            </span>
          </p>
        </div>

      </div>

    </div>

  );
}
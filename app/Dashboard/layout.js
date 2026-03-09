"use client";

import styles from "./dashboard.module.css";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { 
  FaHome, FaFileAlt, FaUserPlus, FaUser,
  FaChevronDown, FaChevronUp, FaBell, FaUserCircle,
  FaKey, FaChartBar
} from "react-icons/fa";

export default function DashboardLayout({ children }) {

  const pathname = usePathname();

  const [openProfile, setOpenProfile] = useState(
    pathname.startsWith("/Dashboard/navigation/profile")
  );

  const getPageTitle = () => {

  if (pathname === "/Dashboard") return "Dashboard";

  if (pathname.includes("/Application")) return "Application";

  if (pathname.includes("/Registration")) return "Registration";

  if (pathname.includes("/profile/account")) return "Account";

  if (pathname.includes("/profile/password")) return "Password";

  if (pathname.includes("/profile/reports")) return "Reports";

  return "Dashboard";
};

  return (
    <div className={styles.container}>

      {/* SIDEBAR */}
      <nav className={styles.sidebar}>

        {/* Logo */}
        <div className={styles.logoArea}>
          <Image src="/vrblogo.png" width={100} height={100} alt="Company Logo" />
          <h3>Valuers Registration Portal</h3>
        </div>

        {/* Navigation */}
        <ul className={styles.navLinks}>

          {/* HOME */}
          <li className={`${styles.navItem} ${pathname === "/Dashboard" ? styles.active : ""}`}>
            <Link href="/Dashboard" className={styles.navItemContent}>
              <FaHome className={styles.icon}/>
              <span>Home</span>
            </Link>
          </li>

          {/* APPLICATION */}
          <li className={`${styles.navItem} ${pathname.startsWith("/Dashboard/navigation/Application") ? styles.active : ""}`}>
            <Link href="/Dashboard/navigation/Application" className={styles.navItemContent}>
              <FaFileAlt className={styles.icon}/>
              <span>Application</span>
            </Link>
          </li>

          {/* REGISTRATION */}
          <li className={`${styles.navItem} ${pathname.startsWith("/Dashboard/navigation/Registration") ? styles.active : ""}`}>
            <Link href="/Dashboard/navigation/Registration" className={styles.navItemContent}>
              <FaUserPlus className={styles.icon}/>
              <span>Registration</span>
            </Link>
          </li>

          {/* PROFILE COLLAPSIBLE */}
          <li className={styles.navItem}>

            <div
              className={styles.profileHeader}
              onClick={() => setOpenProfile(!openProfile)}
            >
              <FaUser className={styles.icon}/>
              <span>Profile</span>
              <span className={styles.arrow}>
                {openProfile ? <FaChevronUp/> : <FaChevronDown/>}
              </span>
            </div>

            <ul className={`${styles.subMenu} ${openProfile ? styles.open : ""}`}>

              <li className={pathname === "/Dashboard/navigation/profile/account" ? styles.active : ""}>
                <Link href="/Dashboard/navigation/profile/account" className={styles.subItem}>
                  <FaUserCircle className={styles.subIcon}/> Account
                </Link>
              </li>

              <li className={pathname === "/Dashboard/navigation/profile/password" ? styles.active : ""}>
                <Link href="/Dashboard/navigation/profile/password" className={styles.subItem}>
                  <FaKey className={styles.subIcon}/> Password
                </Link>
              </li>

              <li className={pathname === "/Dashboard/navigation/profile/reports" ? styles.active : ""}>
                <Link href="/Dashboard/navigation/profile/reports" className={styles.subItem}>
                  <FaChartBar className={styles.subIcon}/> Reports
                </Link>
              </li>

            </ul>

          </li>

        </ul>

      </nav>

      {/* MAIN AREA */}
      <div className={styles.mainArea}>

        {/* TOP BAR */}
        <header className={styles.topBar}>
        <h1 className={styles.pageTitle}>{getPageTitle()}</h1>

          <div className={styles.topActions}>
            <div className={styles.userReg}>
              <span className={styles.regtitle}>REG NO:</span>{" "}
              <strong>VRB-2025-0142</strong>
            </div>

            <FaBell className={styles.topIcon}/>
            <FaUserCircle className={styles.topIcon}/>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className={styles.content}>
          {children}
        </div>

      </div>

    </div>
  );
}
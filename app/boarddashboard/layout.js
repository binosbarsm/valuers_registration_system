"use client";

import styles from "./dashboard.module.css";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoMdSettings } from "react-icons/io";
import { RiPassValidFill } from "react-icons/ri";

import { 
  FaHome, FaFileAlt, FaUserPlus, FaUser,
  FaChevronDown, FaChevronUp, FaBell, FaUserCircle,
  FaKey, FaChartBar,FaSignOutAlt
} from "react-icons/fa";

export default function DashboardLayout({ children }) {

  const pathname = usePathname();

  const [openProfile, setOpenProfile] = useState(
    pathname.startsWith("/boarddashboard/navigation/settings")
  );
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
  function handleClickOutside(event) {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenUserMenu(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  const getPageTitle = () => {

  if (pathname === "//boarddashboard") return "Dashboard";

  if (pathname.includes("/submission")) return "Submissions";

  if (pathname.includes("/approved")) return "Approved";

  if (pathname.includes("/settings/profile")) return "Profile";

  if (pathname.includes("/settings/password")) return "Password";

  if (pathname.includes("/settings/report")) return "Reports";

  return "Dashboard";
};

  return (
    <div className={styles.container}>

      {/* SIDEBAR */}
      <nav className={styles.sidebar}>

        {/* Logo */}
        <div className={styles.logoArea}>
          <Image src="/vrblogo.png" width={100} height={100} alt="Company Logo" />
          <h3>Board Portal</h3>
        </div>

        {/* Navigation */}
        <ul className={styles.navLinks}>

          {/* HOME */}
          <li className={`${styles.navItem} ${pathname === "/boarddashboard" ? styles.active : ""}`}>
            <Link href="/boarddashboard" className={styles.navItemContent}>
              <FaHome className={styles.icon}/>
              <span>Home</span>
            </Link>
          </li>

          {/* Submissions */}
          <li className={`${styles.navItem} ${pathname.startsWith("/boarddashboard/navigation/submission") ? styles.active : ""}`}>
            <Link href="/boarddashboard/navigation/submission" className={styles.navItemContent}>
              <FaFileAlt className={styles.icon}/>
              <span>Submissions</span>
            </Link>
          </li>

          {/* Approved */}
          <li className={`${styles.navItem} ${pathname.startsWith("/boarddashboard/navigation/approved") ? styles.active : ""}`}>
            <Link href="/boarddashboard/navigation/approved" className={styles.navItemContent}>
              <RiPassValidFill className={styles.icon}/>
              <span>Approved</span>
            </Link>
          </li>

          {/* PROFILE COLLAPSIBLE */}
          <li className={styles.navItem}>

            <div
              className={styles.profileHeader}
              onClick={() => setOpenProfile(!openProfile)}
            >
              {/* settings */}
              <IoMdSettings className={styles.icon}/>
              <span>Settings</span>
              <span className={styles.arrow}>
                {openProfile ? <FaChevronUp/> : <FaChevronDown/>}
              </span>
            </div>

            <ul className={`${styles.subMenu} ${openProfile ? styles.open : ""}`}>

              <li className={pathname === "/boarddashboard/navigation/settings/profile" ? styles.active : ""}>
                <Link href="/boarddashboard/navigation/settings/profile" className={styles.subItem}>
                  <FaUserCircle className={styles.subIcon}/> Profile
                </Link>
              </li>

              <li className={pathname === "/boarddashboard/navigation/settings/password" ? styles.active : ""}>
                <Link href="/boarddashboard/navigation/settings/password" className={styles.subItem}>
                  <FaKey className={styles.subIcon}/> Password
                </Link>
              </li>

            </ul>

          </li>
          {/* Reports */}
          <li className={`${styles.navItem} ${pathname.startsWith("/boarddashboard/navigation/reports") ? styles.active : ""}`}>
            <Link href="/boarddashboard/navigation/reports" className={styles.navItemContent}>
              <FaChartBar className={styles.icon}/>
              <span>Reports</span>
            </Link>
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
              <strong>Registrar</strong>
            </div>

            <FaBell className={styles.topIcon}/>
           <div className={styles.userMenuWrapper} ref={menuRef}>

  <FaUserCircle
    className={styles.topIcon}
    onClick={() => setOpenUserMenu(!openUserMenu)}
  />

  {openUserMenu && (

    <div className={styles.userMenu}>

      <div className={styles.userInfo}>
        <FaUserCircle className={styles.menuUserIcon}/>
        <span className={styles.userEmail}>registrar@email.com</span>
      </div>

      <button className={styles.signOutBtn}>
        <FaSignOutAlt/>
        <span>Sign Out</span>
      </button>

    </div>

  )}

</div>
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
"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./approved.module.css";
import { FaEye, FaCommentDots } from "react-icons/fa";
import { BiSolidSortAlt } from "react-icons/bi";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { PiCheckFatFill } from "react-icons/pi";
import { FaFilePdf } from "react-icons/fa";


export default function ApprovedApplications() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [commentText, setCommentText] = useState("");

  const router = useRouter();
  const tableRef = useRef(null);
  const itemsPerPage = 6;

  const applications = [
    { id: "REG-001", surname: "Do", firstName: "John", registrationType: "PRV", phone: "0712345678", email: "john@mail.com", status: "notPaid", date: "2026-03-01" },
    { id: "REG-002", surname: "Smith", firstName: "Jane", registrationType: "FRV", phone: "0723456789", email: "jane@mail.com", status: "paid", date: "2026-03-02" },
    { id: "REG-003", surname: "Hassan", firstName: "Ali", registrationType: "TV", phone: "0734567890", email: "ali@mail.com", status: "notPaid", date: "2026-03-03" },
    { id: "REG-004", surname: "Paul", firstName: "Mary", registrationType: "Firm", phone: "0745678901", email: "mary@mail.com", status: "paid", date: "2026-03-04" }
  ];

  // Sorting
  const handleSort = (field) => {
    if (sortField === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortOrder("asc"); }
  };

  const getArrow = (field) => (sortField !== field ? <BiSolidSortAlt /> : sortOrder === "asc" ? <TiArrowSortedUp /> : <TiArrowSortedDown />);

  // Filtering
  let filteredData = applications.filter(app => {
    const searchMatch =
      app.firstName.toLowerCase().includes(search.toLowerCase()) ||
      app.surname.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = category === "All" || app.registrationType === category;
    const dateMatch = (!startDate || app.date >= startDate) && (!endDate || app.date <= endDate);
    return searchMatch && categoryMatch && dateMatch;
  });

  // Sorting logic
  if (sortField) filteredData.sort((a, b) => {
    const valA = a[sortField]; const valB = b[sortField];
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Column resizing
  useEffect(() => {
    if (!tableRef.current || typeof window === "undefined") return;

    const ths = tableRef.current.querySelectorAll("th");
    ths.forEach(th => {
      const resizer = document.createElement("div");
      resizer.classList.add(styles.resizer);
      th.appendChild(resizer);

      let startX, startWidth;

      const mouseMove = (e) => {
        const newWidth = startWidth + (e.pageX - startX);
        th.style.width = `${newWidth}px`;
      };

      const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
      };

      resizer.addEventListener("mousedown", (e) => {
        startX = e.pageX;
        startWidth = th.offsetWidth;
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
      });
    });
  }, []);

  const openApplication = (id) => {
    router.push(`/boarddashboard/navigation/approved/${id}`);
  };

  const openCommentModal = (e, app) => {
    e.stopPropagation();
    setSelectedApp(app);
    setShowCommentModal(true);
  };

  const openConfirmModal = (e, app) => {
    e.stopPropagation();
    setSelectedApp(app);
    setShowConfirmModal(true);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Approved Applications</p>

      <div className={styles.controls}>
        <input type="text" placeholder="Search applicant..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Types</option>
          <option value="FRV">FRV</option>
          <option value="PRV">PRV</option>
          <option value="TV">TV</option>
          <option value="TEMPO">TEMPO</option>
          <option value="Firm">Firm</option>
        </select>

        <div className={styles.dateGroup}>
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>

        <div className={styles.dateGroup}>
          <label>End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        {/* PDF/Excel button */}
  <button
    className={styles.exportBtn}
    onClick={() => {
      // Here you can call your backend API to fetch Excel or PDF
      console.log("Exporting filtered data to PDF/Excel...");
      // Example: fetch('/api/export?startDate=...&endDate=...').then(...)
    }}
  >
    <FaFilePdf style={{ marginRight: "5px" }} />
    Export
  </button>
      </div>

      <div className={styles.tableWrapper} style={{overflowX:"auto"}}>
        <table ref={tableRef} className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>Registration No {getArrow("id")}</th>
              <th onClick={() => handleSort("firstName")}>First Name {getArrow("firstName")}</th>
              <th onClick={() => handleSort("surname")}>Surname {getArrow("surname")}</th>
              <th onClick={() => handleSort("email")}>Email {getArrow("email")}</th>
              <th onClick={() => handleSort("phone")}>Phone {getArrow("phone")}</th>
              <th onClick={() => handleSort("registrationType")}>Reg Type {getArrow("registrationType")}</th>
              <th onClick={() => handleSort("status")}>Status {getArrow("status")}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(app => (
              <tr key={app.id} onClick={() => openApplication(app.id)} style={{ cursor: "pointer" }}>
                <td data-label="Registration No">{app.id}</td>
                <td data-label="First Name">{app.firstName}</td>
                <td data-label="Surname">{app.surname}</td>
                <td data-label="Email">{app.email}</td>
                <td data-label="Phone">{app.phone}</td>
                <td data-label="Reg Type">{app.registrationType}</td>
                <td data-label="Status"><span className={`${styles.status} ${styles[app.status]}`}>{app.status}</span></td>
                <td data-label="Actions" className={styles.actions}>
                  <button className={styles.comment} onClick={(e) => openCommentModal(e, app)}><FaCommentDots className={styles.commenticon}/></button>
                  <button className={styles.confirm} onClick={(e) => openConfirmModal(e, app)}><PiCheckFatFill className={styles.confirmicon}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>

      {/* Comment Modal */}
      {showCommentModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Add Comment</h3>
            <textarea placeholder="Write your comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} />
            <div className={styles.modalActions}>
              <button className={styles.cancel} onClick={() => setShowCommentModal(false)}>Cancel</button>
              <button className={styles.send} onClick={() => { console.log("Comment:", commentText, selectedApp); setShowCommentModal(false); setCommentText(""); }}>Send</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Confirm Payment</h3>
            <p>Are you sure you want to confirm <strong>{selectedApp?.id}</strong>?</p>
            <div className={styles.modalActions}>
              <button className={styles.cancel} onClick={() => setShowConfirmModal(false)}>Cancel</button>
              <button className={styles.approveConfirm} onClick={() => { console.log("Confirmed:", selectedApp); setShowConfirmModal(false); }}>Confirm</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
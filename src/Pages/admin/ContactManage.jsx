import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Search,
  Trash2,
  Eye,
  RefreshCw,
  User,
  MessageSquare,
  Clock,
} from "lucide-react";
import AdminLoader from '../../Components/AdminLoader';
import AdminPagination from '../../Components/AdminPagination';

function ContactManage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchContactData = async () => {
    try {
      const res = await axiosInstance.get("/api/contact");
      if (res.data.success) {
        setContacts(res.data.data.contacts || []);
      }
    } catch (error) {
      console.error("Failed to fetch contacts");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const deleteContact = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosInstance.delete(`/api/contact/${id}`);
      if (res.data.success) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
        if (selectedContact?._id === id) setSelectedContact(null);
        Swal.fire({
          title: "Deleted!",
          text: "Contact deleted successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch {
      Swal.fire("Error", "Failed to delete contact", "error");
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  // ===== STATS (RESTORED) =====
const stats = {
  total: contacts.length,

  today: contacts.filter((c) => {
    const d = new Date(c.createdAt);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length,

  thisWeek: contacts.filter((c) => {
    const d = new Date(c.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return d >= weekAgo;
  }).length,

  thisMonth: contacts.filter((c) => {
    const d = new Date(c.createdAt);
    const now = new Date();
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  }).length,
};


  const filteredContacts = contacts.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContacts = filteredContacts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  if (loading) {
    return <AdminLoader message="Loading contact messages..." />;
  }

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Contact Management</h1>
          <p className="dashboard-subtitle">
            Manage all contact form submissions
          </p>
        </div>
        <button
          className="btn-secondary"
          onClick={() => {
            setIsRefreshing(true);
            fetchContactData();
          }}
          disabled={isRefreshing}
        >
          <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />&nbsp;&nbsp;
          Refresh
        </button>
      </div>

      {/* ===== STATS GRID (RESTORED) ===== */}
<div className="stats-grid-compact">
  <div className="stat-card-compact stat-blue">
    <div className="stat-icon-compact">
      <Mail size={16} />
    </div>
    <div className="stat-content-compact">
      <h3 className="stat-value-compact">{stats.total}</h3>
      <p className="stat-title-compact">Total Contacts</p>
    </div>
  </div>

  <div className="stat-card-compact stat-green">
    <div className="stat-icon-compact">
      <Calendar size={16} />
    </div>
    <div className="stat-content-compact">
      <h3 className="stat-value-compact">{stats.today}</h3>
      <p className="stat-title-compact">Today</p>
    </div>
  </div>

  <div className="stat-card-compact stat-purple">
    <div className="stat-icon-compact">
      <Clock size={16} />
    </div>
    <div className="stat-content-compact">
      <h3 className="stat-value-compact">{stats.thisWeek}</h3>
      <p className="stat-title-compact">This Week</p>
    </div>
  </div>

  <div className="stat-card-compact stat-orange">
    <div className="stat-icon-compact">
      <MessageSquare size={16} />
    </div>
    <div className="stat-content-compact">
      <h3 className="stat-value-compact">{stats.thisMonth}</h3>
      <p className="stat-title-compact">This Month</p>
    </div>
  </div>
</div>


      {/* SEARCH BAR (FIXED LIKE IMAGE 2) */}
      <div className="admin-search-wrapper">
        {/* <Search className="admin-search-icon" /> */}
        <input
          type="text"
          placeholder="Search contacts by name, email, subject, phone or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-search-input rounded -lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Contact</th>
              <th>Subject</th>
              <th>Phone</th>
              <th>City</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentContacts.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: 40 }}>
                  No contacts found
                </td>
              </tr>
            ) : (
              currentContacts.map((contact) => (
                <tr key={contact._id}>
                  <td>
                    <div className="table-user">
                      <div className="avatar">
                        {getInitials(contact.name)}
                      </div>
                      <div>
                        <div className="name">{contact.name}</div>
                        <div className="email">{contact.email}</div>
                      </div>
                    </div>
                  </td>

                  <td>{contact.subject || "No subject"}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.city || "—"}</td>
                  <td className="date">{formatDate(contact.createdAt)}</td>

                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => setSelectedContact(contact)}
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="danger"
                        onClick={() => deleteContact(contact._id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredContacts.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      {/* MODAL (UNCHANGED LOGIC) */}
      {selectedContact && (
        <div
          className="modal-overlay-blog"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="modal-content-blog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-blog">
              <h2>Contact Details</h2>
              <button onClick={() => setSelectedContact(null)}>×</button>
            </div>

            <div className="modal-form-blog">
              <p>
                <b>Name:</b> {selectedContact.name}
              </p>
              <p>
                <b>Email:</b> {selectedContact.email}
              </p>
              <p>
                <b>Phone:</b> {selectedContact.phone}
              </p>
              <p>
                <b>Message:</b> {selectedContact.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactManage;

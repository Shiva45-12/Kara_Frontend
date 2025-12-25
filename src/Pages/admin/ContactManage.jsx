import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";
function ContactManage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - in real app, this would come from your API
  const fetchcontectdata = async () => {
    try {
      const res = await axiosInstance.get(`/api/contact`);
      if (res.data.success) {
        setContacts(res.data.data.contacts);
      }
    } catch (error) {
    } finally {
      setLoading(false);
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
      confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosInstance.delete(`/api/contact/${id}`);
      if (res.data.success) {
        setContacts((contacts || []).filter((contact) => contact._id !== id));
        if (selectedContact?._id === id) setSelectedContact(null);

        Swal.fire({
          title: "Deleted!",
          text: "Contact has been deleted successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete contact. Please try again.",
        icon: "error",
        confirmButtonColor: "#3085d6"
      });
    }
  };


  useEffect(() => {
    // Simulate API call
    fetchcontectdata();
  }, []);

  // Calculate stats
  const totalContacts = contacts?.length || 0;
  const newMessages = (contacts || []).filter((c) => c.status === "new").length;
  const readMessages = (contacts || []).filter((c) => c.status === "read").length;
  const todayContacts = (contacts || []).filter((c) => {
    const contactDate = new Date(c.date);
    const today = new Date();
    return contactDate.toDateString() === today.toDateString();
  }).length;

  // Filter contacts based on search and status
  const filteredContacts = (contacts || []).filter((contact) => {
    const matchesSearch =
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || contact.status === statusFilter;

    return matchesSearch && matchesStatus;
  });



  const markAsRead = (id) => {
    setContacts(
      (contacts || []).map((contact) =>
        contact.id === id ? { ...contact, status: "read" } : contact
      )
    );
    if (selectedContact && selectedContact.id === id) {
      setSelectedContact({ ...selectedContact, status: "read" });
    }
  };

  const markAllAsRead = () => {
    setContacts((contacts || []).map((contact) => ({ ...contact, status: "read" })));
    if (selectedContact) {
      setSelectedContact({ ...selectedContact, status: "read" });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="dashboard-title text-2xl sm:text-3xl">
            Contact Submissions
          </h1>
          <p className="dashboard-subtitle text-sm sm:text-base">Manage all contact form submissions</p>
        </div>
        {(contacts || []).some((c) => c.status === "new") && (
          <button
            onClick={markAllAsRead}
            className="bg-gradient-to-r from-[#0e6842] to-[#90d856] hover:opacity-90 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg text-sm sm:text-base w-full sm:w-auto"
          >
            Mark All Read
          </button>
        )}
      </div>

      {/* Stats Cards - Compact Style */}
      <div className="stats-grid-compact">
        <div className="stat-card-compact stat-blue">
          <div className="stat-icon-compact">
            <span className="text-2xl">📧</span>
          </div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{totalContacts}</h3>
            <p className="stat-title-compact">Total Contacts</p>
            <span className="stat-trend-compact">All time</span>
          </div>
        </div>

        <div className="stat-card-compact stat-red">
          <div className="stat-icon-compact">
            <span className="text-2xl">🔔</span>
          </div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{newMessages}</h3>
            <p className="stat-title-compact">New Messages</p>
            <span className="stat-trend-compact">Unread</span>
          </div>
        </div>

        <div className="stat-card-compact stat-green">
          <div className="stat-icon-compact">
            <span className="text-2xl">✅</span>
          </div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{readMessages}</h3>
            <p className="stat-title-compact">Read Messages</p>
            <span className="stat-trend-compact">Completed</span>
          </div>
        </div>

        <div className="stat-card-compact stat-purple">
          <div className="stat-icon-compact">
            <span className="text-2xl">📅</span>
          </div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{todayContacts}</h3>
            <p className="stat-title-compact">Today's Contacts</p>
            <span className="stat-trend-compact">Last 24h</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      {/* <div className="flex flex-col sm:flex-row gap-3 mb-6 mt-6 items-stretch sm:items-center">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full  px-4 rounded py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
        />
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Contact List */}
        {/* <div className="bg-white rounded dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-lg sm:text-xl">📋</span>
                <span className="text-sm sm:text-base">Contact List</span>
                {filteredContacts.length > 0 && (
                  <span className="text-xs sm:text-sm font-normal text-gray-600 dark:text-gray-400">({filteredContacts.length})</span>
                )}
              </h2>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[500px] sm:max-h-[600px]">
            {filteredContacts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📭</div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">No contacts found</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your filters"
                    : "No contact submissions yet"}
                </p>
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <div
                  key={contact._id}
                  className={`border-b border-gray-100 dark:border-gray-700 p-3 sm:p-4 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700 ${selectedContact?._id === contact._id
                      ? "bg-green-50 dark:bg-green-900/20 border-l-4 border-l-green-500"
                      : ""
                    } ${contact.status === "new" ? "bg-red-50 dark:bg-red-900/20" : ""}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#0e6842] to-[#90d856] rounded-full flex items-center justify-center text-white font-semibold shadow-md text-xs sm:text-sm">
                        {getInitials(contact.name)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1 sm:mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate text-sm sm:text-base">
                            {contact.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {formatDate(contact.date)}
                          </p>
                        </div>
                        {contact.status === "new" && (
                          <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 ml-2 flex-shrink-0">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1 sm:mr-1.5 animate-pulse"></span>
                            New
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 mb-1 sm:mb-2 truncate">
                        📌 {contact.subject}
                      </p>

                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                        {contact.message}
                      </p>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-blue-600 dark:text-blue-400 truncate bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                          <span className="text-sm">📧</span>
                          <span className="truncate">{contact.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div> */}

        {/* Contact Detail */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {selectedContact ? (
            <>
              <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    📄 Contact Details
                  </h2>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto max-h-[600px]">
                {/* Header */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0e6842] to-[#90d856] rounded-full flex items-center justify-center text-white font-semibold text-xl shadow-lg">
                    {getInitials(selectedContact.name)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedContact.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${selectedContact.status === "new"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                          }`}
                      >
                        {selectedContact.status === "new" ? "🔴 New Message" : "✅ Read"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(selectedContact.date)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <label className="text-xs font-medium text-blue-600 uppercase tracking-wide flex items-center gap-1">
                      <span>📧</span> Email
                    </label>
                    <p className="text-gray-900 mt-1 font-medium">
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {selectedContact.email}
                      </a>
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <label className="text-xs font-medium text-green-600 uppercase tracking-wide flex items-center gap-1">
                      <span>📱</span> Phone
                    </label>
                    <p className="text-gray-900 mt-1 font-medium">
                      <a
                        href={`tel:${selectedContact.phone}`}
                        className="text-green-600 hover:text-green-800 hover:underline"
                      >
                        {selectedContact.phone}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Subject */}
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <label className="text-xs font-medium text-purple-600 uppercase tracking-wide flex items-center gap-1">
                    <span>📌</span> Subject
                  </label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {selectedContact.subject}
                  </p>
                </div>

                {/* Message */}
                {/* <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide flex items-center gap-1 mb-3">
                    <span>💬</span> Message
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                    {selectedContact.message}
                  </p>
                </div> */}

                {/* Actions */}
                {/* <div className="flex  gap-3 pt-4 border-t border-gray-200">
                  {selectedContact.status === "new" && (
                    <button
                      onClick={() => markAsRead(selectedContact.id)}
                      className="flex-1 bg-gradient-to-r from-[#0e6842] to-[#90d856] hover:opacity-90 text-white py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Mark as Read</span>
                    </button>
                  )}
                  <button
                    onClick={() => deleteContact(selectedContact._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Delete</span>
                  </button>
                </div> */}
              </div>
            </>
          ) 
          : 
          (
            <div className=" text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl">👈</span>
              </div>
              <h3 className=" text-black text-lg font-semibold text-gray-900 mb-2">
                Select a Contact
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                Choose a contact from the list to view detailed information
              </p>
            </div>
          )
          }
        </div>
      </div>
    </div>
  );
}

export default ContactManage;

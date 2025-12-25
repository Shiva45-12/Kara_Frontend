import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Briefcase,
  FileText,
  X,
  Save,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import axios from "../../../axiosInstance";
import { toast } from "react-toastify";

function CareerManage() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("applications");
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  // Job form state
  const [jobForm, setJobForm] = useState({
    title: "",
    department: "",
    type: "Full-time",
    location: "",
    experience: "",
    salary: "",
    description: "",
    requirements: [""],
    status: "active",
    color: "from-blue-500 to-blue-600",
  });

  // Color options for jobs
  const colorOptions = [
    { value: "from-blue-500 to-blue-600", label: "Blue", bg: "bg-blue-500" },
    {
      value: "from-green-500 to-green-600",
      label: "Green",
      bg: "bg-green-500",
    },
    {
      value: "from-purple-500 to-purple-600",
      label: "Purple",
      bg: "bg-purple-500",
    },
    {
      value: "from-orange-500 to-orange-600",
      label: "Orange",
      bg: "bg-orange-500",
    },
    { value: "from-red-500 to-red-600", label: "Red", bg: "bg-red-500" },
    { value: "from-pink-500 to-pink-600", label: "Pink", bg: "bg-pink-500" },
  ];

  const fetctJobs = async () => {
    try {
      const res = await axios.get(`jobs`);
      if (res.data.success) {
        setJobs(res.data.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const fetctApplication = async () => {
    try {
      const res = await axios.get(`applications`);
      if (res.data.success) {
        setApplications(res.data.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Mock data - in real app, this would come from your API
  useEffect(() => {
    fetctJobs();
    fetctApplication();
  }, []);

  // Get unique positions for filter
  const positions = [...new Set(applications.map((app) => app.position))];

  // Filter applications based on search and filters
  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || application.status === statusFilter;
    const matchesJob =
      jobFilter === "all" || application.position === jobFilter;

    return matchesSearch && matchesStatus && matchesJob;
  });

  // Filter jobs based on status
  const filteredJobs = jobs.filter(
    (job) => job.status === "active" || job.status === "draft"
  );

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortConfig.key === "title") {
      return sortConfig.direction === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    if (sortConfig.key === "applications") {
      return sortConfig.direction === "asc"
        ? a.applications - b.applications
        : b.applications - a.applications;
    }
    if (sortConfig.key === "date") {
      return sortConfig.direction === "asc"
        ? new Date(a.posted) - new Date(b.posted)
        : new Date(b.posted) - new Date(a.posted);
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const deleteApplication = (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      setApplications(applications.filter((app) => app.id !== id));
      if (selectedApplication && selectedApplication.id === id) {
        setSelectedApplication(null);
      }
    }
  };

  const deleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        const res = await axios.delete(`/jobs/${id}`);
        if (res.data.success) {
          toast.success(res.data.message);
          // Remove job from local state
          setJobs(jobs.filter((job) => job._id !== id));
          if (selectedJob && selectedJob._id === id) {
            setSelectedJob(null);
          }
          // Refresh jobs list
          fetctJobs();
        }
      } catch (error) {
        console.error('Delete job error:', error);
        toast.error(error.response?.data?.message || 'Failed to delete job');
      }
    }
  };

  const updateStatus = (id, newStatus) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
    if (selectedApplication && selectedApplication.id === id) {
      setSelectedApplication({ ...selectedApplication, status: newStatus });
    }
  };

  const updateJobStatus = async (id, newStatus) => {
    try {
      const res = await axios.patch(`/jobs/${id}/status`, { status: newStatus });
      if (res.data.success) {
        toast.success(res.data.message);
        // Update local state
        setJobs(
          jobs.map((job) => (job._id === id ? { ...job, status: newStatus } : job))
        );
        if (selectedJob && selectedJob._id === id) {
          setSelectedJob({ ...selectedJob, status: newStatus });
        }
        // Refresh jobs list
        fetctJobs();
      }
    } catch (error) {
      console.error('Update job status error:', error);
      toast.error(error.response?.data?.message || 'Failed to update job status');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const getStatusColor = (status) => {
    const colors = {
      new: "bg-blue-100 text-blue-800",
      reviewed: "bg-yellow-100 text-yellow-800",
      interview: "bg-purple-100 text-purple-800",
      rejected: "bg-red-100 text-red-800",
      hired: "bg-green-100 text-green-800",
      active: "bg-green-100 text-green-800",
      draft: "bg-gray-100 text-gray-800",
      closed: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    const icons = {
      new: "🆕",
      reviewed: "📋",
      interview: "🎯",
      rejected: "❌",
      hired: "✅",
      active: "✅",
      draft: "📝",
      closed: "🔒",
    };
    return icons[status] || "📄";
  };

  // Job form handlers
  const handleJobFormChange = (e) => {
    const { name, value } = e.target;
    setJobForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...jobForm.requirements];
    newRequirements[index] = value;
    setJobForm((prev) => ({ ...prev, requirements: newRequirements }));
  };

  const addRequirement = () => {
    setJobForm((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  };

  const removeRequirement = (index) => {
    if (jobForm.requirements.length > 1) {
      const newRequirements = jobForm.requirements.filter(
        (_, i) => i !== index
      );
      setJobForm((prev) => ({ ...prev, requirements: newRequirements }));
    }
  };

  const resetJobForm = () => {
    setJobForm({
      title: "",
      department: "",
      type: "Full-time",
      location: "",
      experience: "",
      salary: "",
      description: "",
      requirements: [""],
      status: "active",
      color: "from-blue-500 to-blue-600",
    });
    setEditingJob(null);
  };

  const handleCreateJob = () => {
    resetJobForm();
    setShowJobModal(true);
  };

  const handleEditJob = (job) => {
    setJobForm({
      title: job.title,
      department: job.department,
      type: job.type,
      location: job.location,
      experience: job.experience,
      salary: job.salary,
      description: job.description,
      requirements: job.requirements,
      status: job.status,
      color: job.color,
    });
    setEditingJob(job);
    setShowJobModal(true);
  };

  const handleSaveJob = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (editingJob) {
        // Update existing job
        res = await axios.put(`/jobs/${editingJob._id}`, jobForm);
      } else {
        // Create new job
        res = await axios.post(`/jobs`, jobForm);
      }
      
      if (res.data.success) {
        toast.success(res.data.message);
        setShowJobModal(false);
        resetJobForm();
        // Refresh jobs list
        fetctJobs();
      }
    } catch (error) {
      console.error('Save job error:', error);
      toast.error(error.response?.data?.message || 'Failed to save job');
    }
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
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Career Management</h1>
          <p className="dashboard-subtitle">
            Manage job postings and applications
          </p>
        </div>
        <button className="btn-primary" onClick={handleCreateJob}>
          <Plus size={16} />
          <span>Create Job</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid-compact">
        <div className="stat-card-compact stat-blue">
          <div className="stat-icon-compact"><Briefcase size={16} /></div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{jobs.filter((j) => j.status === "active").length}</h3>
            <p className="stat-title-compact">Active Jobs</p>
            <span className="stat-trend-compact">Currently hiring</span>
          </div>
        </div>
        <div className="stat-card-compact stat-green">
          <div className="stat-icon-compact"><Users size={16} /></div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{applications.length}</h3>
            <p className="stat-title-compact">Applications</p>
            <span className="stat-trend-compact">Total received</span>
          </div>
        </div>
        <div className="stat-card-compact stat-orange">
          <div className="stat-icon-compact"><FileText size={16} /></div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{applications.filter((a) => a.status === "new").length}</h3>
            <p className="stat-title-compact">New</p>
            <span className="stat-trend-compact">Pending review</span>
          </div>
        </div>
        <div className="stat-card-compact stat-purple">
          <div className="stat-icon-compact"><Calendar size={16} /></div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{jobs.filter((j) => j.status === "draft").length}</h3>
            <p className="stat-title-compact">Drafts</p>
            <span className="stat-trend-compact">Not published</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="section-title" style={{ marginTop: '32px', marginBottom: '16px' }}>Manage Content</div>
      <div className="flex space-x-1 bg-white rounded-lg p-1 border border-gray-200 w-fit">
        {[
          {
            id: "applications",
            label: "Applications",
            count: applications.length,
          },
          { id: "jobs", label: "Job Posts", count: jobs.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#0e6842] to-[#90d856] text-white shadow-lg"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label} {tab.count > 0 && `(${tab.count})`}
          </button>
        ))}
      </div>

      {/* Filters - Only show for applications tab */}
      {activeTab === "applications" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginTop: '20px' }}>
          <div>
            <input
              type="text"
              placeholder="Search by name, email, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>

          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Positions</option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Applications Tab */}
      {activeTab === "applications" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applications List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Applications{" "}
                {filteredApplications.length > 0 &&
                  `(${filteredApplications.length})`}
              </h2>
            </div>

            <div className="overflow-y-auto max-h-[600px]">
              {filteredApplications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📋</div>
                  <p className="text-gray-500 text-lg">No applications found</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {searchTerm || statusFilter !== "all" || jobFilter !== "all"
                      ? "Try adjusting your filters"
                      : "No job applications yet"}
                  </p>
                </div>
              ) : (
                filteredApplications.map((application) => (
                  <div
                    key={application.id}
                    className={`border-b border-gray-100 p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedApplication?.id === application.id
                        ? "bg-blue-50 border-l-4 border-l-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedApplication(application)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {getInitials(application.name)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {application.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                application.status
                              )}`}
                            >
                              {getStatusIcon(application.status)}{" "}
                              {application.status}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(application.date)}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {application.position}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span>📧 {application.email}</span>
                          <span>💼 {application.experience}</span>
                          <span>💰 {application.expectedSalary}</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                          {application.skills
                            .slice(0, 3)
                            .map((skill, index) => (
                              <span
                                key={index}
                                className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          {application.skills.length > 3 && (
                            <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              +{application.skills.length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500 truncate">
                            📄 {application.resume}
                          </p>

                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteApplication(application.id);
                              }}
                              className="text-xs bg-red-100 text-red-800 hover:bg-red-200 px-2 py-1 rounded transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Application Detail */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {selectedApplication ? (
              <>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                      Application Details
                    </h2>
                    <button
                      onClick={() => setSelectedApplication(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto max-h-[600px]">
                  {/* Application details content remains the same as before */}
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-2xl">
                      {getInitials(selectedApplication.name)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {selectedApplication.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            selectedApplication.status
                          )}`}
                        >
                          {getStatusIcon(selectedApplication.status)}{" "}
                          {selectedApplication.status.charAt(0).toUpperCase() +
                            selectedApplication.status.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          Applied: {formatDate(selectedApplication.date)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rest of application details... */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Email
                        </label>
                        <p className="text-gray-900">
                          <a
                            href={`mailto:${selectedApplication.email}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {selectedApplication.email}
                          </a>
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Phone
                        </label>
                        <p className="text-gray-900">
                          <a
                            href={`tel:${selectedApplication.phone}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {selectedApplication.phone}
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Position Applied
                        </label>
                        <p className="text-lg font-semibold text-gray-900">
                          {selectedApplication.position}
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Experience
                        </label>
                        <p className="text-gray-900">
                          {selectedApplication.experience}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status Actions */}
                  <div className="border-t border-gray-200 pt-6">
                    <label className="text-sm font-medium text-gray-500 mb-3 block">
                      Update Application Status
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {[
                        "new",
                        "reviewed",
                        "interview",
                        "rejected",
                        "hired",
                      ].map((status) => (
                        <button
                          key={status}
                          onClick={() =>
                            updateStatus(selectedApplication.id, status)
                          }
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedApplication.status === status
                              ? "bg-gradient-to-r from-[#880481] via-[#30085b] to-[#ad6bac] text-white shadow-lg"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-300 text-8xl mb-4">👆</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select an Application
                </h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Choose a job application from the list to view detailed
                  candidate information and manage the application.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

   {/* Jobs Tab */}
{activeTab === "jobs" && (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Job Postings
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
              Active: {jobs.filter((j) => j.status === "active").length}
            </span>
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
              Draft: {jobs.filter((j) => j.status === "draft").length}
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Jobs Table - Fixed with proper scrolling */}
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer whitespace-nowrap"
              onClick={() => handleSort("title")}
            >
              <div className="flex items-center space-x-1">
                <span>Job Title</span>
                {sortConfig.key === "title" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  ))}
              </div>
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Department
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Location
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Type
            </th>
            <th
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer whitespace-nowrap"
              onClick={() => handleSort("applications")}
            >
              <div className="flex items-center space-x-1">
                <span>Applications</span>
                {sortConfig.key === "applications" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  ))}
              </div>
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Status
            </th>
            <th
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer whitespace-nowrap"
              onClick={() => handleSort("date")}
            >
              <div className="flex items-center space-x-1">
                <span>Posted</span>
                {sortConfig.key === "date" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  ))}
              </div>
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedJobs.map((job) => (
            <tr
              key={job._id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      colorOptions.find((c) => c.value === job.color)?.bg
                    }`}
                  ></div>
                  <div className="min-w-0">
                    <div className="font-medium text-gray-900 truncate max-w-[150px]">
                      {job.title}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-[150px]">
                      {job.experience}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 max-w-[120px] truncate">
                {job.department}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 max-w-[120px] truncate">
                {job.location}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {job.type}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Users className="w-3 h-3 mr-1" />
                  {job.applications}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    job.status
                  )}`}
                >
                  {getStatusIcon(job.status)}{" "}
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(job.createdAt || job.posted)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditJob(job)}
                    className="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded hover:bg-blue-50"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      updateJobStatus(
                        job._id,
                        job.status === "active" ? "draft" : "active"
                      )
                    }
                    className="text-green-600 hover:text-green-900 transition-colors p-1 rounded hover:bg-green-50"
                    title={job.status === "active" ? "Mark as Draft" : "Mark as Active"}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteJob(job._id)}
                    className="text-red-600 hover:text-red-900 transition-colors p-1 rounded hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {sortedJobs.length === 0 && (
        <div className="text-center py-12 w-full">
          <div className="text-gray-400 text-6xl mb-4">💼</div>
          <p className="text-gray-500 text-lg">No job postings yet</p>
          <p className="text-gray-400 text-sm mt-1">
            Create your first job posting to get started
          </p>
          <button
            onClick={handleCreateJob}
            className="mt-4 bg-gradient-to-r from-[#880481] via-[#30085b] to-[#ad6bac] hover:from-[#9a0591] hover:via-[#3a096b] hover:to-[#bd7bbc] text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg"
          >
            Create Job
          </button>
        </div>
      )}
    </div>
  </div>
)}
      {/* Create/Edit Job Modal */}
      <AnimatePresence>
        {showJobModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingJob ? "Edit Job Posting" : "Create New Job"}
                </h2>
                <button
                  onClick={() => {
                    setShowJobModal(false);
                    resetJobForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveJob} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Job Title */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={jobForm.title}
                      onChange={handleJobFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., Structural Engineer"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department *
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={jobForm.department}
                      onChange={handleJobFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., Structural Works"
                    />
                  </div>

                  {/* Job Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Type *
                    </label>
                    <select
                      name="type"
                      value={jobForm.type}
                      onChange={handleJobFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={jobForm.location}
                      onChange={handleJobFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., Ahmedabad, Gujarat"
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience *
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={jobForm.experience}
                      onChange={handleJobFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., 3-5 years"
                    />
                  </div>

                  {/* Salary */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary *
                    </label>
                    <input
                      type="text"
                      name="salary"
                      value={jobForm.salary}
                      onChange={handleJobFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., Competitive"
                    />
                  </div>

                  {/* Color */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Color
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() =>
                            setJobForm((prev) => ({
                              ...prev,
                              color: color.value,
                            }))
                          }
                          className={`p-3 rounded-lg border-2 transition-all ${
                            jobForm.color === color.value
                              ? "border-blue-500 ring-2 ring-blue-200"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div
                            className={`w-full h-8 rounded ${color.bg}`}
                          ></div>
                          <span className="text-xs mt-1 text-gray-600">
                            {color.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description *
                    </label>
                    <textarea
                      name="description"
                      value={jobForm.description}
                      onChange={handleJobFormChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Describe the job role and responsibilities..."
                    />
                  </div>

                  {/* Requirements */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requirements *
                    </label>
                    <div className="space-y-2">
                      {jobForm.requirements.map((requirement, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="text"
                            value={requirement}
                            onChange={(e) =>
                              handleRequirementChange(index, e.target.value)
                            }
                            required
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder={`Requirement ${index + 1}`}
                          />
                          {jobForm.requirements.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeRequirement(index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addRequirement}
                      className="mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Requirement</span>
                    </button>
                  </div>

                  {/* Status */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="flex space-x-4">
                      {["active", "draft"].map((status) => (
                        <label
                          key={status}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            name="status"
                            value={status}
                            checked={jobForm.status === status}
                            onChange={handleJobFormChange}
                            className="text-orange-500 focus:ring-orange-500"
                          />
                          <span className="text-sm text-gray-700 capitalize">
                            {status}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowJobModal(false);
                      resetJobForm();
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-[#880481] via-[#30085b] to-[#ad6bac] hover:from-[#9a0591] hover:via-[#3a096b] hover:to-[#bd7bbc] text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <Save className="w-5 h-5" />
                    <span>{editingJob ? "Update Job" : "Create Job"}</span>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CareerManage;

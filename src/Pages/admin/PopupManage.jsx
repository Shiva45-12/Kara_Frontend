import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import Swal from 'sweetalert2';
import { Eye, Mail, Phone, MapPin, Target, Calendar, Search, Trash2, RefreshCw, User, Globe } from 'lucide-react';
import AdminLoader from '../../Components/AdminLoader';
// import AdminPagination from '../../Components/AdminPagination';

const PopupManage = () => {
  const [popupSubmissions, setPopupSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchPopupSubmissions = async () => {
    try {
      const res = await axiosInstance.get('/api/popup');
      if (res.data.success) {
        console.log('Popup submissions data:', res.data.data);
        setPopupSubmissions(res.data.data);
      }
    } catch (error) {
      console.error('Failed to load popup submissions');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const deletePopupSubmission = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosInstance.delete(`/api/popup/${id}`);
      if (res.data.success) {
        setPopupSubmissions(popupSubmissions.filter(submission => submission._id !== id));
        if (selectedSubmission?._id === id) setSelectedSubmission(null);

        Swal.fire({
          title: 'Deleted!',
          text: 'Popup submission has been deleted successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete popup submission. Please try again.',
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchPopupSubmissions();
  };

  useEffect(() => {
    fetchPopupSubmissions();
  }, []);

  const filteredSubmissions = popupSubmissions.filter(submission => {
    const matchesSearch = 
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.interest.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubmissions = filteredSubmissions.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate stats
  const stats = {
    total: popupSubmissions.length,
    interests: [...new Set(popupSubmissions.map(sub => sub.interest))].length,
    cities: [...new Set(popupSubmissions.map(sub => sub.city))].length,
    today: popupSubmissions.filter(sub => {
      const today = new Date();
      const subDate = new Date(sub.createdAt);
      return subDate.toDateString() === today.toDateString();
    }).length
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const getInterestColor = (interest) => {
    const colors = {
      'Solar Installation': 'px-3 py-1 rounded-full text-sm font-medium bg-yellow-200 text-yellow-900 border border-yellow-300 dark:bg-yellow-800 dark:text-yellow-100 dark:border-yellow-600',
      'AMC Services': 'px-3 py-1 rounded-full text-sm font-medium bg-green-200 text-green-900 border border-green-300 dark:bg-green-800 dark:text-green-100 dark:border-green-600',
      'Partnership': 'px-3 py-1 rounded-full text-sm font-medium bg-blue-200 text-blue-900 border border-blue-300 dark:bg-blue-800 dark:text-blue-100 dark:border-blue-600',
      'Consultation': 'px-3 py-1 rounded-full text-sm font-medium bg-purple-200 text-purple-900 border border-purple-300 dark:bg-purple-800 dark:text-purple-100 dark:border-purple-600',
      'Other': 'px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600'
    };
    return colors[interest] || 'px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600';
  };

  if (loading) {
    return <AdminLoader message="Loading popup submissions..." />;
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Popup Management</h1>
          <p className="dashboard-subtitle">Manage popup form submissions and inquiries</p>
        </div>
        <button 
          className={`btn-secondary ${isRefreshing ? 'opacity-75' : ''}`}
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />&nbsp;&nbsp;
          <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid-compact">
        <div className="stat-card-compact stat-blue">
          <div className="stat-icon-compact">
            <Eye size={16} />
          </div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{stats.total}</h3>
            <p className="stat-title-compact">Total Submissions</p>
            <span className="stat-trend-compact">All inquiries</span>
          </div>
        </div>

        <div className="stat-card-compact stat-green">
          <div className="stat-icon-compact">
            <Target size={16} />
          </div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{stats.interests}</h3>
            <p className="stat-title-compact">Interest Types</p>
            <span className="stat-trend-compact">Service categories</span>
          </div>
        </div>

        <div className="stat-card-compact stat-purple">
          <div className="stat-icon-compact">
            <MapPin size={16} />
          </div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{stats.cities}</h3>
            <p className="stat-title-compact">Cities</p>
            <span className="stat-trend-compact">Service areas</span>
          </div>
        </div>

        <div className="stat-card-compact stat-orange">
          <div className="stat-icon-compact">
            <Calendar size={16} />
          </div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{stats.today}</h3>
            <p className="stat-title-compact">Today</p>
            <span className="stat-trend-compact">New submissions</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="section-title">Popup Submissions ({filteredSubmissions.length})</div>
      
     <div className="admin-search-wrapper">
  {/* <Search className="admin-search-icon" /> */}
  <input
    type="text"
    placeholder="Search by name, email, city or interest..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="admin-search-input rounded l-full pl-10 pr-4 py-2 px-2 border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
  />
</div>


      {/* Popup Submissions Table */}
      <div className="table-wrapper">
  <table className="admin-table">
    <thead>
      <tr>
        <th>Contact</th>
        <th>Phone</th>
        <th>City</th>
        <th>Interest</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {currentSubmissions.length === 0 ? (
        <tr>
          <td colSpan="6" style={{ textAlign: "center", padding: 40 }}>
            No popup submissions found
          </td>
        </tr>
      ) : (
        currentSubmissions.map((submission) => (
          <tr key={submission._id}>
            <td>
              <div className="table-user">
                <div className="avatar">
                  {getInitials(submission.name)}
                </div>
                <div>
                  <div className="name">{submission.name}</div>
                  <div className="email">{submission.email}</div>
                </div>
              </div>
            </td>

            <td>{submission.phone}</td>
            <td>{submission.city}</td>

            <td>
              <span className={getInterestColor(submission.interest)}>
                {submission.interest}
              </span>
            </td>

            <td className="date">
              {formatDate(submission.createdAt)}
            </td>

            <td>
              <div className="action-buttons">
                <button
                  onClick={() => setSelectedSubmission(submission)}
                  title="View"
                >
                  <Eye size={16} />
                </button>
                <button
                  className="danger"
                  onClick={() => deletePopupSubmission(submission._id)}
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
        totalItems={filteredSubmissions.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="modal-overlay-blog" onClick={() => setSelectedSubmission(null)}>
          <div className="modal-content-blog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-blog">
              <div className="modal-header-left">
                <div className="modal-icon-blog">
                  <Globe size={24} />
                </div>
                <div>
                  <h2 className="modal-title-blog">Popup Submission Details</h2>
                  <p className="modal-subtitle-blog">View popup inquiry information</p>
                </div>
              </div>
              <button 
                className="modal-close-blog" 
                onClick={() => setSelectedSubmission(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-form-blog">
              {/* Contact Info */}
              <div className="form-row-blog">
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <User size={16} />
                    <span>Name</span>
                  </label>
                  <div className="form-input-blog bg-gray-50">{selectedSubmission.name}</div>
                </div>
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <Mail size={16} />
                    <span>Email</span>
                  </label>
                  <div className="form-input-blog bg-gray-50">
                    <a href={`mailto:${selectedSubmission.email}`} className="text-blue-600 hover:text-blue-800">
                      {selectedSubmission.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="form-row-blog">
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <Phone size={16} />
                    <span>Phone</span>
                  </label>
                  <div className="form-input-blog bg-gray-50">
                    <a href={`tel:${selectedSubmission.phone}`} className="text-blue-600 hover:text-blue-800">
                      {selectedSubmission.phone}
                    </a>
                  </div>
                </div>
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <MapPin size={16} />
                    <span>City</span>
                  </label>
                  <div className="form-input-blog bg-gray-50">{selectedSubmission.city}</div>
                </div>
              </div>

              <div className="form-row-blog">
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <Target size={16} />
                    <span>Interest</span>
                  </label>
                  <div className="form-input-blog bg-gray-50 dark:bg-gray-700 dark:text-white">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getInterestColor(selectedSubmission.interest)}`}>
                      {selectedSubmission.interest}
                    </span>
                  </div>
                </div>
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <Calendar size={16} />
                    <span>Submission Date</span>
                  </label>
                  <div className="form-input-blog bg-gray-50">{formatDate(selectedSubmission.createdAt)}</div>
                </div>
              </div>

              <div className="modal-actions-blog">
                <button 
                  type="button" 
                  className="btn-cancel-blog"
                  onClick={() => setSelectedSubmission(null)}
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn-submit-blog"
                  onClick={() => deletePopupSubmission(selectedSubmission._id)}
                >
                  <Trash2 size={18} />
                  Delete Submission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupManage;
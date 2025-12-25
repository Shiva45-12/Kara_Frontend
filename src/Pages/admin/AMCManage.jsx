import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import Swal from 'sweetalert2';
import { Settings, Mail, Phone, MapPin, Zap, Calendar, Search, Trash2, Eye, RefreshCw, User, Clock } from 'lucide-react';
import AdminLoader from '../../Components/AdminLoader';
import AdminPagination from '../../Components/AdminPagination';

const AMCManage = () => {
  const [amcRequests, setAmcRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchAMCRequests = async () => {
    try {
      const res = await axiosInstance.get('/api/amc');
      if (res.data.success) {
        setAmcRequests(res.data.data);
      }
    } catch (error) {
      console.error('Failed to load AMC requests');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const deleteAMCRequest = async (id) => {
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
      const res = await axiosInstance.delete(`/api/amc/${id}`);
      if (res.data.success) {
        setAmcRequests(amcRequests.filter(request => request._id !== id));
        if (selectedRequest?._id === id) setSelectedRequest(null);

        Swal.fire({
          title: 'Deleted!',
          text: 'AMC request has been deleted successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete AMC request. Please try again.',
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchAMCRequests();
  };

  useEffect(() => {
    fetchAMCRequests();
  }, []);

  const filteredRequests = amcRequests.filter(request => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate stats
  const stats = {
    total: amcRequests.length,
    totalLoad: amcRequests.reduce((sum, req) => sum + req.load, 0),
    locations: [...new Set(amcRequests.map(req => req.location))].length,
    today: amcRequests.filter(req => {
      const today = new Date();
      const reqDate = new Date(req.createdAt);
      return reqDate.toDateString() === today.toDateString();
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

  if (loading) {
    return <AdminLoader message="Loading AMC requests..." />;
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">AMC Management</h1>
          <p className="dashboard-subtitle">Manage Annual Maintenance Contract requests</p>
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
            <Settings size={16} />
          </div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{stats.total}</h3>
            <p className="stat-title-compact">Total Requests</p>
            <span className="stat-trend-compact">All time</span>
          </div>
        </div>

        <div className="stat-card-compact stat-green">
          <div className="stat-icon-compact">
            <Zap size={16} />
          </div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{stats.totalLoad} kW</h3>
            <p className="stat-title-compact">Total Load</p>
            <span className="stat-trend-compact">System capacity</span>
          </div>
        </div>

        <div className="stat-card-compact stat-purple">
          <div className="stat-icon-compact">
            <MapPin size={16} />
          </div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{stats.locations}</h3>
            <p className="stat-title-compact">Locations</p>
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
            <span className="stat-trend-compact">New requests</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="section-title">AMC Requests ({filteredRequests.length})</div>

      <div className="admin-search-wrapper">
  {/* <Search className="admin-search-icon" /> */}
  <input
    type="text"
    placeholder="Search by name, email or location..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="admin-search-input rounded l-full pl-10 pr-4 py-2 px-2 border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
  />
</div>



      {/* AMC Requests Table */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Mobile</th>
              <th>Load</th>
              <th>Location</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentRequests.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8">
                  <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No AMC requests found</p>
                </td>
              </tr>
            ) : (
              currentRequests.map((request) => (
              <tr key={request._id}>
                <td>
                  <div className="table-user">
                    <div className="avatar">
                      {getInitials(request.name)}
                    </div>
                    <div>
                      <p className="name">{request.name}</p>
                      <p className="email">{request.email}</p>
                    </div>
                  </div>
                </td>

                <td>{request.mobile}</td>

                <td>
                  <span className="badge-load">{request.load} kW</span>
                </td>

                <td>{request.location}</td>

                <td className="date">
                  {formatDate(request.createdAt)}
                </td>

                <td>
                  <div className="action-buttons">
                    <button onClick={() => setSelectedRequest(request)} title="View">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => deleteAMCRequest(request._id)} title="Delete" className="danger">
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
        totalItems={filteredRequests.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />


      {/* Request Detail Modal */}
      {selectedRequest && (
        <div className="modal-overlay-blog" onClick={() => setSelectedRequest(null)}>
          <div className="modal-content-blog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-blog">
              <div className="modal-header-left">
                <div className="modal-icon-blog">
                  <Settings size={24} />
                </div>
                <div>
                  <h2 className="modal-title-blog">AMC Request Details</h2>
                  <p className="modal-subtitle-blog">View maintenance contract request information</p>
                </div>
              </div>
              <button
                className="modal-close-blog"
                onClick={() => setSelectedRequest(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-form-blog">
              {/* Customer Info */}
              <div className="form-row-blog">
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <User size={16} />
                    <span>Name</span>
                  </label>
                  <div className="form-input-blog bg-gray-50">{selectedRequest.name}</div>
                </div>
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <Mail size={16} />
                    <span>Email</span>
                  </label>
                  <div className="form-input-blog bg-gray-50">
                    <a href={`mailto:${selectedRequest.email}`} className="text-blue-600 hover:text-blue-800">
                      {selectedRequest.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="form-row-blog">
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <Phone size={16} />
                    <span>Mobile</span>
                  </label>
                  <div className="form-input-blog bg-gray-50">
                    <a href={`tel:${selectedRequest.mobile}`} className="text-blue-600 hover:text-blue-800">
                      {selectedRequest.mobile}
                    </a>
                  </div>
                </div>
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <MapPin size={16} />
                    <span>Location</span>
                  </label>
                  <div className="form-input-blog bg-gray-50">{selectedRequest.location}</div>
                </div>
              </div>

              <div className="form-row-blog">
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <Zap size={16} />
                    <span>System Load</span>
                  </label>
                  <div className="form-input-blog bg-gray-50">{selectedRequest.load} kW</div>
                </div>
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <Calendar size={16} />
                    <span>Request Date</span>
                  </label>
                  <div className="form-input-blog bg-gray-50">{formatDate(selectedRequest.createdAt)}</div>
                </div>
              </div>

              <div className="modal-actions-blog">
                <button
                  type="button"
                  className="btn-cancel-blog"
                  onClick={() => setSelectedRequest(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn-submit-blog"
                  onClick={() => deleteAMCRequest(selectedRequest._id)}
                >
                  <Trash2 size={18} />
                  Delete Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AMCManage;
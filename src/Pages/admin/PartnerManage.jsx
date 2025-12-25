import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import Swal from 'sweetalert2';
import { Users, Mail, Phone, MapPin, Building2, Briefcase, Calendar, Search, Trash2, Eye, RefreshCw, User, Target } from 'lucide-react';
import AdminLoader from '../../components/AdminLoader';
import AdminPagination from '../../components/AdminPagination';

const PartnerManage = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchPartners = async () => {
    try {
      const res = await axiosInstance.get('/api/partners');
      if (res.data.success) {
        setPartners(res.data.data);
      }
    } catch (error) {
      console.error('Failed to load partners');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const deletePartner = async (id) => {
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
      const res = await axiosInstance.delete(`/api/partners/${id}`);
      if (res.data.success) {
        setPartners(partners.filter(partner => partner._id !== id));
        if (selectedPartner?._id === id) setSelectedPartner(null);

        Swal.fire({
          title: 'Deleted!',
          text: 'Partner request has been deleted successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete partner request. Please try again.',
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchPartners();
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = 
      partner.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === 'all' || partner.location === locationFilter;
    
    return matchesSearch && matchesLocation;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPartners = filteredPartners.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const uniqueLocations = [...new Set(partners.map(p => p.location))];

  // Calculate stats
  const stats = {
    total: partners.length,
    locations: uniqueLocations.length,
    interests: [...new Set(partners.map(p => p.projectInterest))].length,
    today: partners.filter(partner => {
      const today = new Date();
      const partnerDate = new Date(partner.createdAt);
      return partnerDate.toDateString() === today.toDateString();
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
    return <AdminLoader message="Loading partner applications..." />;
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Partner Management</h1>
          <p className="dashboard-subtitle">Manage partnership applications and inquiries</p>
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
            <Users size={16} />
          </div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{stats.total}</h3>
            <p className="stat-title-compact">Total Partners</p>
            <span className="stat-trend-compact">All applications</span>
          </div>
        </div>

        <div className="stat-card-compact stat-green">
          <div className="stat-icon-compact">
            <MapPin size={16} />
          </div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{stats.locations}</h3>
            <p className="stat-title-compact">Locations</p>
            <span className="stat-trend-compact">Service areas</span>
          </div>
        </div>

        <div className="stat-card-compact stat-purple">
          <div className="stat-icon-compact">
            <Target size={16} />
          </div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{stats.interests}</h3>
            <p className="stat-title-compact">Interest Types</p>
            <span className="stat-trend-compact">Project categories</span>
          </div>
        </div>

        <div className="stat-card-compact stat-orange">
          <div className="stat-icon-compact">
            <Calendar size={16} />
          </div>
          <div className="stat-content-compact">
            <h3 className="stat-value-compact">{stats.today}</h3>
            <p className="stat-title-compact">Today</p>
            <span className="stat-trend-compact">New applications</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="section-title">Partner Applications ({filteredPartners.length})</div>
      
      <div className="admin-search-wrapper">
  {/* <Search className="admin-search-icon" /> */}
  <input
    type="text"
    placeholder="Search by name, company or email..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="admin-search-input rounded l-full pl-10 pr-4 py-2 px-2 border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
  />
</div>


      {/* Partners Table */}
    <div className="table-wrapper">
  <table className="admin-table">
    <thead>
      <tr>
        <th>Partner</th>
        <th>Company</th>
        <th>Mobile</th>
        <th>Location</th>
        <th>Interest</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {currentPartners.length === 0 ? (
        <tr>
          <td colSpan="6" style={{ textAlign: "center", padding: 40 }}>
            No partner requests found
          </td>
        </tr>
      ) : (
        currentPartners.map((partner) => (
          <tr key={partner._id}>
            <td>
              <div className="table-user">
                <div className="avatar">
                  {getInitials(partner.fullName)}
                </div>
                <div>
                  <div className="name">{partner.fullName}</div>
                  <div className="email">{partner.email}</div>
                </div>
              </div>
            </td>

            <td>{partner.companyName}</td>
            <td>{partner.mobile}</td>
            <td>{partner.location}</td>
            <td>{partner.projectInterest}</td>

            <td>
              <div className="action-buttons">
                <button
                  onClick={() => setSelectedPartner(partner)}
                  title="View"
                >
                  <Eye size={16} />
                </button>
                <button
                  className="danger"
                  onClick={() => deletePartner(partner._id)}
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
        totalItems={filteredPartners.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      {/* Partner Detail Modal */}
      {selectedPartner && (
        <div className="modal-overlay-blog" onClick={() => setSelectedPartner(null)}>
          <div className="modal-content-blog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-blog">
              <div className="modal-header-left">
                <div className="modal-icon-blog">
                  <Users size={24} />
                </div>
                <div>
                  <h2 className="modal-title-blog">Partner Details</h2>
                  <p className="modal-subtitle-blog">View partnership application information</p>
                </div>
              </div>
              <button 
                className="modal-close-blog" 
                onClick={() => setSelectedPartner(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-form-blog">
              {/* Partner Info */}
              <div className="form-row-blog">
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <User size={16} />
                    <span>Full Name</span>
                  </label>
                  <div className="form-input-blog bg-gray-50">{selectedPartner.fullName}</div>
                </div>
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <Building2 size={16} />
                    <span>Company Name</span>
                  </label>
                  <div className="form-input-blog bg-gray-50">{selectedPartner.companyName}</div>
                </div>
              </div>

              <div className="form-row-blog">
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <Mail size={16} />
                    <span>Email</span>
                  </label>
                  <div className="form-input-blog bg-gray-50">
                    <a href={`mailto:${selectedPartner.email}`} className="text-blue-600 hover:text-blue-800">
                      {selectedPartner.email}
                    </a>
                  </div>
                </div>
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <Phone size={16} />
                    <span>Mobile</span>
                  </label>
                  <div className="form-input-blog bg-gray-50">
                    <a href={`tel:${selectedPartner.mobile}`} className="text-blue-600 hover:text-blue-800">
                      {selectedPartner.mobile}
                    </a>
                  </div>
                </div>
              </div>

              <div className="form-row-blog">
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <MapPin size={16} />
                    <span>Location</span>
                  </label>
                  <div className="form-input-blog bg-gray-50">{selectedPartner.location}</div>
                </div>
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <Calendar size={16} />
                    <span>Application Date</span>
                  </label>
                  <div className="form-input-blog bg-gray-50">{formatDate(selectedPartner.createdAt)}</div>
                </div>
              </div>

              <div className="form-group-blog">
                <label className="form-label-blog">
                  <Target size={16} />
                  <span>Project Interest</span>
                </label>
                <div className="form-input-blog bg-gray-50">{selectedPartner.projectInterest}</div>
              </div>

              <div className="modal-actions-blog">
                <button 
                  type="button" 
                  className="btn-cancel-blog"
                  onClick={() => setSelectedPartner(null)}
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn-submit-blog"
                  onClick={() => deletePartner(selectedPartner._id)}
                >
                  <Trash2 size={18} />
                  Delete Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerManage;
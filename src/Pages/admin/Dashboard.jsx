import { FileText, Briefcase, Eye, Activity, Plus, Users, BarChart3, Settings, RefreshCw, Mail, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

const Dashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [stats, setStats] = useState({
    contacts: 0,
    amcRequests: 0,
    partners: 0,
    popups: 0,
    blogs: 0
  });

  const fetchStats = async () => {
    try {
      const [contactsRes, amcRes, partnersRes, popupsRes, blogsRes] = await Promise.all([
        axiosInstance.get('/api/contact'),
        axiosInstance.get('/api/amc'),
        axiosInstance.get('/api/partners'),
        axiosInstance.get('/api/popup'),
        axiosInstance.get('/api/blogs/admin/all')
      ]);

      setStats({
        contacts: contactsRes.data.success ? contactsRes.data.count : 0,
        amcRequests: amcRes.data.success ? amcRes.data.count : 0,
        partners: partnersRes.data.success ? partnersRes.data.count : 0,
        popups: popupsRes.data.success ? popupsRes.data.count : 0,
        blogs: blogsRes.data.success ? blogsRes.data.data.length : 0
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchStats();
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date());
    }, 1500);
  };
  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">
            Welcome back! Here's what's happening with KARA GROUP today.
          </p>
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
        <StatCard 
          icon={<FileText size={16} />} 
          title="Blog Posts" 
          value={stats.blogs.toString()} 
          trend="Content management" 
          color="blue"
          link="/admin/blogs"
        />
        <StatCard 
          icon={<Mail size={16} />} 
          title="Contact Messages" 
          value={stats.contacts.toString()} 
          trend="Customer inquiries" 
          color="green"
          link="/admin/contactus"
        />
        <StatCard 
          icon={<Settings size={16} />} 
          title="AMC Requests" 
          value={stats.amcRequests.toString()} 
          trend="Maintenance contracts" 
          color="purple"
          link="/admin/amc"
        />
        <StatCard 
          icon={<UserCheck size={16} />} 
          title="Partner Requests" 
          value={stats.partners.toString()} 
          trend="Partnership applications" 
          color="orange"
          link="/admin/partners"
        />
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          <ActionCard 
            icon={<FileText size={20} />}
            title="Manage Blogs" 
            description="Create, edit and publish blog posts"
            color="blue"
            link="/admin/blogs"
          />
          <ActionCard 
            icon={<Mail size={20} />}
            title="Contact Messages" 
            description="Review customer inquiries and messages"
            color="green"
            link="/admin/contactus"
          />
          <ActionCard 
            icon={<Settings size={20} />}
            title="AMC Requests" 
            description="Manage maintenance contract requests"
            color="purple"
            link="/admin/amc"
          />
          <ActionCard 
            icon={<UserCheck size={20} />}
            title="Partner Applications" 
            description="Review partnership applications"
            color="orange"
            link="/admin/partners"
          />
        </div>
      </div>

      {/* Recent Activity Stats */}
      <div className="recent-activity-stats">
        <h2 className="section-title">System Overview</h2>
        <div className="activity-stats-grid">
          <ActivityStatCard 
            icon={<FileText size={20} />}
            title="Blog Posts"
            value={stats.blogs.toString()}
            description="Total published content"
            color="blue"
          />
          <ActivityStatCard 
            icon={<Mail size={20} />}
            title="Contact Messages"
            value={stats.contacts.toString()}
            description="Customer inquiries received"
            color="green"
          />
          <ActivityStatCard 
            icon={<Settings size={20} />}
            title="AMC Requests"
            value={stats.amcRequests.toString()}
            description="Maintenance contracts"
            color="purple"
          />
          <ActivityStatCard 
            icon={<UserCheck size={20} />}
            title="Partner Applications"
            value={stats.partners.toString()}
            description="Partnership requests"
            color="orange"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, trend, color, link }) => (
  <div className={`stat-card-compact stat-${color}`}>
    <div className="stat-icon-compact">{icon}</div>
    <div className="stat-content-compact">
      <h3 className="stat-value-compact">{value}</h3>
      <p className="stat-title-compact">{title}</p>
      <span className="stat-trend-compact">{trend}</span>
    </div>
    {link && (
      <Link to={link} className="stat-link-compact">
        →
      </Link>
    )}
  </div>
);

const ActionCard = ({ icon, title, description, color, link }) => (
  <Link to={link || '#'} className={`action-card action-${color}`}>
    <div className="action-icon">{icon}</div>
    <h3 className="action-title">{title}</h3>
    <p className="action-description">{description}</p>
  </Link>
);

const ActivityStatCard = ({ icon, title, value, description, color }) => (
  <div className={`activity-stat-card activity-stat-${color}`}>
    <div className="activity-stat-icon">{icon}</div>
    <div className="activity-stat-content">
      <h3 className="activity-stat-value">{value}</h3>
      <p className="activity-stat-title">{title}</p>
      <span className="activity-stat-desc">{description}</span>
    </div>
  </div>
);

const ActivityItem = ({ type, message, time }) => (
  <div className="activity-item">
    <div className={`activity-dot activity-${type}`}></div>
    <div className="activity-content">
      <p className="activity-message">{message}</p>
      <span className="activity-time">{time}</span>
    </div>
  </div>
);

export default Dashboard;

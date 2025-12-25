import { FileText, Briefcase, Eye, Activity, Plus, Users, BarChart3, Settings, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
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
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid-compact">
        <StatCard 
          icon={<FileText size={16} />} 
          title="Blog Posts" 
          value="12" 
          trend="+3 this month" 
          color="blue"
          link="/admin/blogs"
        />
        <StatCard 
          icon={<Briefcase size={16} />} 
          title="Applications" 
          value="8" 
          trend="+2 new today" 
          color="green"
          link="/admin/careers"
        />
        <StatCard 
          icon={<Users size={16} />} 
          title="Contacts" 
          value="24" 
          trend="+5 this week" 
          color="purple"
          link="/admin/contactus"
        />
        <StatCard 
          icon={<Activity size={16} />} 
          title="Views" 
          value="1,247" 
          trend="+15% month" 
          color="orange"
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
            icon={<Briefcase size={20} />}
            title="Career Forms" 
            description="Review job applications"
            color="green"
            link="/admin/careers"
          />
          <ActionCard 
            icon={<Users size={20} />}
            title="Contact Forms" 
            description="Manage customer inquiries"
            color="purple"
            link="/admin/contactus"
          />
          <ActionCard 
            icon={<BarChart3 size={20} />}
            title="Analytics" 
            description="View website statistics"
            color="orange"
          />
        </div>
      </div>

      {/* Recent Activity Stats */}
      <div className="recent-activity-stats">
        <h2 className="section-title">Recent Activity Overview</h2>
        <div className="activity-stats-grid">
          <ActivityStatCard 
            icon={<FileText size={20} />}
            title="Blog Posts"
            value="3"
            description="Published this week"
            color="blue"
          />
          <ActivityStatCard 
            icon={<Users size={20} />}
            title="New Contacts"
            value="12"
            description="Messages received"
            color="green"
          />
          <ActivityStatCard 
            icon={<Briefcase size={20} />}
            title="Applications"
            value="5"
            description="Job submissions"
            color="purple"
          />
          <ActivityStatCard 
            icon={<Activity size={20} />}
            title="Total Activity"
            value="20"
            description="Actions today"
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

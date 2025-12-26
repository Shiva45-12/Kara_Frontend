import { FileText, Briefcase, Eye, Activity, Plus, Users, BarChart3, Settings, RefreshCw, Mail, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useTheme } from "../../context/ThemeContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const Dashboard = () => {
  const { theme } = useTheme();
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
      {/* <div className="quick-actions-section">
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
      </div> */}

      {/* Analytics Chart */}
      <div className="recent-activity-stats">
        <h2 className="section-title">System Analytics</h2>
        {/* Pie Chart */}
        <div style={{ 
          background: theme === 'dark' ? 'var(--bg-secondary)' : 'white', 
          padding: '30px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginTop: '20px'
        }}>
          <Pie 
            data={{
              labels: ['Blog Posts', 'Contact Messages', 'AMC Requests', 'Partner Applications'],
              datasets: [
                {
                  data: [stats.blogs, stats.contacts, stats.amcRequests, stats.partners],
                  backgroundColor: [
                    '#3b82f6',
                    '#10b981', 
                    '#8b5cf6',
                    '#f59e0b'
                  ],
                  borderColor: [
                    '#1d4ed8',
                    '#059669',
                    '#7c3aed', 
                    '#d97706'
                  ],
                  borderWidth: 2,
                  hoverOffset: 10
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                      size: 12,
                      weight: '500'
                    },
                    generateLabels: function(chart) {
                      const data = chart.data;
                      const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                      const textColor = theme === 'dark' ? '#ffffff' : '#333333';
                      return data.labels.map((label, index) => {
                        const value = data.datasets[0].data[index];
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                        return {
                          text: `${label}: ${value} (${percentage}%)`,
                          fillStyle: data.datasets[0].backgroundColor[index],
                          strokeStyle: data.datasets[0].borderColor[index],
                          lineWidth: 2,
                          pointStyle: 'circle',
                          fontColor: textColor
                        };
                      });
                    }
                  }
                },
                title: {
                  display: true,
                  text: 'System Data Distribution',
                  font: {
                    size: 16,
                    weight: 'bold'
                  },
                  padding: {
                    bottom: 20
                  },
                  color: theme === 'dark' ? '#ffffff' : '#333333'
                },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  titleColor: 'white',
                  bodyColor: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: 1,
                  cornerRadius: 8,
                  displayColors: true,
                  callbacks: {
                    label: function(context) {
                      const total = context.dataset.data.reduce((a, b) => a + b, 0);
                      const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                      return `${context.label}: ${context.parsed} (${percentage}%)`;
                    }
                  }
                }
              },
              animation: {
                animateRotate: true,
                animateScale: true
              }
            }}
            height={300}
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

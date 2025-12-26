import { FileText, Briefcase, Eye, Activity, Plus, Users, BarChart3, Settings, RefreshCw, Mail, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
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
import { Line, Pie } from 'react-chartjs-2';

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
        <div style={{ 
          background: 'white', 
          padding: '30px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px'
        }}>
          <Line 
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [
                {
                  label: 'Blog Posts',
                  data: [2, 4, 3, 5, 4, 6, 7, 5, 8, 6, 9, stats.blogs],
                  borderColor: '#3b82f6',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  fill: true,
                  tension: 0.4
                },
                {
                  label: 'Contact Messages',
                  data: [15, 25, 20, 30, 35, 28, 40, 45, 38, 50, 42, stats.contacts],
                  borderColor: '#10b981',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  fill: true,
                  tension: 0.4
                },
                {
                  label: 'AMC Requests',
                  data: [5, 8, 6, 12, 10, 15, 18, 14, 20, 16, 22, stats.amcRequests],
                  borderColor: '#8b5cf6',
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  fill: true,
                  tension: 0.4
                },
                {
                  label: 'Partner Applications',
                  data: [1, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, stats.partners],
                  borderColor: '#f59e0b',
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  fill: true,
                  tension: 0.4
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                      size: 12,
                      weight: '500'
                    }
                  }
                },
                title: {
                  display: true,
                  text: 'Monthly System Activity Trends',
                  font: {
                    size: 16,
                    weight: 'bold'
                  },
                  padding: {
                    bottom: 30
                  }
                },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  titleColor: 'white',
                  bodyColor: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: 1,
                  cornerRadius: 8,
                  displayColors: true,
                  intersect: false,
                  mode: 'index'
                }
              },
              scales: {
                x: {
                  grid: {
                    display: false
                  },
                  ticks: {
                    font: {
                      size: 11
                    },
                    color: '#6b7280'
                  }
                },
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                  },
                  ticks: {
                    font: {
                      size: 11
                    },
                    color: '#6b7280'
                  }
                }
              },
              interaction: {
                intersect: false,
                mode: 'index'
              },
              elements: {
                point: {
                  radius: 4,
                  hoverRadius: 6,
                  borderWidth: 2,
                  hoverBorderWidth: 3
                }
              }
            }}
            height={400}
          />
        </div>
        
        {/* Pie Chart */}
        <div style={{ 
          background: 'white', 
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
                  }
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
                      const percentage = ((context.parsed / total) * 100).toFixed(1);
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

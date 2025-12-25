import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Calendar, Search, FileText, BookOpen, Globe, Star, RefreshCw, X, Image, Tag, Clock, Save, Upload, Palette, Type, AlignLeft } from 'lucide-react';

const BlogManage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    featured: false,
    status: 'draft',
    image: ''
  });

  // Mock data for now
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    setLoading(true);
    setTimeout(() => {
      setBlogs([
        {
          _id: '1',
          title: 'Solar Energy Benefits for Industries',
          excerpt: 'Discover how solar energy can reduce costs and improve sustainability in industrial operations.',
          category: 'Sustainability',
          status: 'published',
          featured: true,
          views: 1250,
          comments: 15,
          publishedAt: new Date(),
          author: { name: 'Admin' },
          image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800'
        },
        {
          _id: '2', 
          title: 'Modern Construction Techniques',
          excerpt: 'Exploring the latest innovations in construction technology and methodologies.',
          category: 'Construction',
          status: 'draft',
          featured: false,
          views: 890,
          comments: 8,
          publishedAt: new Date(),
          author: { name: 'Admin' },
          image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800'
        },
        {
          _id: '3',
          title: 'Safety Standards in Engineering',
          excerpt: 'Understanding the importance of safety protocols in engineering projects.',
          category: 'Safety Standards',
          status: 'published',
          featured: false,
          views: 2100,
          comments: 23,
          publishedAt: new Date(),
          author: { name: 'Admin' },
          image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'
        }
      ]);
      setLoading(false);
      setIsRefreshing(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchBlogs();
  };

  const stats = {
    total: blogs.length,
    published: blogs.filter(blog => blog.status === 'published').length,
    drafts: blogs.filter(blog => blog.status === 'draft').length,
    featured: blogs.filter(blog => blog.featured).length,
    totalViews: blogs.reduce((sum, blog) => sum + blog.views, 0),
    totalComments: blogs.reduce((sum, blog) => sum + blog.comments, 0),
    avgViews: blogs.length > 0 ? Math.round(blogs.reduce((sum, blog) => sum + blog.views, 0) / blogs.length) : 0,
    publishedThisMonth: blogs.filter(blog => {
      const blogDate = new Date(blog.publishedAt);
      const now = new Date();
      return blog.status === 'published' && 
             blogDate.getMonth() === now.getMonth() && 
             blogDate.getFullYear() === now.getFullYear();
    }).length
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new blog logic here
    console.log('New blog data:', formData);
    setShowModal(false);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      featured: false,
      status: 'draft',
      image: ''
    });
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="text-center py-12">
          <RefreshCw className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Blog Management</h1>
          <p className="dashboard-subtitle">
            Create, edit, and manage your blog content
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className={`btn-secondary ${isRefreshing ? 'opacity-75' : ''}`}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} />
            <span>New Post</span>
          </button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="stats-grid-compact">
        <StatCard 
          icon={<FileText size={16} />} 
          title="Total Posts" 
          value={stats.total}
          trend={`${stats.publishedThisMonth} this month`}
          color="blue"
        />
        <StatCard 
          icon={<Globe size={16} />} 
          title="Published" 
          value={stats.published}
          trend={`${Math.round((stats.published/stats.total)*100) || 0}% of total`}
          color="green"
        />
        <StatCard 
          icon={<BookOpen size={16} />} 
          title="Drafts" 
          value={stats.drafts}
          trend={stats.drafts > 0 ? 'Ready to publish' : 'All published'}
          color="yellow"
        />
        <StatCard 
          icon={<Star size={16} />} 
          title="Featured" 
          value={stats.featured}
          trend={`${Math.round((stats.featured/stats.total)*100) || 0}% featured`}
          color="purple"
        />
      </div>

      {/* Additional Stats Row */}
      <div className="stats-grid-compact mt-4">
        <StatCard 
          icon={<Eye size={16} />} 
          title="Total Views" 
          value={stats.totalViews.toLocaleString()}
          trend={`${stats.avgViews} avg per post`}
          color="orange"
        />
        <StatCard 
          icon={<Globe size={16} />} 
          title="Comments" 
          value={stats.totalComments}
          trend={`${(stats.totalComments/stats.published || 0).toFixed(1)} per published`}
          color="indigo"
        />
        <StatCard 
          icon={<Calendar size={16} />} 
          title="This Month" 
          value={stats.publishedThisMonth}
          trend={stats.publishedThisMonth > 0 ? 'Active publishing' : 'No posts yet'}
          color="teal"
        />
        <StatCard 
          icon={<RefreshCw size={16} />} 
          title="Engagement" 
          value={`${((stats.totalComments/stats.totalViews)*100 || 0).toFixed(1)}%`}
          trend="Comment rate"
          color="pink"
        />
      </div>

      {/* Blog Posts Section */}
      <div className="section-title">Blog Posts ({blogs.length})</div>

      {/* Blog Grid with Images */}
      <div className="blog-grid-dashboard">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="recent-activity">
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No blog posts found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or create a new post</p>
            <button className="btn-primary">
              <Plus size={16} />
              <span>Create Your First Post</span>
            </button>
          </div>
        </div>
      )}

      {/* New Post Modal */}
      {showModal && (
        <div className="modal-overlay-blog" onClick={() => setShowModal(false)}>
          <div className="modal-content-blog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-blog">
              <div className="modal-header-left">
                <div className="modal-icon-blog">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="modal-title-blog">Create New Blog Post</h2>
                  <p className="modal-subtitle-blog">Fill in the details to publish your blog</p>
                </div>
              </div>
              <button 
                className="modal-close-blog" 
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form-blog">
              {/* Title */}
              <div className="form-group-blog">
                <label className="form-label-blog">
                  <Type size={16} />
                  <span>Blog Title *</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="form-input-blog"
                  placeholder="Enter an engaging title for your blog post"
                  required
                />
              </div>

              {/* Image URL */}
              <div className="form-group-blog">
                <label className="form-label-blog">
                  <Image size={16} />
                  <span>Featured Image URL *</span>
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="form-input-blog"
                  placeholder="https://example.com/image.jpg"
                  required
                />
                {formData.image && (
                  <div className="image-preview-blog">
                    <img src={formData.image} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                )}
              </div>

              {/* Category & Status */}
              <div className="form-row-blog">
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <Tag size={16} />
                    <span>Category *</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-input-blog"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Sustainability">Sustainability</option>
                    <option value="Construction">Construction</option>
                    <option value="Safety Standards">Safety Standards</option>
                    <option value="Technology">Technology</option>
                    <option value="Innovation">Innovation</option>
                  </select>
                </div>
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <Globe size={16} />
                    <span>Status</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="form-input-blog"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              {/* Excerpt */}
              <div className="form-group-blog">
                <label className="form-label-blog">
                  <AlignLeft size={16} />
                  <span>Excerpt *</span>
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  className="form-textarea-blog"
                  placeholder="Write a brief description (150-200 characters recommended)"
                  rows="3"
                  required
                />
                <div className="char-count-blog">
                  {formData.excerpt.length} characters
                </div>
              </div>

              {/* Content */}
              <div className="form-group-blog">
                <label className="form-label-blog">
                  <FileText size={16} />
                  <span>Content *</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="form-textarea-blog"
                  placeholder="Write your blog content here... Use markdown for formatting."
                  rows="10"
                  required
                />
                <div className="char-count-blog">
                  {formData.content.length} characters
                </div>
              </div>

              {/* Featured Checkbox */}
              <div className="form-checkbox-blog">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="checkbox-input-blog"
                />
                <label htmlFor="featured" className="checkbox-label-blog">
                  <Star size={18} fill={formData.featured ? 'currentColor' : 'none'} />
                  <div>
                    <span className="checkbox-title">Mark as Featured Post</span>
                    <span className="checkbox-desc">Featured posts appear prominently on your blog</span>
                  </div>
                </label>
              </div>

              {/* Actions */}
              <div className="modal-actions-blog">
                <button 
                  type="button" 
                  className="btn-cancel-blog"
                  onClick={() => setShowModal(false)}
                >
                  <X size={18} />
                  Cancel
                </button>
                <button type="submit" className="btn-submit-blog">
                  <Save size={18} />
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Stat Card Component
const StatCard = ({ icon, title, value, trend, color }) => {
  return (
    <div className={`stat-card-compact stat-${color}`}>
      <div className="stat-icon-compact">{icon}</div>
      <div className="stat-content-compact">
        <h3 className="stat-value-compact">{value}</h3>
        <p className="stat-title-compact">{title}</p>
        <span className="stat-trend-compact">{trend}</span>
      </div>
    </div>
  );
};

// Blog Card Component
const BlogCard = ({ blog }) => (
  <div className="blog-card-dashboard">
    <div className="blog-card-image-dashboard">
      <img src={blog.image} alt={blog.title} />
      {blog.featured && (
        <div className="featured-badge-dashboard">
          <Star size={12} fill="currentColor" />
        </div>
      )}
    </div>
    <div className="blog-card-content-dashboard">
      <div className="blog-card-category-dashboard">{blog.category}</div>
      <h3 className="blog-card-title-dashboard">{blog.title}</h3>
      <p className="blog-card-excerpt-dashboard">{blog.excerpt}</p>
      <div className="blog-card-footer-dashboard">
        <div className="blog-card-meta-dashboard">
          <Eye size={14} />
          <span>{blog.views}</span>
        </div>
        <div className="blog-card-meta-dashboard">
          <Calendar size={14} />
          <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
    </div>
  </div>
);

export default BlogManage;
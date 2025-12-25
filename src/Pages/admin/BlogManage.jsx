import React, { useState, useEffect } from 'react';
import {
  Plus, Edit, Trash2, Eye, Calendar, FileText, BookOpen,
  Globe, Star, RefreshCw, X, Image, Tag, Type, AlignLeft, Save
} from 'lucide-react';
import AdminLoader from '../../components/AdminLoader';
import axiosInstance from '../../utils/axiosInstance';
import Swal from 'sweetalert2';

const BlogManage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    featured: false,
    status: 'draft',
    image: ''
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      featured: blog.featured,
      status: blog.status,
      image: blog.image
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`/api/blogs/admin/${editingBlog._id}`, formData);
      if (res.data.success) {
        Swal.fire('Success!', 'Blog updated successfully!', 'success');
        setShowEditModal(false);
        fetchBlogs();
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to update blog', 'error');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/api/blogs/admin', formData);
      if (res.data.success) {
        Swal.fire('Success!', 'Blog created successfully!', 'success');
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
        fetchBlogs();
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to create blog', 'error');
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/api/blogs/admin/all');
      if (res.data.success) setBlogs(res.data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Blog?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444'
    });
    if (!result.isConfirmed) return;

    await axiosInstance.delete(`/api/blogs/admin/${id}`);
    fetchBlogs();
  };

  /* ================= STATS (UNCHANGED) ================= */
  const stats = {
    total: blogs.length,
    published: blogs.filter(b => b.status === 'published').length,
    drafts: blogs.filter(b => b.status === 'draft').length,
    featured: blogs.filter(b => b.featured).length
  };

  if (loading) return <AdminLoader message="Loading blog posts..." />;

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Blog Management</h1>
          <p className="dashboard-subtitle">Create, edit, and manage your blog content</p>
        </div>
        <div style={{display:"flex" , gap:"5px"}}>
          <button
            className={`btn-secondary ${isRefreshing ? 'opacity-75' : ''}`}
            onClick={() => {
              setIsRefreshing(true);
              fetchBlogs();
            }}
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} /> Refresh
          </button>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} /> New Post
          </button>
        </div>
      </div>

      {/* STATS GRID (SAME) */}
      <div className="stats-grid-compact">
        <StatCard icon={<FileText size={16} />} title="Total Posts" value={stats.total} />
        <StatCard icon={<Globe size={16} />} title="Published" value={stats.published} />
        <StatCard icon={<BookOpen size={16} />} title="Drafts" value={stats.drafts} />
        <StatCard icon={<Star size={16} />} title="Featured" value={stats.featured} />
      </div>

      {/* BLOG GRID */}
      <div className="blog-grid-dashboard">
        {blogs.map(blog => (
          <BlogCard
            key={blog._id}
            blog={blog}
            onView={() => {
              setSelectedBlog(blog);
              setShowViewModal(true);
            }}
            onEdit={() => {
              handleEdit(blog);
            }}
            onDelete={() => handleDelete(blog._id)}
          />
        ))}
      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="modal-overlay-blog" onClick={() => setShowModal(false)}>
          <div className="modal-content-blog" onClick={e => e.stopPropagation()}>
            <div className="modal-header-blog">
              <div className="modal-header-left">
                <div className="modal-icon-blog">
                  <Plus size={24} />
                </div>
                <div>
                  <h2 className="modal-title-blog">Create New Blog Post</h2>
                  <p className="modal-subtitle-blog">Fill in the details to publish your blog</p>
                </div>
              </div>
              <button className="modal-close-blog" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="modal-form-blog">
              <div className="form-group-blog">
                <label className="form-label-blog">
                  <Type size={16} />
                  <span>Blog Title *</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="form-input-blog"
                  placeholder="Enter an engaging title for your blog post"
                  required
                />
              </div>

              <div className="form-group-blog">
                <label className="form-label-blog">
                  <Image size={16} />
                  <span>Featured Image URL *</span>
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="form-input-blog"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="form-row-blog">
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <Tag size={16} />
                    <span>Category *</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="form-input-blog"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Solar Knowledge">Solar Knowledge</option>
                    <option value="Government Schemes">Government Schemes</option>
                    <option value="Micro-Udyog Ideas">Micro-Udyog Ideas</option>
                    <option value="Rural Development">Rural Development</option>
                    <option value="Technical Guides">Technical Guides</option>
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
                    onChange={e => setFormData({...formData, status: e.target.value})}
                    className="form-input-blog"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="form-group-blog">
                <label className="form-label-blog">
                  <AlignLeft size={16} />
                  <span>Excerpt *</span>
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={e => setFormData({...formData, excerpt: e.target.value})}
                  className="form-textarea-blog"
                  placeholder="Write a brief description (150-200 characters recommended)"
                  rows="3"
                  required
                />
              </div>

              <div className="form-group-blog">
                <label className="form-label-blog">
                  <FileText size={16} />
                  <span>Content *</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  className="form-textarea-blog"
                  placeholder="Write your blog content here..."
                  rows="10"
                  required
                />
              </div>

              <div className="form-checkbox-blog">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={e => setFormData({...formData, featured: e.target.checked})}
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

              <div className="modal-actions-blog">
                <button type="button" className="btn-cancel-blog" onClick={() => setShowModal(false)}>
                  <X size={18} /> Cancel
                </button>
                <button type="submit" className="btn-submit-blog">
                  <Save size={18} /> Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {showViewModal && selectedBlog && (
        <Modal title={selectedBlog.title} onClose={() => setShowViewModal(false)}>
          <img src={selectedBlog.image} className="rounded-xl mb-4" />
          <p className="whitespace-pre-wrap text-gray-700">{selectedBlog.content}</p>
        </Modal>
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="modal-overlay-blog" onClick={() => setShowEditModal(false)}>
          <div className="modal-content-blog" onClick={e => e.stopPropagation()}>
            <div className="modal-header-blog">
              <div className="modal-header-left">
                <div className="modal-icon-blog">
                  <Edit size={24} />
                </div>
                <div>
                  <h2 className="modal-title-blog">Edit Blog Post</h2>
                  <p className="modal-subtitle-blog">Update your blog post details</p>
                </div>
              </div>
              <button className="modal-close-blog" onClick={() => setShowEditModal(false)}>
                ×
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="modal-form-blog">
              <div className="form-group-blog">
                <label className="form-label-blog">
                  <Type size={16} />
                  <span>Blog Title *</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="form-input-blog"
                  required
                />
              </div>

              <div className="form-group-blog">
                <label className="form-label-blog">
                  <Image size={16} />
                  <span>Featured Image URL *</span>
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="form-input-blog"
                  required
                />
              </div>

              <div className="form-row-blog">
                <div className="form-group-blog">
                  <label className="form-label-blog">
                    <Tag size={16} />
                    <span>Category *</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="form-input-blog"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Solar Knowledge">Solar Knowledge</option>
                    <option value="Government Schemes">Government Schemes</option>
                    <option value="Micro-Udyog Ideas">Micro-Udyog Ideas</option>
                    <option value="Rural Development">Rural Development</option>
                    <option value="Technical Guides">Technical Guides</option>
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
                    onChange={e => setFormData({...formData, status: e.target.value})}
                    className="form-input-blog"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="form-group-blog">
                <label className="form-label-blog">
                  <AlignLeft size={16} />
                  <span>Excerpt *</span>
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={e => setFormData({...formData, excerpt: e.target.value})}
                  className="form-textarea-blog"
                  rows="3"
                  required
                />
              </div>

              <div className="form-group-blog">
                <label className="form-label-blog">
                  <FileText size={16} />
                  <span>Content *</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  className="form-textarea-blog"
                  rows="10"
                  required
                />
              </div>

              <div className="form-checkbox-blog">
                <input
                  type="checkbox"
                  id="featured-edit"
                  name="featured"
                  checked={formData.featured}
                  onChange={e => setFormData({...formData, featured: e.target.checked})}
                  className="checkbox-input-blog"
                />
                <label htmlFor="featured-edit" className="checkbox-label-blog">
                  <Star size={18} fill={formData.featured ? 'currentColor' : 'none'} />
                  <div>
                    <span className="checkbox-title">Mark as Featured Post</span>
                    <span className="checkbox-desc">Featured posts appear prominently on your blog</span>
                  </div>
                </label>
              </div>

              <div className="modal-actions-blog">
                <button type="button" className="btn-cancel-blog" onClick={() => setShowEditModal(false)}>
                  <X size={18} /> Cancel
                </button>
                <button type="submit" className="btn-submit-blog">
                  <Save size={18} /> Update Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

/* ================= STAT CARD ================= */
const StatCard = ({ icon, title, value }) => (
  <div className="stat-card-compact">
    <div className="stat-icon-compact">{icon}</div>
    <div className="stat-content-compact">
      <h3 className="stat-value-compact">{value}</h3>
      <p className="stat-title-compact">{title}</p>
    </div>
  </div>
);

/* ================= BLOG CARD ================= */
const BlogCard = ({ blog, onView, onEdit, onDelete }) => (
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

      <div className="flex justify-between text-sm text-gray-500 mt-2">
        {/* <span className="flex items-center gap-1">
          <Eye size={14} /> {blog.views || 0}
        </span> */}
        <span className="flex items-center gap-1">
          <Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* 🔥 FIXED BUTTONS (ONLY CHANGE HERE) */}
      <div className="flex items-center gap-2 mt-4">
        {/* <ActionBtn icon={<Eye size={16} />} onClick={onView} /> */}
        <ActionBtn icon={<Edit size={16} />} onClick={onEdit} color="blue" />
        <ActionBtn icon={<Trash2 size={16} />} onClick={onDelete} color="red" />
      </div>
    </div>
  </div>
);

/* ================= ACTION BUTTON ================= */
const ActionBtn = ({ icon, onClick, color = 'gray' }) => {
  const map = {
    gray: 'border-gray-200 text-gray-600 hover:bg-gray-100',
    blue: 'border-blue-200 text-blue-600 hover:bg-blue-50',
    red: 'border-red-200 text-red-600 hover:bg-red-50'
  };

  return (
    <button
      onClick={onClick}
      className={`w-9 h-9 flex items-center justify-center rounded p-2 py-1 px-2 border bg-transition ${map[color]}`}
    >
      {icon}
    </button>
  );
};

/* ================= MODAL ================= */
const Modal = ({ title, children, onClose }) => (
  <div className="modal-overlay-blog" onClick={onClose}>
    <div className="modal-content-blog" onClick={e => e.stopPropagation()}>
      <div className="modal-header-blog">
        <h2 className="modal-title-blog">{title}</h2>
        <button onClick={onClose}><X /></button>
      </div>
      {children}
    </div>
  </div>
);

export default BlogManage;

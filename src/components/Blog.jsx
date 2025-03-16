import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { blogService } from '../services/api';
import BlogCard from './blog/BlogCard';
import BlogEditor from './blog/BlogEditor';

const TABS = ['Latest', 'Popular'];

// Default hardcoded blogs
const DEFAULT_BLOGS = [
  {
    _id: 'default-1',
    title: 'Welcome to My Portfolio',
    content: "Hi there! I'm Abhishek Bhonde, a passionate full-stack developer. This blog is where I share my journey in tech, my projects, and my learnings. Feel free to explore and connect!",
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',
    author: {
      _id: 'default-author',
      name: 'Abhishek Bhonde',
      avatar: 'https://github.com/abhishekbhonde.png'
    },
    createdAt: new Date().toISOString(),
    likes: 42,
    tags: ['Introduction', 'Portfolio', 'Development']
  },
  {
    _id: 'default-2',
    title: 'My Journey as a Developer',
    content: "From writing my first \"Hello World\" to building full-stack applications, here's my journey in software development. I discuss the challenges I've faced, the lessons I've learned, and what keeps me motivated.",
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80',
    author: {
      _id: 'default-author',
      name: 'Abhishek Bhonde',
      avatar: 'https://github.com/abhishekbhonde.png'
    },
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    likes: 35,
    tags: ['Journey', 'Development', 'Learning']
  }
];

export default function Blog({ isEditing = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Latest');
  const [showEditor, setShowEditor] = useState(isEditing);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, [activeTab, currentPage]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      let filters = {};
      
      if (activeTab === 'Popular') {
        filters.sort = '-likes';
      } else if (activeTab === 'My Blogs' && user) {
        filters.author = user._id;
      }

      const response = await blogService.getAllBlogs(currentPage, 6, filters);
      const blogsData = response?.data?.blogs || response?.blogs || [];
      
      let combinedBlogs;
      if (currentPage === 1) {
        // Only add default blogs on the first page and if not in "My Blogs" tab
        combinedBlogs = activeTab === 'My Blogs' ? blogsData : [...DEFAULT_BLOGS, ...blogsData];
      } else {
        combinedBlogs = [...blogs, ...blogsData];
      }

      setBlogs(combinedBlogs);
      setHasMore(blogsData.length === 6);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to fetch blogs');
      // Show default blogs even if API fails
      if (currentPage === 1 && activeTab !== 'My Blogs') {
        setBlogs(DEFAULT_BLOGS);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = async (blogData) => {
    try {
      await blogService.createBlog(blogData);
      setShowEditor(false);
      setCurrentPage(1);
      fetchBlogs();
    } catch (err) {
      console.error('Error creating blog:', err);
      throw err;
    }
  };

  const handleUpdateBlog = async (blogData) => {
    try {
      await blogService.updateBlog(id, blogData);
      navigate(`/blog/${id}`);
    } catch (err) {
      console.error('Error updating blog:', err);
      throw err;
    }
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg filter blur-3xl opacity-30" />
        
        {/* Content */}
        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Community Blog</h1>
          </div>

          {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-8 rounded-xl mb-8 text-center"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Share Your Story with the World</h2>
            <p className="text-gray-300 text-lg mb-6">
              "Every developer has a story worth sharing - what's yours?"
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => user ? navigate('/blog/create') : navigate('/login')}
              className="btn-primary flex items-center gap-2 hover:bg-primary/90 transition-colors px-8 py-3 rounded-lg text-lg mx-auto"
            >
              <FiPlus className="w-5 h-5" /> Write Blog
            </motion.button>
            {!user && (
              <p className="text-gray-400 mt-4">
                <button 
                  onClick={() => navigate('/login')}
                  className="text-primary hover:underline"
                >
                  Log in
                </button>
                {" "}or{" "}
                <button
                  onClick={() => navigate('/register')}
                  className="text-primary hover:underline"
                >
                  create an account
                </button>
                {" "}to start writing your own blog posts!
              </p>
            )}
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-primary text-white'
                    : 'bg-dark-800/50 text-gray-300 hover:bg-dark-800'
                }`}
              >
                {tab}
              </button>
            ))}
            {user && (
              <button
                onClick={() => {
                  setActiveTab('My Blogs');
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === 'My Blogs'
                    ? 'bg-primary text-white'
                    : 'bg-dark-800/50 text-gray-300 hover:bg-dark-800'
                }`}
              >
                My Blogs
              </button>
            )}
          </div>

          {/* Blog Grid */}
          {error && blogs.length === 0 ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  onClick={() => navigate(`/blog/${blog._id}`)}
                />
              ))}
            </div>
          )}

          {/* Load More */}
          {!loading && hasMore && activeTab !== 'My Blogs' && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="btn-secondary"
              >
                Load More
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mx-auto" />
            </div>
          )}
        </div>
      </div>

      {/* Blog Editor Modal */}
      {showEditor && (
        <BlogEditor
          onClose={() => {
            setShowEditor(false);
            if (isEditing) navigate('/blog');
          }}
          onSubmit={isEditing ? handleUpdateBlog : handleCreateBlog}
          editId={isEditing ? id : null}
        />
      )}
    </div>
  );
} 
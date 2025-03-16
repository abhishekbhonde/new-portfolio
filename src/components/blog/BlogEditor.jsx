import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiImage, FiTag, FiSend } from 'react-icons/fi';
import { blogService } from '../../services/api';

const TAGS = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Machine Learning',
  'Blockchain',
  'Cloud Computing',
  'DevOps',
  'Cybersecurity',
  'Data Science',
  'IoT'
];

export default function BlogEditor({ onClose, onSubmit, editId = null }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    preview: '',
    tags: [],
    coverImage: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (editId) {
      fetchBlog();
    }
  }, [editId]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const blog = await blogService.getBlogById(editId);
      setFormData({
        title: blog.title,
        content: blog.content,
        preview: blog.preview,
        tags: blog.tags,
        coverImage: null
      });
      setImagePreview(blog.coverImage);
    } catch (err) {
      setError('Failed to fetch blog');
      console.error('Error fetching blog:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        coverImage: file
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const toggleTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-dark-900 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editId ? 'Edit Blog' : 'Create New Blog'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {error && (
              <div className="text-red-500 text-sm mb-4">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Cover Image Upload */}
              <div>
                <label className="block text-gray-300 mb-2">Cover Image</label>
                <div className="relative">
                  {imagePreview ? (
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview('');
                          setFormData(prev => ({ ...prev, coverImage: null }));
                        }}
                        className="absolute top-2 right-2 bg-dark-900/80 p-2 rounded-full"
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="coverImage"
                      />
                      <label
                        htmlFor="coverImage"
                        className="flex items-center justify-center h-48 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                      >
                        <div className="text-center">
                          <FiImage className="w-8 h-8 mx-auto text-primary/50" />
                          <span className="text-gray-400 mt-2 block">
                            Click to upload cover image
                          </span>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-800 border border-primary/10 rounded-lg focus:outline-none focus:border-primary/30 text-white"
                  placeholder="Enter your blog title"
                />
              </div>

              {/* Preview */}
              <div>
                <label htmlFor="preview" className="block text-gray-300 mb-2">
                  Preview
                </label>
                <input
                  type="text"
                  id="preview"
                  name="preview"
                  value={formData.preview}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-800 border border-primary/10 rounded-lg focus:outline-none focus:border-primary/30 text-white"
                  placeholder="Enter a short preview of your blog"
                />
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-gray-300 mb-2">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={10}
                  className="w-full px-4 py-2 bg-dark-800 border border-primary/10 rounded-lg focus:outline-none focus:border-primary/30 text-white"
                  placeholder="Write your blog content (Markdown supported)"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-gray-300 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {TAGS.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        formData.tags.includes(tag)
                          ? 'bg-primary text-white'
                          : 'bg-dark-800 text-gray-400 hover:bg-dark-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center gap-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white" />
                  ) : (
                    <>
                      <FiSend />
                      {editId ? 'Update Blog' : 'Publish Blog'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
} 
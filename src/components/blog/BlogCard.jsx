import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiMessageCircle, FiCode } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { blogService } from '../../services/api';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function BlogCard({ blog }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [likes, setLikes] = React.useState(
    blog._id?.startsWith('default-') 
      ? parseInt(localStorage.getItem(`${blog._id}_likes`) || '0')
      : blog.likes || 0
  );
  const [isLiked, setIsLiked] = React.useState(
    blog._id?.startsWith('default-')
      ? JSON.parse(localStorage.getItem('likedBlogs') || '[]').includes(blog._id)
      : blog.isLiked || false
  );

  // Check if the blog content contains code snippets
  const hasCodeSnippets = blog.content.includes('```');

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await blogService.likeBlog(blog._id);
      setLikes(response.likes);
      setIsLiked(response.isLiked);
    } catch (err) {
      console.error('Error liking blog:', err);
    }
  };

  const handleBlogClick = () => {
    navigate(`/blog/${blog._id}`);
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    navigate(`/blog/${blog._id}`, { state: { scrollToComments: true } });
  };

  // Get the first paragraph of content (preview)
  const getPreview = () => {
    const firstParagraph = blog.content.split('\n\n')[0]
      .replace(/#/g, '') // Remove headers
      .replace(/\[.*?\]/g, '') // Remove link text
      .replace(/\(.*?\)/g, '') // Remove link URLs
      .replace(/[*_`]/g, '') // Remove formatting characters
      .trim();
    return firstParagraph.length > 150 ? firstParagraph.substring(0, 150) + '...' : firstParagraph;
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={handleBlogClick}
      className="bg-dark-900/50 rounded-xl overflow-hidden border border-primary/10 backdrop-blur-lg cursor-pointer group hover:border-primary/30 transition-all duration-300"
    >
      {/* Cover Image with Gradient Overlay */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent z-10" />
        <img
          src={blog.coverImage || 'https://source.unsplash.com/random/800x400?tech'}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {hasCodeSnippets && (
          <div className="absolute top-4 right-4 z-20 bg-primary/20 p-2 rounded-full backdrop-blur-sm">
            <FiCode className="w-5 h-5 text-primary" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags?.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {blog.title}
        </h3>

        {/* Preview */}
        <div className="text-gray-400 mb-4 line-clamp-3 text-sm">
          {getPreview()}
        </div>

        {/* Author and Metrics */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-primary/10">
          <div className="flex items-center gap-2">
            <img
              src={blog.author.avatar || `https://ui-avatars.com/api/?name=${blog.author.name}`}
              alt={blog.author.name}
              className="w-8 h-8 rounded-full ring-2 ring-primary/20"
            />
            <div>
              <p className="text-sm text-white font-medium">{blog.author.name}</p>
              <p className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm ${
                isLiked ? 'text-primary' : 'text-gray-400'
              } hover:text-primary transition-colors`}
            >
              <FiHeart className={isLiked ? 'fill-primary' : ''} />
              <span>{likes}</span>
            </button>
            <button
              onClick={handleCommentClick}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-primary transition-colors"
            >
              <FiMessageCircle />
              <span>{blog.comments?.length || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
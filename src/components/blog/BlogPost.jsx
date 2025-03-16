import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiMessageCircle, FiEdit2, FiTrash2, FiSend } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { blogService, commentService } from '../../services/api';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const commentsRef = useRef(null);
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogAndComments();
  }, [id]);

  useEffect(() => {
    // Scroll to comments if requested
    if (location.state?.scrollToComments && commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state, loading]);

  const fetchBlogAndComments = async () => {
    try {
      setLoading(true);
      const blogData = await blogService.getBlogById(id);
      setBlog(blogData);
      
      // Handle likes for default blogs
      if (id.startsWith('default-')) {
        setLikes(parseInt(localStorage.getItem(`${id}_likes`) || '0'));
        setIsLiked(JSON.parse(localStorage.getItem('likedBlogs') || '[]').includes(id));
      } else {
        setLikes(blogData.likes || 0);
        setIsLiked(blogData.isLiked || false);
      }

      const commentsData = await commentService.getComments(id);
      setComments(commentsData);
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await blogService.likeBlog(id);
      setLikes(response.likes);
      setIsLiked(response.isLiked);
    } catch (err) {
      console.error('Error liking blog:', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await blogService.deleteBlog(id);
      navigate('/blog');
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!newComment.trim()) return;

    try {
      const commentData = {
        content: newComment.trim(),
        author: {
          _id: user?._id || 'guest',
          name: user?.name || 'Guest',
          avatar: user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Guest')}`
        }
      };
      
      const response = await commentService.addComment(id, commentData);
      setComments(prevComments => [response, ...prevComments]);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      if (id.startsWith('default-')) {
        const updatedComments = comments.filter(comment => comment._id !== commentId);
        localStorage.setItem(`${id}_comments`, JSON.stringify(updatedComments));
        setComments(updatedComments);
      } else {
        await commentService.deleteComment(commentId);
        setComments(comments.filter(comment => comment._id !== commentId));
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const handleLikeComment = async (commentId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await commentService.likeComment(commentId);
      setComments(prevComments => prevComments.map(comment => 
        comment._id === commentId 
          ? { ...comment, likes: response.likes, isLiked: response.isLiked }
          : comment
      ));
    } catch (err) {
      console.error('Error liking comment:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error || 'Blog post not found'}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Cover Image */}
        <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
          <img
            src={blog.coverImage || 'https://source.unsplash.com/random/1200x600?tech'}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Blog Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">{blog.title}</h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={blog.author.avatar || `https://ui-avatars.com/api/?name=${blog.author.name}`}
                alt={blog.author.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-white font-medium">{blog.author.name}</p>
                <p className="text-gray-400 text-sm">
                  {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>

            {user && blog.author._id === user._id && (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(`/blog/edit/${id}`)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiEdit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Blog Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>

        {/* Engagement */}
        <div className="flex items-center gap-6 py-6 border-t border-b border-primary/10">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 text-lg ${
              isLiked ? 'text-primary' : 'text-gray-400 hover:text-primary'
            }`}
          >
            <FiHeart
              className={isLiked ? 'fill-primary' : ''}
            />
            {likes}
          </button>
          <div className="flex items-center gap-2 text-lg text-gray-400">
            <FiMessageCircle />
            {comments.length}
          </div>
        </div>

        {/* Comments Section */}
        <div ref={commentsRef} className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Comments</h2>

          {/* Comment Form */}
          {user ? (
            <form onSubmit={handleComment} className="mb-8">
              <div className="flex gap-4">
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full px-4 py-2 bg-dark-800 border border-primary/10 rounded-lg focus:outline-none focus:border-primary/30 text-white resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="btn-primary flex items-center gap-2"
                    >
                      <FiSend />
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <p className="text-gray-400 mb-8">
              Please{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-primary hover:underline"
              >
                login
              </button>{' '}
              to leave a comment.
            </p>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="flex gap-4 p-4 bg-dark-800/50 rounded-lg"
              >
                <img
                  src={
                    comment.author.avatar ||
                    `https://ui-avatars.com/api/?name=${comment.author.name}`
                  }
                  alt={comment.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-white font-medium">
                        {comment.author.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    {user && comment.author._id === user._id && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-300 mb-2">{comment.content}</p>
                  <button
                    onClick={() => handleLikeComment(comment._id)}
                    className={`flex items-center gap-1 text-sm ${
                      comment.isLiked ? 'text-primary' : 'text-gray-400 hover:text-primary'
                    }`}
                  >
                    <FiHeart
                      className={
                        comment.isLiked ? 'fill-primary' : ''
                      }
                    />
                    {comment.likes || 0}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
} 
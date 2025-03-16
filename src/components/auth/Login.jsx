import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(formData);
      navigate('/blog');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 p-8 bg-dark-900/50 rounded-xl backdrop-blur-lg border border-primary/10"
      >
        <div>
          <h2 className="text-3xl font-bold text-center text-white">Welcome Back</h2>
          <p className="mt-2 text-center text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:text-primary/80">
              Register
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 bg-dark-800/50 border border-primary/10 rounded-lg focus:outline-none focus:border-primary/30 text-white"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 bg-dark-800/50 border border-primary/10 rounded-lg focus:outline-none focus:border-primary/30 text-white"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-3 rounded-lg transition-all duration-300"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login; 
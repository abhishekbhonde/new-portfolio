import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { name, email, password } = formData;
      await register({ name, email, password });
      navigate('/blog');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
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
          <h2 className="text-3xl font-bold text-center text-white">Create Account</h2>
          <p className="mt-2 text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary/80">
              Login
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-gray-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 bg-dark-800/50 border border-primary/10 rounded-lg focus:outline-none focus:border-primary/30 text-white"
                placeholder="Enter your name"
              />
            </div>

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

            <div>
              <label htmlFor="confirmPassword" className="text-gray-300">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 bg-dark-800/50 border border-primary/10 rounded-lg focus:outline-none focus:border-primary/30 text-white"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-3 rounded-lg transition-all duration-300"
          >
            Create Account
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register; 
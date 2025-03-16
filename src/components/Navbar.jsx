import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const MENU_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/learning', label: 'Learning' },
  { path: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-lg border-b border-primary/10">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/5 to-primary/10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 0%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ backgroundSize: "200% 100%" }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${i % 2 + 1} h-${i % 2 + 1} rounded-full bg-primary/20`}
            animate={{
              x: [
                Math.sin(i * 45) * 20,
                Math.sin((i + 2) * 45) * 20,
                Math.sin(i * 45) * 20
              ],
              y: [
                Math.cos(i * 45) * 20,
                Math.cos((i + 2) * 45) * 20,
                Math.cos(i * 45) * 20
              ],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              top: `${20 + i * 10}%`,
              left: `${10 + i * 15}%`
            }}
          />
        ))}

        {/* Animated lines */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              style={{
                width: `${100 + i * 50}px`,
                top: `${30 + i * 20}%`,
                left: `${20 + i * 25}%`
              }}
              animate={{
                rotate: [0, 180, 0],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.1, 0.3, 0.1],
                x: [-50, 50, -50]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Pulsing circles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/10"
            style={{
              width: `${100 + i * 40}px`,
              height: `${100 + i * 40}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              borderWidth: ['1px', '2px', '1px']
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}

        {/* Glowing orbs */}
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-primary/5 to-purple-500/5 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [-20, 20, -20],
            y: [-10, 10, -10]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '30%', right: '20%' }}
        />

        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-dark-900/40 backdrop-blur-[1px]"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 ml-6">
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ 
                rotate: 360,
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              className="text-2xl hover:text-primary"
            >
              🚀
            </motion.div>
            <motion.span 
              className="text-xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Abhishek Bhonde
            </motion.span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:text-white hover:bg-dark-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">{user.name}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-dark-800"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-2 space-y-1">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:text-white hover:bg-dark-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <div className="space-y-1 pt-2 border-t border-primary/10">
                <div className="px-3 py-2 text-gray-300">{user.name}</div>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 mt-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </nav>
  );
} 
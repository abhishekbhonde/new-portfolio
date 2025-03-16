import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SnowEffect from './SnowEffect';

export default function Hero() {
  return (
    <>
      <SnowEffect />
      <section className="min-h-screen flex flex-col justify-center pt-16 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950"></div>
        
        {/* Animated background dots */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-2 h-2 bg-primary rounded-full animate-pulse" style={{ top: '20%', left: '10%' }}></div>
          <div className="absolute w-2 h-2 bg-primary rounded-full animate-pulse" style={{ top: '60%', left: '80%' }}></div>
          <div className="absolute w-2 h-2 bg-primary rounded-full animate-pulse" style={{ top: '80%', left: '30%' }}></div>
          <div className="absolute w-2 h-2 bg-primary rounded-full animate-pulse" style={{ top: '40%', left: '60%' }}></div>
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-left px-4"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-primary">Abhishek Bhonde</span>
            </motion.h1>
            
            <motion.div 
              className="prose prose-invert max-w-2xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-xl text-gray-300 mb-6">
                Full Stack Engineer focused on building products with extra attention to detail
              </p>
              <p className="text-lg text-gray-400">
                Pune, Maharashtra, India
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-8"
            >
              <Link 
                to="/about" 
                className="btn-primary w-full sm:w-auto text-center"
              >
                About Me
              </Link>
              <Link 
                to="/projects" 
                className="btn-secondary w-full sm:w-auto text-center"
              >
                View Projects
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience & Skills Section */}
      <section className="py-20 relative">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto px-4"
          >
            <h2 className="text-4xl font-bold mb-12 text-primary">Experience & Skills</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: 2,
                  boxShadow: "0 0 20px rgba(79, 70, 229, 0.3)"
                }}
                transition={{ duration: 0.3 }}
                className="glass-effect p-6 rounded-lg cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-4 text-primary">Full Stack Development</h3>
                <p className="text-gray-400">TypeScript, React, Node.js, Express.js, Next.js, and modern web technologies.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: -2,
                  boxShadow: "0 0 20px rgba(79, 70, 229, 0.3)"
                }}
                transition={{ duration: 0.3 }}
                className="glass-effect p-6 rounded-lg cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-4 text-primary">Database Management</h3>
                <p className="text-gray-400">Experienced with MySQL, MongoDB, and database optimization techniques.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: -2,
                  boxShadow: "0 0 20px rgba(79, 70, 229, 0.3)"
                }}
                transition={{ duration: 0.3 }}
                className="glass-effect p-6 rounded-lg cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-4 text-primary">UI/UX Design</h3>
                <p className="text-gray-400">Proficient in Tailwind CSS, responsive design, and creating engaging user interfaces.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: 2,
                  boxShadow: "0 0 20px rgba(79, 70, 229, 0.3)"
                }}
                transition={{ duration: 0.3 }}
                className="glass-effect p-6 rounded-lg cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-4 text-primary">DevOps Foundation</h3>
                <p className="text-gray-400">Basic understanding of deployment, version control, and development workflows.</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 glass-effect p-8 rounded-lg"
            >
              <p className="text-gray-300">Currently pursuing my Bachelor's Degree in Computer Science at Savitribai Phule Pune University (2021-2025), while actively working on various full-stack development projects.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Funny Quote Section */}
      <section className="py-12 relative">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.02,
              rotate: [0, -2, 2, -2, 0],
              transition: { duration: 0.5, repeat: Infinity }
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-center glass-effect p-8 rounded-xl cursor-pointer"
          >
            <div className="text-6xl mb-6">👨‍💻</div>
            <p className="text-xl text-gray-300 italic mb-4">
              "There are only two hard things in Computer Science: cache invalidation, naming things, and off-by-one errors."
            </p>
            <p className="text-primary text-sm">- Every Developer Ever</p>
          </motion.div>
        </div>
      </section>

      {/* Developer Life Section */}
      <section className="py-16 relative">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary mb-4">Developer Life Be Like</h2>
            <p className="text-gray-400">Some days you're the debugger, some days you're the bug</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                boxShadow: "0 20px 30px rgba(79, 70, 229, 0.2)"
              }}
              transition={{ duration: 0.3 }}
              className="glass-effect p-6 rounded-xl cursor-pointer"
            >
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-gray-300 text-lg mb-2">"My code works and I have no idea why"</p>
              <p className="text-primary text-sm">- Every Junior Dev</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                boxShadow: "0 20px 30px rgba(79, 70, 229, 0.2)"
              }}
              transition={{ duration: 0.3 }}
              className="glass-effect p-6 rounded-xl cursor-pointer"
            >
              <div className="text-6xl mb-4">💻</div>
              <p className="text-gray-300 text-lg mb-2">"It works on my machine!"</p>
              <p className="text-primary text-sm">- Developer's Famous Last Words</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                boxShadow: "0 20px 30px rgba(79, 70, 229, 0.2)"
              }}
              transition={{ duration: 0.3 }}
              className="glass-effect p-6 rounded-xl cursor-pointer"
            >
              <div className="text-6xl mb-4">🐛</div>
              <p className="text-gray-300 text-lg mb-2">"When the bug appears in production"</p>
              <p className="text-primary text-sm">- DevOps Nightmare</p>
            </motion.div>
          </div>

          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "rgba(79, 70, 229, 0.1)",
              transition: { duration: 0.3 }
            }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-2xl mx-auto mt-16 glass-effect p-8 rounded-xl cursor-pointer"
          >
            <h3 className="text-xl font-bold text-primary mb-6">Developer Fun Facts</h3>
            <ul className="space-y-4 text-left">
              <li className="flex items-center text-gray-300">
                <span className="text-2xl mr-4">🍕</span>
                "The average developer's blood type is C++"
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-2xl mr-4">☕</span>
                "Coffee to Code Converter"
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-2xl mr-4">🐛</span>
                "I don't always test my code, but when I do, I do it in production"
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Anime Section */}
      <section className="py-16 relative">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto glass-effect p-8 rounded-xl text-center"
          >
            <h2 className="text-3xl font-bold text-primary mb-6">Why I Love Anime</h2>
            <div className="mb-8">
              <div className="text-8xl mb-6">🎭</div>
              <p className="text-gray-300 text-lg leading-relaxed">
                Just as anime characters push beyond their limits to achieve their dreams, 
                I bring that same passion and determination to my code. The creativity, 
                storytelling, and relentless pursuit of improvement in anime inspire my 
                approach to software development - always striving to create something 
                extraordinary.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
} 
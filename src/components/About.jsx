import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">About</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-gray-300">
                As a Full Stack Developer with foundational DevOps skills, I am skilled in TypeScript, React, Node.js, Express.js, and Next.js. I am currently a final-year student, balancing academic commitments with practical development experience.
              </p>
              <p className="text-gray-300">
                My background includes hands-on projects that bridge theoretical knowledge with real-world applications. I've worked on various projects ranging from web applications to payment systems.
              </p>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-primary mb-6">Work Experience</h3>
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="glass-effect p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-medium text-primary">Software Engineer</h4>
                      <span className="text-sm text-primary/80 bg-primary/10 px-3 py-1 rounded-full">2024 - Present</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <span className="text-gray-400">RefactorQ</span>
                      <span className="mx-2 text-gray-600">•</span>
                      <span className="text-gray-400">Hybrid</span>
                    </div>
                    <p className="text-gray-300 mt-2 leading-relaxed">
                      Currently working on multiple international projects, including solutions for clients in the US, UK, and South Africa. Key responsibilities include developing and maintaining the company's internal CRM system and contributing to 3-4 concurrent client projects. Technologies: React, TypeScript, Node.js, and modern web development tools.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="glass-effect p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-medium text-primary">Full Stack Developer Intern</h4>
                      <span className="text-sm text-primary/80 bg-primary/10 px-3 py-1 rounded-full">Nov 2024 - Jan 2025</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <span className="text-gray-400">Adstory</span>
                      <span className="mx-2 text-gray-600">•</span>
                      <span className="text-gray-400">Remote</span>
                    </div>
                    <p className="text-gray-300 mt-2 leading-relaxed">
                      Created and launched an engaging website using modern tools like React.js, JavaScript, and Tailwind CSS. The site offers dynamic features and smooth user experiences, owing to careful planning and execution during development and deployment.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Education</h3>
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-200">Bachelor's Degree in Computer Science</h4>
                  <p className="text-gray-400">Savitribai Phule Pune University • 2021 - 2025</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Technical Skills</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-200">Frontend</h4>
                    <ul className="text-gray-400">
                      <li>JavaScript</li>
                      <li>TypeScript</li>
                      <li>React/Next.js</li>
                      <li>TailwindCSS</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-200">Backend</h4>
                    <ul className="text-gray-400">
                      <li>Node.js</li>
                      <li>Express.js</li>
                      <li>MySQL</li>
                      <li>MongoDB</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-200">DevOps</h4>
                    <ul className="text-gray-400">
                      <li>Git/GitHub Actions</li>
                      <li>Docker</li>
                      <li>Jenkins</li>
                      <li>Kubernetes</li>
                      <li>AWS Basics</li> 
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
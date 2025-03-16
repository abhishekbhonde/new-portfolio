import { motion } from 'framer-motion';

const projects = [
  {
    title: 'InteractAI',
    description: 'A platform designed to assist with information, creativity, and conversation through natural language processing.',
    techStack: ['Javascript', 'React.js', 'Vite', 'Node.js', 'MongoDB', 'OpenAPI'],
    type: 'Side Project',
    github: 'https://github.com/abhishekbhonde/InteractAI',
    live: 'https://interact-ai.vercel.app'
  },
  {
    title: 'Payment Virtual Money Wallet',
    description: 'A platform to transfer money between users smoothlessly.',
    techStack: ['Javascript', 'React.js', 'Vite', 'Node.js', 'MongoDB'],
    type: 'Side Project',
    github: 'https://github.com/abhishekbhonde/money-wallet'
  },
  {
    title: 'Blogging Website',
    description: 'A platform where users can express their thoughts.',
    techStack: ['Javascript', 'React.js', 'Node.js', 'MySQL'],
    type: 'Side Project',
    github: 'https://github.com/abhishekbhonde/blog-website'
  },
  {
    title: 'Github ACM RSCOE',
    description: 'A session was conducted for students on github by me.',
    techStack: ['React.js', 'TailwindCSS'],
    type: 'College Project',
    github: 'https://github.com/abhishekbhonde/github-acm'
  },
  {
    title: 'ACM RSCOE',
    description: 'Platform for showcasing events that are happened in college.',
    techStack: ['React.js', 'CSS'],
    type: 'College Club Project',
    github: 'https://github.com/abhishekbhonde/acm-rscoe',
    live: 'https://acm-rscoe.vercel.app'
  },
  {
    title: 'Allen Website',
    description: 'Clone of allen website - developed for the practice.',
    techStack: ['React.js', 'CSS'],
    type: 'College Club Project',
    github: 'https://github.com/abhishekbhonde/allen-website'
  },
  {
    title: 'Eth-Sol-web-Based-Wallet',
    description: 'Ethereum and solana based wallet project.',
    techStack: ['React.js', 'TailwindCSS', 'Solana', 'Ethereum'],
    type: 'College Club Project',
    github: 'https://github.com/abhishekbhonde/eth-sol-wallet'
  },
  {
    title: 'Blockchain Miner',
    description: 'A blockchain miner is a participant in a decentralized network who uses computational power to validate and add transactions to the blockchain, earning rewards in the process.',
    techStack: ['React.js', 'TailwindCSS', 'Solana', 'Ethereum'],
    type: 'College Club Project',
    github: 'https://github.com/abhishekbhonde/blockchain-miner'
  },
];

export default function Projects() {
  return (
    <section className="py-20 relative min-h-screen">
      {/* Background gradient and effects */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950"></div> */}
      {/* <div className="absolute inset-0 opacity-5">
        <div className="absolute w-1/3 h-1/3 bg-primary/30 rounded-full blur-[100px] top-0 -left-20"></div>
        <div className="absolute w-1/3 h-1/3 bg-primary/20 rounded-full blur-[100px] bottom-0 -right-20"></div>
      </div> */}

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto px-4"
        >
          <h2 className="section-title mb-12">Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="project-card group"
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon-link"
                          title="View Source Code"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon-link"
                          title="View Live Demo"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 mb-6 flex-grow">
                    {project.description}
                  </p>
                  <div>
                    <div className="mb-4">
                      <span className="text-sm text-primary/80 font-medium">{project.type}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(tech => (
                        <span key={tech} className="skill-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
import { motion } from 'framer-motion';

const learningTopics = [
  {
    category: 'Backend Systems',
    topics: [
      {
        title: 'Advanced Authentication',
        description: 'Exploring OAuth 2.0, JWT, and multi-factor authentication implementations.',
        resources: ['Auth0 Documentation', 'OAuth 2.0 Simplified'],
      },
      {
        title: 'API Architecture',
        description: 'Studying RESTful and GraphQL API design patterns and best practices.',
        resources: ['REST API Design Rulebook', 'GraphQL Documentation'],
      },
    ],
  },
  {
    category: 'Web3',
    topics: [
      {
        title: 'Smart Contract Development',
        description: 'Learning Solidity patterns and security best practices.',
        resources: ['Ethereum Documentation', 'OpenZeppelin Guides'],
      },
      {
        title: 'Decentralized Systems',
        description: 'Understanding blockchain consensus mechanisms and distributed systems.',
        resources: ['Blockchain Basics', 'Distributed Systems Principles'],
      },
    ],
  },
  {
    category: 'AI/ML',
    topics: [
      {
        title: 'Neural Networks',
        description: 'Studying deep learning architectures and their applications.',
        resources: ['Deep Learning Book', 'PyTorch Tutorials'],
      },
      {
        title: 'Machine Learning Operations',
        description: 'Learning MLOps practices and deployment strategies.',
        resources: ['MLOps Guide', 'TensorFlow Extended'],
      },
    ],
  },
  {
    category: 'Philosophy',
    topics: [
      {
        title: 'Nietzsche\'s Philosophy',
        description: 'Exploring concepts of will to power and eternal recurrence.',
        resources: ['Beyond Good and Evil', 'Thus Spoke Zarathustra'],
      },
      {
        title: 'Philosophy of Mind',
        description: 'Understanding consciousness and artificial intelligence.',
        resources: ['The Conscious Mind', 'Philosophy of AI'],
      },
    ],
  },
];

export default function Learning() {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Current Learning Journey</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {learningTopics.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark-800 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-primary mb-4">
                  {category.category}
                </h3>
                <div className="space-y-6">
                  {category.topics.map((topic, topicIndex) => (
                    <div key={topic.title} className="space-y-2">
                      <h4 className="text-lg font-medium text-gray-200">
                        {topic.title}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {topic.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {topic.resources.map((resource) => (
                          <span
                            key={resource}
                            className="text-xs text-primary bg-dark-700 px-2 py-1 rounded-full"
                          >
                            {resource}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Error interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

const DEFAULT_BLOGS = [
  {
    _id: 'default-1',
    title: 'Getting Started with Web Development',
    content: `# Getting Started with Web Development 🚀

![Web Development Journey](https://source.unsplash.com/random/800x400?coding)

Are you ready to embark on an exciting journey into web development? Whether you're a complete beginner or looking to expand your knowledge, this comprehensive guide will help you understand the fundamentals and set you on the right path.

## 📚 The Three Core Technologies

### 1. HTML - The Structure 🏗️
HTML forms the foundation of every website. Think of it as the skeleton of your web pages.

**Key Concepts:**
- Semantic elements (\`<header>\`, \`<nav>\`, \`<main>\`, \`<footer>\`)
- Content hierarchy (\`<h1>\` to \`<h6>\`)
- Lists and tables
- Forms and input elements
- Multimedia elements

**Example:**
\`\`\`html
<article class="blog-post">
  <h1>Welcome to Web Development</h1>
  <p>This is your first step into a larger world.</p>
</article>
\`\`\`

### 2. CSS - The Style 🎨
CSS transforms plain HTML into visually appealing designs.

**Modern CSS Features:**
- Flexbox and Grid layouts
- Responsive design
- CSS Variables
- Animations and transitions
- Media queries

**Example:**
\`\`\`css
.blog-post {
  display: flex;
  padding: 2rem;
  background: linear-gradient(to right, #2193b0, #6dd5ed);
  border-radius: 8px;
}
\`\`\`

### 3. JavaScript - The Behavior ⚡
JavaScript brings interactivity and dynamic functionality to your websites.

**Core Concepts:**
- DOM manipulation
- Event handling
- API integration
- Modern ES6+ features
- Async programming

**Example:**
\`\`\`javascript
document.querySelector('.blog-post').addEventListener('click', () => {
  console.log('Blog post clicked!');
});
\`\`\`

## 🛠️ Essential Development Tools

### Code Editors
1. **VS Code**
   - Rich extension ecosystem
   - Integrated terminal
   - Git integration

2. **Sublime Text**
   - Fast and lightweight
   - Powerful search features
   - Custom builds

3. **WebStorm**
   - Full IDE features
   - Advanced debugging
   - Built-in tools

### Version Control
- Git basics
- GitHub workflow
- Branching strategies
- Collaboration features

### Browser Tools
- Chrome DevTools
- Firefox Developer Edition
- Performance monitoring
- Debugging capabilities

## 📝 Learning Path Recommendations

1. **Foundation (Month 1-2)**
   - HTML structure
   - CSS basics
   - JavaScript fundamentals

2. **Intermediate (Month 3-4)**
   - Responsive design
   - CSS frameworks
   - DOM manipulation

3. **Advanced (Month 5-6)**
   - Modern JavaScript
   - Frontend frameworks
   - API integration

## ✨ Best Practices

### Code Quality
- Write clean, readable code
- Use consistent formatting
- Follow naming conventions
- Comment when necessary

### Performance
- Optimize images
- Minimize HTTP requests
- Use lazy loading
- Implement caching

### Security
- Validate user input
- Implement HTTPS
- Follow OWASP guidelines
- Regular security audits

## 📚 Learning Resources

### Online Platforms
1. **freeCodeCamp**
   - Interactive lessons
   - Real projects
   - Active community

2. **MDN Web Docs**
   - Comprehensive documentation
   - Tutorials and guides
   - Best practices

3. **Frontend Mentor**
   - Real-world projects
   - Professional designs
   - Community feedback

### YouTube Channels
- Traversy Media
- Web Dev Simplified
- Kevin Powell
- The Net Ninja

## 🎯 Next Steps

1. Set up your development environment
2. Create your first HTML page
3. Style it with CSS
4. Add JavaScript functionality
5. Build a portfolio project
6. Join developer communities

Remember: Web development is a journey, not a destination. Take it step by step, practice regularly, and don't be afraid to make mistakes. The most important thing is to keep coding and building projects.

Happy coding! 🚀`,
    coverImage: 'https://source.unsplash.com/random/800x400?coding',
    author: {
      _id: 'default-author',
      name: 'Abhishek Bhonde',
      avatar: 'https://github.com/abhishekbhonde.png'
    },
    tags: ['Web Development', 'Programming', 'Beginners', 'HTML', 'CSS', 'JavaScript'],
    createdAt: new Date('2024-01-01').toISOString(),
    likes: 0,
    comments: []
  },
  {
    _id: 'default-2',
    title: 'Understanding Modern JavaScript Features',
    content: `# Understanding Modern JavaScript Features 🚀

![Modern JavaScript](https://source.unsplash.com/random/800x400?javascript)

Modern JavaScript (ES6+) has revolutionized how we write code. Let's dive deep into the powerful features that make JavaScript development more efficient and enjoyable.

## 🎯 Core Modern Features

### Arrow Functions ➡️
Transform traditional functions into concise, readable expressions.

**Traditional vs Arrow:**
\`\`\`javascript
// Traditional
function greet(name) {
  return \`Hello, ${name}!\`;
}

// Arrow
const greet = name => \`Hello, ${name}!\`;

// With multiple parameters
const add = (a, b) => a + b;

// With function body
const calculate = (a, b) => {
  const result = a * b;
  return result * 2;
};
\`\`\`

### Template Literals 📝
Write multiline strings and embed expressions elegantly.

\`\`\`javascript

### Destructuring 📦
Extract values from objects and arrays effortlessly.

\`\`\`javascript
// Object Destructuring
const person = {
  name: 'Alice',
  age: 25,
  location: 'New York'
};

const { name, age, location: city } = person;

// Array Destructuring
const coordinates = [10, 20, 30];
const [x, y, z] = coordinates;

// With default values
const [first = 1, second = 2] = [10];
\`\`\`

### Spread and Rest Operators ...
Powerful tools for working with arrays and objects.

\`\`\`javascript
// Spread in arrays
const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5]; // [1, 2, 3, 4, 5]

// Spread in objects
const baseConfig = { api: 'http://api.example.com', timeout: 5000 };
const finalConfig = {
  ...baseConfig,
  debug: true
};

// Rest parameters
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
console.log(sum(1, 2, 3, 4)); // 10
\`\`\`

## 🔄 Async Programming

### Async/Await
Write asynchronous code that looks and behaves like synchronous code.

\`\`\`javascript
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`/api/users/\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Using async/await with array methods
const fetchAllUsers = async (userIds) => {
  const users = await Promise.all(
    userIds.map(id => fetchUserData(id))
  );
  return users;
};
\`\`\`

### Optional Chaining ?.
Safely access nested object properties.

\`\`\`javascript
const user = {
  profile: {
    address: {
      street: 'Main St'
    }
  }
};

// Safe property access
const zipCode = user?.profile?.address?.zipCode; // undefined

// With method calls
const userAdmin = user?.admin?.(); // undefined
\`\`\`

## 🛠️ Modern JavaScript Best Practices

### 1. Variable Declarations
\`\`\`javascript
// Use const by default
const API_URL = 'https://api.example.com';

// Use let for values that will change
let count = 0;

// Avoid var
// ❌ var x = 10;
\`\`\`

### 2. Function Best Practices
\`\`\`javascript
// Pure functions
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// Default parameters
const createUser = (name, role = 'user') => {
  return { name, role };
};
\`\`\`

### 3. Module System
\`\`\`javascript
// Named exports
export const helper = () => {};
export const utility = () => {};

// Default export
export default class MainComponent {}

// Import
import MainComponent, { helper, utility } from './module';
\`\`\`

## 🔧 Development Tools

### Essential Tools
1. **Package Managers**
   - npm
   - yarn
   - pnpm

2. **Build Tools**
   - Webpack
   - Vite
   - Rollup

3. **Code Quality**
   - ESLint
   - Prettier
   - TypeScript

## 📈 Performance Tips

1. **Code Splitting**
\`\`\`javascript
// Dynamic imports
const MyComponent = () => {
  import('./heavy-module').then(module => {
    // Use module
  });
};
\`\`\`

2. **Optimization**
\`\`\`javascript
// Use memoization
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
\`\`\`

## 🎯 Next Steps

1. Practice these features regularly
2. Build real-world projects
3. Contribute to open source
4. Stay updated with new features
5. Join JavaScript communities

Remember: Modern JavaScript is constantly evolving. Keep learning, stay curious, and always write clean, maintainable code.

Happy coding! 🚀`,
    coverImage: 'https://source.unsplash.com/random/800x400?javascript',
    author: {
      _id: 'default-author',
      name: 'Abhishek Bhonde',
      avatar: 'https://github.com/abhishekbhonde.png'
    },
    tags: ['JavaScript', 'ES6', 'Programming', 'Web Development', 'Modern JS'],
    createdAt: new Date('2024-01-02').toISOString(),
    likes: 0,
    comments: []
  }
];

// Auth Service
export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response;
  },
};

// Blog Service
export const blogService = {
  getAllBlogs: async (page = 1, limit = 10, filters = {}) => {
    try {
      const response = await api.get('/blogs', {
        params: { page, limit, ...filters },
      });
      return {
        blogs: response.blogs || [],
        total: response.total,
        hasMore: response.hasMore,
      };
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return { blogs: [], total: 0, hasMore: false };
    }
  },

  getBlogById: async (id) => {
    try {
      // Handle default blog posts
      if (id.startsWith('default-')) {
        const defaultBlog = DEFAULT_BLOGS.find(blog => blog._id === id);
        if (!defaultBlog) {
          throw new Error('Blog not found');
        }
        
        // Add likes from localStorage
        const likes = parseInt(localStorage.getItem(`${id}_likes`) || '0');
        const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
        
        return {
          ...defaultBlog,
          likes,
          isLiked: likedBlogs.includes(id)
        };
      }
      
      // Handle dynamic blog posts
      const response = await api.get(`/blogs/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching blog:', error);
      throw error;
    }
  },

  createBlog: async (blogData) => {
    const formData = new FormData();
    Object.keys(blogData).forEach(key => {
      if (key === 'tags') {
        formData.append(key, JSON.stringify(blogData[key]));
      } else if (key === 'coverImage' && blogData[key]) {
        formData.append(key, blogData[key]);
      } else {
        formData.append(key, blogData[key]);
      }
    });

    const response = await api.post('/blogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  updateBlog: async (id, blogData) => {
    const formData = new FormData();
    Object.keys(blogData).forEach(key => {
      if (key === 'tags') {
        formData.append(key, JSON.stringify(blogData[key]));
      } else if (key === 'coverImage' && blogData[key]) {
        formData.append(key, blogData[key]);
      } else {
        formData.append(key, blogData[key]);
      }
    });

    const response = await api.put(`/blogs/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  deleteBlog: async (id) => {
    const response = await api.delete(`/blogs/${id}`);
    return response;
  },

  likeBlog: async (blogId) => {
    try {
      // Handle default blog likes locally
      if (blogId.startsWith('default-')) {
        const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
        const isLiked = likedBlogs.includes(blogId);
        
        if (isLiked) {
          // Unlike
          const updatedLikedBlogs = likedBlogs.filter(id => id !== blogId);
          localStorage.setItem('likedBlogs', JSON.stringify(updatedLikedBlogs));
          return { likes: parseInt(localStorage.getItem(`${blogId}_likes`) || '0') - 1, isLiked: false };
        } else {
          // Like
          likedBlogs.push(blogId);
          localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));
          const currentLikes = parseInt(localStorage.getItem(`${blogId}_likes`) || '0');
          localStorage.setItem(`${blogId}_likes`, currentLikes + 1);
          return { likes: currentLikes + 1, isLiked: true };
        }
      }
      
      // Handle dynamic blog likes via API
      const response = await api.post(`/blogs/${blogId}/like`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  },
};

// Comment Service
export const commentService = {
  getComments: async (blogId) => {
    try {
      // Handle default blog comments
      if (blogId.startsWith('default-')) {
        const comments = JSON.parse(localStorage.getItem(`${blogId}_comments`) || '[]');
        return comments;
      }
      
      // Handle dynamic blog comments
      const response = await api.get(`/comments/blog/${blogId}`);
      return response;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  },

  addComment: async (blogId, commentData) => {
    try {
      // Handle default blog comments
      if (blogId.startsWith('default-')) {
        const comments = JSON.parse(localStorage.getItem(`${blogId}_comments`) || '[]');
        const newComment = {
          _id: `${blogId}-comment-${Date.now()}`,
          content: commentData.content,
          author: {
            _id: commentData.author?._id || 'guest',
            name: commentData.author?.name || 'Guest',
            avatar: commentData.author?.avatar || `https://ui-avatars.com/api/?name=Guest`
          },
          createdAt: new Date().toISOString(),
          likes: 0,
          isLiked: false
        };
        
        comments.unshift(newComment);
        localStorage.setItem(`${blogId}_comments`, JSON.stringify(comments));
        return newComment;
      }
      
      // Handle dynamic blog comments
      const response = await api.post(`/comments/blog/${blogId}`, commentData);
      return response;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },

  updateComment: async (id, commentData) => {
    const response = await api.put(`/comments/${id}`, commentData);
    return response;
  },

  deleteComment: async (id) => {
    const response = await api.delete(`/comments/${id}`);
    return response;
  },

  likeComment: async (id) => {
    try {
      // Extract blog ID from comment ID (format: 'default-1-comment-timestamp')
      const blogId = id.split('-comment-')[0];
      
      // Check if this is a default blog comment
      if (blogId.startsWith('default-')) {
        const comments = JSON.parse(localStorage.getItem(`${blogId}_comments`) || '[]');
        const updatedComments = comments.map(comment => {
          if (comment._id === id) {
            return {
              ...comment,
              likes: (comment.likes || 0) + (comment.isLiked ? -1 : 1),
              isLiked: !comment.isLiked
            };
          }
          return comment;
        });
        
        localStorage.setItem(`${blogId}_comments`, JSON.stringify(updatedComments));
        const updatedComment = updatedComments.find(comment => comment._id === id);
        return updatedComment ? { 
          likes: updatedComment.likes, 
          isLiked: updatedComment.isLiked 
        } : { likes: 0, isLiked: false };
      }

      // Handle dynamic blog comments
      const response = await api.post(`/comments/${id}/like`);
      return response;
    } catch (error) {
      console.error('Error liking comment:', error);
      throw error;
    }
  },
}; 
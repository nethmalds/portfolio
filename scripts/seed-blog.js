// Script to seed the database with sample blog posts
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Blog Post Schema (copy from the model)
const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Please enter a valid slug'],
      sparse: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      maxlength: [300, 'Excerpt cannot exceed 300 characters'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    published: {
      type: Boolean,
      default: false,
    },
    featuredImage: {
      type: String,
      trim: true,
    },
    readTime: {
      type: Number,
      min: [1, 'Read time must be at least 1 minute'],
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);

const samplePosts = [
  {
    title: "Building Modern Web Apps in 2024: A Complete Guide",
    content: `# Building Modern Web Apps in 2024: A Complete Guide

The landscape of web development continues to evolve at a rapid pace. With new frameworks, tools, and paradigms emerging regularly, it can be challenging to keep up with the latest best practices.

## The React Ecosystem in 2024

React 18 brought significant improvements to the ecosystem, particularly with the introduction of:

### Server Components
Server Components allow us to render parts of our application on the server, reducing bundle sizes and improving performance.

### Concurrent Features
React's concurrent features provide better user experiences through:
- Automatic batching for better performance
- Suspense for data fetching
- startTransition for smooth interactions

## Next.js App Router

The App Router represents a fundamental shift in how we build React applications.

## TypeScript Best Practices

Modern TypeScript development focuses on:
- Strict type checking
- Utility types for better reusability
- Template literal types for API safety

## Performance Optimization

Key performance strategies include:
- Bundle analysis and optimization
- Code splitting strategies
- Image optimization
- Proper caching implementation

## Conclusion

Building modern web applications requires staying current with evolving best practices while maintaining focus on user experience and performance.`,
    excerpt: "Explore the latest trends, tools, and best practices for building scalable web applications. From React 18 to server components, here's what you need to know.",
    author: "Alex Chen",
    tags: ["react", "next.js", "web development", "javascript"],
    published: true,
    featuredImage: "/images/blog/modern-web-apps.jpg",
    readTime: 8,
  },
  {
    title: "AI Integration in Web Development: Practical Applications",
    content: `# AI Integration in Web Development: Practical Applications

Artificial Intelligence is transforming how we build and interact with web applications. From chatbots to recommendation systems, AI is becoming an integral part of modern web development.

## Popular AI Integration Patterns

### API-Based Integration
Most AI integrations happen through APIs, allowing developers to leverage powerful AI models without building them from scratch.

### Real-time Processing
Modern applications require real-time AI processing for features like live translation, sentiment analysis, and content moderation.

## Implementation Strategies

When integrating AI into web applications:
- Start with simple use cases
- Focus on user experience
- Plan for scalability
- Consider privacy implications

## Best Practices

- Use progressive enhancement
- Implement proper error handling
- Monitor performance impact
- Ensure accessibility

## Conclusion

AI integration in web development is no longer a luxury but a necessity for competitive applications.`,
    excerpt: "Discover how to integrate AI and machine learning into your web applications. Real-world examples and implementation strategies for developers.",
    author: "Alex Chen",
    tags: ["ai", "machine learning", "api integration", "python"],
    published: true,
    readTime: 12,
  },
  {
    title: "Advanced TypeScript Patterns for Better Code",
    content: `# Advanced TypeScript Patterns for Better Code

TypeScript has evolved significantly, offering powerful features that can dramatically improve code quality and developer experience.

## Utility Types and Advanced Patterns

### Conditional Types
Conditional types allow you to create types that depend on other types.

### Template Literal Types
Template literal types enable type-safe string manipulation.

### Mapped Types
Mapped types let you transform existing types into new ones.

## Design Patterns in TypeScript

### Builder Pattern
The builder pattern is particularly useful in TypeScript for creating complex objects.

### Factory Pattern
Factory patterns help with object creation while maintaining type safety.

## Best Practices

- Use strict mode always
- Leverage utility types
- Create reusable generic types
- Document complex types

## Conclusion

Mastering advanced TypeScript patterns leads to more maintainable and robust applications.`,
    excerpt: "Level up your TypeScript skills with advanced patterns, utility types, and best practices that will make your code more maintainable and type-safe.",
    author: "Alex Chen",
    tags: ["typescript", "javascript", "best practices", "development"],
    published: true,
    readTime: 6,
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing posts
    await BlogPost.deleteMany({});
    console.log('Cleared existing blog posts');

    // Insert sample posts
    const posts = await BlogPost.insertMany(samplePosts);
    console.log(`Inserted ${posts.length} blog posts`);

    console.log('Sample blog posts:');
    posts.forEach(post => {
      console.log(`- ${post.title} (ID: ${post._id})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
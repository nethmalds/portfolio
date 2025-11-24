import { BlogPost } from '@/models';
import connectDB from './mongodb';

// Blog post operations
export const blogService = {
  async create(postData: {
    title: string;
    content: string;
    excerpt: string;
    author: string;
    tags?: string[];
    published?: boolean;
    featuredImage?: string;
    readTime?: number;
  }) {
    await connectDB();
    const post = new BlogPost(postData);
    return await post.save();
  },

  async findBySlug(slug: string) {
    await connectDB();
    return await BlogPost.findOne({ slug });
  },

  async findPublished(limit = 10, skip = 0) {
    await connectDB();
    return await BlogPost.find({ published: true })
      .select('-content -__v')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
  },

  async findAll(filters: any = {}, limit = 10, skip = 0) {
    await connectDB();
    return await BlogPost.find(filters)
      .select('-content -__v')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
  },

  async updateBySlug(slug: string, updateData: any) {
    await connectDB();
    return await BlogPost.findOneAndUpdate(
      { slug },
      updateData,
      { new: true, runValidators: true }
    );
  },

  async deleteBySlug(slug: string) {
    await connectDB();
    return await BlogPost.findOneAndDelete({ slug });
  },

  async incrementViews(slug: string) {
    await connectDB();
    return await BlogPost.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { new: true }
    );
  },

  async getTags() {
    await connectDB();
    const tags = await BlogPost.distinct('tags');
    return tags.filter(tag => tag && tag.trim() !== '');
  },

  async count(filters: any = {}) {
    await connectDB();
    return await BlogPost.countDocuments(filters);
  },
};

// Database utilities
export const dbUtils = {
  async isConnected() {
    try {
      await connectDB();
      return true;
    } catch {
      return false;
    }
  },

  async ping() {
    await connectDB();
    // Simple query to test connection
    return await BlogPost.findOne().limit(1);
  },
};
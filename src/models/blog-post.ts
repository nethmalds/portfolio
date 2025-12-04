import mongoose, { Document, Schema } from "mongoose";

// Blog post interface
export interface IBlogPost extends Document {
	title: string;
	content: string;
	excerpt: string;
	author: string;
	tags: string[];
	published: boolean;
	featuredImage?: string;
	readTime?: number;
	views: number;
	createdAt: Date;
	updatedAt: Date;
}

// Blog post schema
const blogPostSchema = new Schema<IBlogPost>(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
			trim: true,
			maxlength: [200, "Title cannot exceed 200 characters"],
		},
		// slug removed; use MongoDB _id as identifier
		content: {
			type: String,
			required: [true, "Content is required"],
		},
		excerpt: {
			type: String,
			required: [true, "Excerpt is required"],
			maxlength: [300, "Excerpt cannot exceed 300 characters"],
		},
		author: {
			type: String,
			required: [true, "Author is required"],
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
			min: [1, "Read time must be at least 1 minute"],
		},
		views: {
			type: Number,
			default: 0,
			min: 0,
		},
	},
	{
		timestamps: true,
	},
);

// Create indexes
blogPostSchema.index({ published: 1 });
blogPostSchema.index({ tags: 1 });
blogPostSchema.index({ createdAt: -1 });

// Export model
export const BlogPost =
	mongoose.models.BlogPost ||
	mongoose.model<IBlogPost>("BlogPost", blogPostSchema);

export default BlogPost;

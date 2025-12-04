import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { BlogPost } from "@/models";

export async function GET(request: NextRequest) {
	try {
		// Connect to database
		await connectDB();

		// Parse query parameters
		const { searchParams } = new URL(request.url);
		const published = searchParams.get("published");
		const tags = searchParams.get("tags");
		const limit = parseInt(searchParams.get("limit") || "10");
		const page = parseInt(searchParams.get("page") || "1");
		const skip = (page - 1) * limit;

		// Build query
		const query: any = {};

		if (published !== null) {
			query.published = published === "true";
		}

		if (tags) {
			query.tags = { $in: tags.split(",").map((tag) => tag.trim()) };
		}

		// Get blog posts
		const posts = await BlogPost.find(query)
			.select("-content -__v") // Exclude full content for list view
			.sort({ createdAt: -1 })
			.limit(limit)
			.skip(skip);

		// Get total count for pagination
		const total = await BlogPost.countDocuments(query);

		return NextResponse.json({
			message: "Blog posts retrieved successfully",
			data: posts,
			pagination: {
				page,
				limit,
				total,
				pages: Math.ceil(total / limit),
			},
		});
	} catch (error) {
		console.error("Get blog posts error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		// Connect to database
		await connectDB();

		// Parse request body
		const body = await request.json();
		const {
			title,
			content,
			excerpt,
			author,
			tags = [],
			published = false,
			featuredImage,
			readTime,
		} = body;

		// Validate required fields
		if (!title || !content || !excerpt || !author) {
			return NextResponse.json(
				{ error: "Title, content, excerpt, and author are required" },
				{ status: 400 },
			);
		}

		// Create new blog post
		const blogPost = new BlogPost({
			title,
			content,
			excerpt,
			author,
			tags,
			published,
			featuredImage,
			readTime,
		});

		// Save to database
		await blogPost.save();

		return NextResponse.json(
			{
				message: "Blog post created successfully",
				data: blogPost,
			},
			{ status: 201 },
		);
	} catch (error: any) {
		console.error("Create blog post error:", error);

		// Handle duplicate key error (should not occur since slug is removed)
		if (error.code === 11000) {
			return NextResponse.json(
				{ error: "Duplicate key error" },
				{ status: 409 },
			);
		}

		// Handle validation errors
		if (error.name === "ValidationError") {
			const validationErrors = Object.values(error.errors).map(
				(err: any) => err.message,
			);
			return NextResponse.json(
				{ error: "Validation failed", details: validationErrors },
				{ status: 400 },
			);
		}

		// Handle other errors
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

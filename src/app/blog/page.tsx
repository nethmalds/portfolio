import { Metadata } from "next";
import { BlogGrid } from "@/components/blog/blog-grid";
import connectDB from "@/lib/mongodb";
import { BlogPost } from "@/models";

export const metadata: Metadata = {
	title: "Blog",
	description:
		"Thoughts on web development, emerging technologies, best practices, and lessons learned building modern applications.",
	keywords: [
		"blog",
		"articles",
		"web development",
		"technology",
		"tutorials",
		"insights",
	],
	openGraph: {
		title: "Blog - Alex Chen Portfolio",
		description: "Insights and articles about modern web development.",
	},
};

async function getBlogPosts() {
	try {
		await connectDB();
		const posts = await BlogPost.find({ published: true })
			.select('-content -__v')
			.sort({ createdAt: -1 })
			.lean();
		// Convert MongoDB ObjectIds to strings for serialization
		return posts.map(post => ({
			...post,
			_id: post._id.toString(),
			createdAt: post.createdAt.toISOString(),
			updatedAt: post.updatedAt.toISOString(),
		}));
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return [];
	}
}

export default async function BlogPage() {
	const posts = await getBlogPosts();
	return (
		<div className="container mx-auto max-w-screen-2xl px-4 py-16">
			<div className="space-y-8 mb-16">
				<div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
					<span className="gradient-text font-medium">Blog</span>
				</div>

				<div className="space-y-4">
					<h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
						<span className="text-foreground">Latest </span>
						<span className="gradient-text">Insights</span>
					</h1>
					<p className="text-xl text-muted-foreground max-w-3xl">
						Thoughts on web development, emerging technologies, and lessons
						learned from building modern applications. I share what I learn as I
						learn it.
					</p>
				</div>
			</div>

			<BlogGrid initialPosts={posts} />
		</div>
	);
}

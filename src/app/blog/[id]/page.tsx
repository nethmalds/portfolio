import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HiArrowLeft, HiCalendar, HiClock } from "react-icons/hi";
import connectDB from "@/lib/mongodb";
import { BlogPost } from "@/models";
import { Types } from "mongoose";

interface BlogPostPageProps {
	params: Promise<{
		id: string; // MongoDB ObjectId
	}>;
}

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { id } = await params;

	// Validate ObjectId format
	if (!Types.ObjectId.isValid(id)) {
		return {
			title: "Post Not Found",
		};
	}

	try {
		await connectDB();
		const post = await BlogPost.findById(id)
			.select("title excerpt tags createdAt")
			.lean();

		if (!post) {
			return {
				title: "Post Not Found",
			};
		}

		return {
			title: post.title,
			description: post.excerpt,
			keywords: post.tags,
			openGraph: {
				title: post.title,
				description: post.excerpt,
				type: "article",
				publishedTime: post.createdAt.toISOString(),
				tags: post.tags,
			},
		};
	} catch (error) {
		console.error("Error generating metadata:", error);
		return {
			title: "Post Not Found",
		};
	}
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { id } = await params;

	// Validate ObjectId format
	if (!Types.ObjectId.isValid(id)) {
		notFound();
	}

	let post;
	try {
		await connectDB();
		post = await BlogPost.findById(id).lean();

		if (!post) {
			notFound();
		}

		// Increment view count
		await BlogPost.findByIdAndUpdate(id, { $inc: { views: 1 } });
	} catch (error) {
		console.error("Error fetching blog post:", error);
		notFound();
	}

	const formatDate = (dateString: string | Date) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const getTagColor = (tag: string): string => {
		const colors: Record<string, string> = {
			React: "bg-blue-500/10 text-blue-400 border-blue-500/20",
			"Next.js": "bg-purple-500/10 text-purple-400 border-purple-500/20",
			TypeScript: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
			JavaScript: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
			AI: "bg-green-500/10 text-green-400 border-green-500/20",
			Performance: "bg-orange-500/10 text-orange-400 border-orange-500/20",
			Default: "bg-muted/50 text-muted-foreground border-border",
		};
		return colors[tag] || colors.Default;
	};

	return (
		<main className="container mx-auto px-4 py-16">
			<div className="max-w-4xl mx-auto">
				{/* Back Navigation */}
				<div className="mb-8">
					<Button
						asChild
						variant="ghost"
						className="text-muted-foreground hover:text-foreground"
					>
						<Link href="/blog" className="flex items-center">
							<HiArrowLeft className="mr-2 h-4 w-4" />
							Back to Blog
						</Link>
					</Button>
				</div>

				{/* Article Header */}
				<article>
					<header className="mb-12 space-y-8">
						<div className="space-y-6">
							<h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
								{post.title}
							</h1>

							<p className="text-xl text-muted-foreground leading-relaxed">
								{post.excerpt}
							</p>
						</div>

						<div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
							<span className="flex items-center">
								<HiCalendar className="mr-2 h-4 w-4" />
								{formatDate(post.createdAt)}
							</span>
							<span className="flex items-center">
								<HiClock className="mr-2 h-4 w-4" />
								{post.readTime ? `${post.readTime} min read` : "5 min read"}
							</span>
							{post.featuredImage && (
								<span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
									Featured
								</span>
							)}
						</div>

						<div className="flex flex-wrap gap-2">
							{post.tags.map((tag: string) => (
								<span
									key={tag}
									className={`px-3 py-1 text-xs font-medium rounded-full border ${getTagColor(tag)}`}
								>
									{tag}
								</span>
							))}
						</div>
					</header>

					{/* Article Content */}
					<div className="prose prose-lg prose-invert max-w-none">
						<Card className="glass border-primary/20">
							<CardContent className="p-8">
								<div
									className="space-y-6 text-foreground prose prose-invert max-w-none"
									style={{
										fontSize: "1.125rem",
										lineHeight: "1.75",
									}}
								>
									{/* Render content as markdown-like format */}
									{post.content
										.split("\n\n")
										.map((paragraph: string, index: number) => {
											if (paragraph.startsWith("# ")) {
												return (
													<h1
														key={index}
														className="text-3xl font-bold mb-6 gradient-text"
													>
														{paragraph.replace("# ", "")}
													</h1>
												);
											}
											if (paragraph.startsWith("## ")) {
												return (
													<h2
														key={index}
														className="text-2xl font-bold mb-4 text-foreground"
													>
														{paragraph.replace("## ", "")}
													</h2>
												);
											}
											if (paragraph.startsWith("### ")) {
												return (
													<h3
														key={index}
														className="text-xl font-semibold mb-3 text-foreground"
													>
														{paragraph.replace("### ", "")}
													</h3>
												);
											}
											if (paragraph.includes("```")) {
												return (
													<pre
														key={index}
														className="bg-muted rounded-lg p-4 overflow-x-auto my-6"
													>
														<code className="text-sm">
															{paragraph.replace(/```[a-z]*\n?|\n?```/g, "")}
														</code>
													</pre>
												);
											}
											return (
												<p
													key={index}
													className="mb-4 text-muted-foreground leading-relaxed"
												>
													{paragraph}
												</p>
											);
										})}
								</div>
							</CardContent>
						</Card>
					</div>
				</article>

				{/* Navigation */}
				<div className="mt-16 pt-8 border-t border-border">
					<div className="flex justify-between items-center">
						<Button asChild variant="outline">
							<Link href="/blog">
								<HiArrowLeft className="mr-2 h-4 w-4" />
								All Articles
							</Link>
						</Button>

						<div className="text-sm text-muted-foreground">
							Share this article
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

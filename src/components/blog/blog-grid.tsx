"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiCalendar, HiClock, HiArrowRight } from "react-icons/hi";
import { useEffect, useState } from "react";

interface BlogPost {
	_id: string;
	title: string;
	excerpt: string;
	author: string;
	tags: string[];
	published: boolean;
	featuredImage?: string;
	readTime?: number;
	createdAt: string;
	updatedAt: string;
}

interface BlogGridProps {
	initialPosts?: BlogPost[];
}

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

const getTagColor = (tag: string) => {
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

export function BlogGrid({ initialPosts = [] }: BlogGridProps) {
	const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialPosts);
	const [loading, setLoading] = useState(!initialPosts.length);

	useEffect(() => {
		if (initialPosts.length === 0) {
			fetchBlogPosts();
		}
	}, [initialPosts.length]);

	const fetchBlogPosts = async () => {
		try {
			const response = await fetch("/api/blog?published=true");
			if (response.ok) {
				const data = await response.json();
				setBlogPosts(data.data || []);
			}
		} catch (error) {
			console.error("Error fetching blog posts:", error);
		} finally {
			setLoading(false);
		}
	};

	// For now, treat posts with featuredImage as featured
	const featuredPosts = blogPosts.filter((post) => post.featuredImage);
	const regularPosts = blogPosts.filter((post) => !post.featuredImage);

	if (loading) {
		return (
			<div className="flex items-center justify-center py-16">
				<div className="text-muted-foreground">Loading blog posts...</div>
			</div>
		);
	}

	return (
		<div className="space-y-16">
			{/* Featured Posts */}
			{featuredPosts.length > 0 && (
				<section>
					<h2 className="text-2xl font-bold text-foreground mb-8">
						Featured Articles
					</h2>
					<div className="grid lg:grid-cols-2 gap-8">
						{featuredPosts.map((post, index) => (
							<motion.article
								key={post._id}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: index * 0.2 }}
							>
								<Card className="h-full hover:shadow-xl transition-all duration-300 group border-primary/20 glass">
									<CardHeader>
										<div className="space-y-4">
											<div className="flex items-center justify-between text-sm text-muted-foreground">
												<div className="flex items-center space-x-4">
													<span className="flex items-center">
														<HiCalendar className="h-4 w-4 mr-1" />
														{formatDate(post.createdAt)}
													</span>
													<span className="flex items-center">
														<HiClock className="h-4 w-4 mr-1" />
														{post.readTime
															? `${post.readTime} min read`
															: "5 min read"}
													</span>
												</div>
												<span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
													Featured
												</span>
											</div>

											<CardTitle className="text-xl group-hover:text-primary transition-colors">
												<Link
													href={`/blog/${post._id}`}
													className="focus-ring rounded"
												>
													{post.title}
												</Link>
											</CardTitle>
										</div>
									</CardHeader>

									<CardContent className="space-y-6">
										<p className="text-muted-foreground leading-relaxed">
											{post.excerpt}
										</p>

										<div className="flex flex-wrap gap-2">
											{post.tags.map((tag) => (
												<span
													key={tag}
													className={`px-3 py-1 text-xs font-medium rounded-full border ${getTagColor(tag)}`}
												>
													{tag}
												</span>
											))}
										</div>

										<div className="pt-4">
											<Button
												asChild
												variant="ghost"
												className="text-primary hover:text-primary hover:bg-primary/10 p-0"
											>
												<Link href={`/blog/${post._id}`} className="group">
													Read Article
													<HiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
												</Link>
											</Button>
										</div>
									</CardContent>
								</Card>
							</motion.article>
						))}
					</div>
				</section>
			)}

			{/* Regular Posts */}
			<section>
				<h2 className="text-2xl font-bold text-foreground mb-8">
					All Articles
				</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{regularPosts.map((post, index) => (
						<motion.article
							key={post._id}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: index * 0.1 }}
						>
							<Card className="h-full hover:shadow-lg transition-all duration-300 group">
								<CardHeader>
									<div className="space-y-3">
										<div className="flex items-center text-sm text-muted-foreground space-x-4">
											<span className="flex items-center">
												<HiCalendar className="h-4 w-4 mr-1" />
												{formatDate(post.createdAt)}
											</span>
											<span className="flex items-center">
												<HiClock className="h-4 w-4 mr-1" />
												{post.readTime
													? `${post.readTime} min read`
													: "5 min read"}
											</span>
										</div>

										<CardTitle className="text-lg group-hover:text-primary transition-colors">
											<Link
												href={`/blog/${post._id}`}
												className="focus-ring rounded"
											>
												{post.title}
											</Link>
										</CardTitle>
									</div>
								</CardHeader>

								<CardContent className="space-y-4">
									<p className="text-muted-foreground text-sm leading-relaxed">
										{post.excerpt}
									</p>

									<div className="flex flex-wrap gap-1">
										{post.tags.slice(0, 3).map((tag) => (
											<span
												key={tag}
												className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
											>
												{tag}
											</span>
										))}
										{post.tags.length > 3 && (
											<span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
												+{post.tags.length - 3}
											</span>
										)}
									</div>

									<div className="pt-2">
										<Button
											asChild
											variant="ghost"
											size="sm"
											className="text-primary hover:text-primary hover:bg-primary/10 p-0"
										>
											<Link href={`/blog/${post._id}`} className="group">
												Read More
												<HiArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
											</Link>
										</Button>
									</div>
								</CardContent>
							</Card>
						</motion.article>
					))}
				</div>
			</section>

			{/* Newsletter Signup */}
			<motion.section
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="text-center"
			>
				<Card className="glass border-primary/20">
					<CardContent className="p-8 space-y-6">
						<div className="space-y-4">
							<h3 className="text-2xl font-bold gradient-text">Stay Updated</h3>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								Get notified when I publish new articles about web development,
								emerging technologies, and industry insights.
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
							/>
							<Button className="btn-neon glow-cyan font-semibold">
								Subscribe
							</Button>
						</div>

						<p className="text-xs text-muted-foreground">
							No spam, unsubscribe anytime. I respect your privacy.
						</p>
					</CardContent>
				</Card>
			</motion.section>
		</div>
	);
}

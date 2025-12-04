"use client";

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCard } from "@/components/project-card";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

interface ProjectType {
	id: string;
	title: string;
	description: string;
	image?: string | null;
	technologies: string[];
	role?: string;
	year?: string;
	status?: string;
	links: { live?: string | null; case: string; repo?: string | null };
}

export default function FeaturedWork() {
	const [featuredProjects, setFeaturedProjects] = useState<ProjectType[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;

		async function loadFeatured() {
			setLoading(true);
			setError(null);

			try {
				const res = await fetch('/api/projects?featured=true&limit=4');
				if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
				const json = await res.json();
					if (mounted) {
						const raw = (json.data || []) as unknown[];
						const list: ProjectType[] = raw.map((p) => {
							const obj = p as Record<string, unknown>;
							const pid = (obj.id as string) || ((obj._id as { toString?: () => string })?.toString?.()) || String(obj._id ?? obj.id ?? '');
							return {
								id: pid,
								title: String(obj.title ?? ''),
								description: String(obj.description ?? ''),
								image: (obj.image as string | null) ?? null,
								technologies: (obj.technologies as string[]) ?? [],
								role: (obj.role as string) ?? undefined,
								year: (obj.year as string) ?? undefined,
								status: (obj.status as string) ?? undefined,
								links: (obj.links as { live?: string | null; case: string; repo?: string | null }) ?? { case: '' },
							} as ProjectType;
						});

						setFeaturedProjects(list);
					}
			} catch (err: unknown) {
				const error = err as Error;
				if (mounted) setError(error?.message || String(error));
			} finally {
				if (mounted) setLoading(false);
			}
		}

		loadFeatured();

		return () => {
			mounted = false;
		};
	}, []);

	if (error) {
		console.error('Error fetching featured projects', error);
		return null;
	}

	return (
			<section className="py-20 lg:py-32 bg-background">
				<div className="container mx-auto max-w-screen-2xl px-4">
					{/* Section Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="text-center space-y-6 mb-16"
					>
						<div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
							<span className="gradient-text font-medium">Featured Work</span>
						</div>

						<h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
							<span className="text-foreground">Selected </span>
							<span className="gradient-text">Projects</span>
						</h2>

						<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
							A showcase of my recent work spanning web development, mobile
							applications, and AI integration projects that solve real-world
							problems.
						</p>
					</motion.div>

					{/* Featured Projects Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
						{loading ? (
							Array.from({ length: 3 }).map((_, index) => (
								<div key={`skeleton-${index}`} className="animate-pulse">
									<div className="h-64 bg-muted/40 rounded-lg mb-4" />
									<div className="h-4 bg-muted/30 rounded w-3/4 mb-2" />
									<div className="h-3 bg-muted/20 rounded w-1/2" />
								</div>
							))
						) : (
							<>
								{featuredProjects.map((project, index) => (
									<motion.div
										key={project.id}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.8, delay: index * 0.2 }}
									>
										<ProjectCard project={project} featured />
									</motion.div>
								))}
							</>
						)}
					</div>

					{/* View All Work CTA */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="text-center"
					>
						<Button
							asChild
							size="lg"
							className="btn-neon hover:glow-cyan font-semibold bg-transparent hover:bg-transparent border text-white hover:text-white/70"
						>
							<Link href="/work" className="group">
								View All Projects
								<HiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Button>
					</motion.div>
				</div>
			</section>
		);
}

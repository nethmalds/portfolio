"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCard } from "@/components/project-card";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { featuredProjects } from "@/data/projects";

export function FeaturedWork() {
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
						variant="outline"
						className="btn-neon hover:glow-cyan font-semibold"
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

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { HiArrowLeft, HiX } from "react-icons/hi";
import { ProjectData, ProjectCategory } from "@/models/projects";
import Link from "next/link";

const categoryValues: ProjectCategory[] = [
	"Web App",
	"Mobile App",
	"System",
	"ML Model",
];
const categories = ["All", ...categoryValues];

type SelectedCategory = "All" | ProjectCategory;

export default function WorkGrid() {
	const [selectedCategory, setSelectedCategory] =
		useState<SelectedCategory>("All");
	const [projects, setProjects] = useState<ProjectData[]>([]);
	const [loading, setLoading] = useState(true);

	const filteredProjects = projects.filter((project) => {
		const matchesCategory =
			selectedCategory === "All" || project.category === selectedCategory;
		return matchesCategory;
	});

	// Fetch projects from the API
	useEffect(() => {
		let mounted = true;
		async function load() {
			try {
				setLoading(true);
				const res = await fetch("/api/projects?limit=100");
				if (!res.ok) throw new Error("Failed to fetch projects");
				const json = await res.json();
				if (mounted && json?.data) setProjects(json.data);
			} catch (err) {
				console.error(err);
			} finally {
				if (mounted) setLoading(false);
			}
		}
		load();
		return () => {
			mounted = false;
		};
	}, []);

	const clearFilters = () => {
		setSelectedCategory("All");
	};

	return (
		<div className="space-y-8">
			{/* Loading State */}
			{loading && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="flex flex-col items-center justify-center py-16"
				>
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4" />
					<h3 className="text-xl font-semibold mb-2">Loading projects...</h3>
					<p className="text-muted-foreground">
						Please wait while we fetch the latest projects.
					</p>
				</motion.div>
			)}
			{/* Main Content (hidden while loading) */}
			{!loading && (
				<>
					{/* Filter Controls */}
					<div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
						<div className="flex flex-wrap gap-2">
							{categories.map((category) => (
								<Button
									key={category}
									onClick={() =>
										setSelectedCategory(category as SelectedCategory)
									}
									variant={
										selectedCategory === category ? "default" : "outline"
									}
									size="sm"
									className={selectedCategory === category ? "glow-cyan" : ""}
								>
									{category}
								</Button>
							))}
						</div>

						<div className="flex items-center gap-4">
							{selectedCategory !== "All" && (
								<Button
									onClick={clearFilters}
									variant="ghost"
									size="sm"
									className="text-muted-foreground hover:text-foreground"
								>
									<HiX className="h-4 w-4 mr-2" />
									Clear
								</Button>
							)}
						</div>
					</div>

					{/* Results Count */}
					<div className="text-sm text-muted-foreground">
						Showing {filteredProjects.length} of {projects.length} projects
					</div>

					{/* Projects Grid */}
					<motion.div
						layout
						className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
					>
						<AnimatePresence>
							{filteredProjects.map((project, index) => (
								<motion.div
									key={project.id}
									layout
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ duration: 0.3, delay: index * 0.1 }}
								>
									<ProjectCard project={project} />
								</motion.div>
							))}
						</AnimatePresence>
					</motion.div>

					{/* No Results */}
					{filteredProjects.length === 0 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-center py-16"
						>
							<div className="text-6xl mb-4">🔍</div>
							<h3 className="text-xl font-semibold mb-2">No projects found</h3>
							<p className="text-muted-foreground mb-6">
								Try adjusting your filters to see more results
							</p>
							<Button onClick={clearFilters} variant="outline">
								Clear Filters
							</Button>
						</motion.div>
					)}

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
							<Link href="/" className="group">
								<HiArrowLeft className="mr-2 h-5 w-5 inline-block group-hover:-translate-x-1 transition-transform" />
								Back to Home
							</Link>
						</Button>
					</motion.div>
				</>
			)}
		</div>
	);
}

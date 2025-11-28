"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProjectCard } from "@/components/project-card";
import { HiFilter, HiX } from "react-icons/hi";

const categories = ["All", "Web App", "Mobile App", "Design System", "AI/ML"];
const technologies = [
	"React",
	"TypeScript",
	"Next.js",
	"React Native",
	"Python",
	"AI/ML",
	"Node.js",
];

export default function WorkGrid() {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedTech, setSelectedTech] = useState<string[]>([]);
	const [showFilters, setShowFilters] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);
	const [projects, setProjects] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	// Check for desktop screen size on client side only
	useEffect(() => {
		const checkScreenSize = () => {
			setIsDesktop(window.innerWidth >= 1024);
		};

		// Set initial value
		checkScreenSize();

		// Add event listener
		window.addEventListener("resize", checkScreenSize);

		// Cleanup
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	const filteredProjects = projects.filter((project) => {
		const matchesCategory =
			selectedCategory === "All" || project.category === selectedCategory;
		const matchesTech =
			selectedTech.length === 0 ||
			selectedTech.some((tech) =>
				project.technologies.some((projectTech: string) =>
					projectTech.toLowerCase().includes(tech.toLowerCase()),
				),
			);
		return matchesCategory && matchesTech;
	});

	const toggleTech = (tech: string) => {
		setSelectedTech((prev) =>
			prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
		);
	};

	// Fetch projects from the API
	useEffect(() => {
		let mounted = true;
		async function load() {
			try {
				setLoading(true);
				const res = await fetch('/api/projects?limit=100');
				if (!res.ok) throw new Error('Failed to fetch projects');
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
		setSelectedTech([]);
	};

	return (
		<div className="space-y-8">
			{/* Filter Controls */}
			<div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
				<div className="flex flex-wrap gap-2">
					{categories.map((category) => (
						<Button
							key={category}
							onClick={() => setSelectedCategory(category)}
							variant={selectedCategory === category ? "default" : "outline"}
							size="sm"
							className={selectedCategory === category ? "glow-cyan" : ""}
						>
							{category}
						</Button>
					))}
				</div>

				<div className="flex items-center gap-4">
					<Button
						onClick={() => setShowFilters(!showFilters)}
						variant="outline"
						size="sm"
						className="lg:hidden"
					>
						<HiFilter className="h-4 w-4 mr-2" />
						Filters
					</Button>

					{(selectedTech.length > 0 || selectedCategory !== "All") && (
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

			{/* Technology Filters */}
			<AnimatePresence>
				{(showFilters || isDesktop) && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="overflow-hidden"
					>
						<Card className="p-4">
							<div className="space-y-4">
								<h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
									Filter by Technology
								</h3>
								<div className="flex flex-wrap gap-2">
									{technologies.map((tech) => (
										<Button
											key={tech}
											onClick={() => toggleTech(tech)}
											variant={
												selectedTech.includes(tech) ? "default" : "outline"
											}
											size="sm"
											className={
												selectedTech.includes(tech) ? "glow-magenta" : ""
											}
										>
											{tech}
										</Button>
									))}
								</div>
							</div>
						</Card>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Results Count */}
			<div className="text-sm text-muted-foreground">
				Showing {filteredProjects.length} of {projects.length} projects
			</div>

			{/* Projects Grid */}
			<motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
		</div>
	);
}

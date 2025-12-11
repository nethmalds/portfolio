
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	HiArrowLeft,
	HiExternalLink,
	HiCode,
	HiCalendar,
	HiUser,
	HiTag,
} from "react-icons/hi";

// Fetch project data from API
async function getProject(slug: string) {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
		const res = await fetch(`${baseUrl}/api/projects/${slug}`, {
			cache: "no-store",
		});

		if (!res.ok) {
			return null;
		}

		const data = await res.json();
		return data.data || null;
	} catch (error) {
		console.error("Error fetching project:", error);
		return null;
	}
}

export async function generateMetadata(
    props: {
        params: Promise<{ slug: string }>;
    }
): Promise<Metadata> {
    const params = await props.params;
    const project = await getProject(params.slug);

    if (!project) {
		return {
			title: "Project Not Found",
		};
	}

    return {
		title: `${project.title} - Project Case Study`,
		description: project.description,
		openGraph: {
			title: project.title,
			description: project.description,
			images: project.image ? [project.image] : [],
		},
	};
}

export default async function ProjectPage(
    props: {
        params: Promise<{ slug: string }>;
    }
) {
    const params = await props.params;
    const project = await getProject(params.slug);

    if (!project) {
		notFound();
	}

    return (
		<div className="container mx-auto max-w-5xl px-4 py-20">
			{/* Project Header */}
			<div className="space-y-6 mb-12">
				<div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
					<span className="gradient-text font-medium">Case Study</span>
				</div>

				<h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
					{project.title}
				</h1>

				{/* Project Meta */}
				<div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
					{project.role && (
						<div className="flex items-center gap-2">
							<HiUser className="h-4 w-4" />
							<span>{project.role}</span>
						</div>
					)}
					{project.year && (
						<div className="flex items-center gap-2">
							<HiCalendar className="h-4 w-4" />
							<span>{project.year}</span>
						</div>
					)}
					{project.status && (
						<div className="flex items-center gap-2">
							<HiTag className="h-4 w-4" />
							<span
								className={`px-2 py-1 rounded-full text-xs ${
									project.status === "Active"
										? "bg-green-500/10 text-green-500"
										: project.status === "Completed"
											? "bg-blue-500/10 text-blue-500"
											: project.status === "Ongoing"
												? "bg-yellow-500/10 text-yellow-500"
												: "bg-gray-500/10 text-gray-500"
								}`}
							>
								{project.status}
							</span>
						</div>
					)}
					{project.category && (
						<div className="flex items-center gap-2">
							<span className="text-primary">{project.category}</span>
						</div>
					)}
				</div>

				{/* Action Buttons */}
				<div className="flex flex-wrap gap-4">
					{project.links.live && (
						<Button asChild size="lg" className="glow-cyan">
							<Link
								href={project.links.live}
								target="_blank"
								rel="noopener noreferrer"
							>
								<HiExternalLink className="mr-2 h-5 w-5" />
								View Live Site
							</Link>
						</Button>
					)}
					{project.links.repo && (
						<Button asChild size="lg" variant="outline">
							<Link
								href={project.links.repo}
								target="_blank"
								rel="noopener noreferrer"
							>
								<HiCode className="mr-2 h-5 w-5" />
								View Code
							</Link>
						</Button>
					)}
				</div>
			</div>

			{/* Project Image */}
			{project.image && (
				<div className="relative w-full h-[400px] lg:h-[600px] rounded-lg overflow-hidden mb-12">
					<Image
						src={project.image}
						alt={project.title}
						fill
						className="object-cover"
						priority
					/>
				</div>
			)}

			{/* Project Description */}
			<Card className="glass mb-12">
				<CardContent className="p-8">
					<h2 className="text-2xl font-bold mb-4 gradient-text">
						Project Overview
					</h2>
					<p className="text-lg text-muted-foreground leading-relaxed">
						{project.description}
					</p>
				</CardContent>
			</Card>

			{/* Technologies */}
			<Card className="glass mb-12">
				<CardContent className="p-8">
					<h2 className="text-2xl font-bold mb-6 gradient-text">
						Technologies Used
					</h2>
					<div className="flex flex-wrap gap-3">
						{project.technologies.map((tech: string) => (
							<span
								key={tech}
								className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
							>
								{tech}
							</span>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Key Features Section - Placeholder for future expansion */}
			<Card className="glass mb-12">
				<CardContent className="p-8">
					<h2 className="text-2xl font-bold mb-6 gradient-text">
						Key Features
					</h2>
					<div className="space-y-4 text-muted-foreground">
						<p>
							This project demonstrates expertise in modern software development
							practices and cutting-edge technologies.
						</p>
						<ul className="list-disc list-inside space-y-2 ml-4">
							<li>Scalable and maintainable architecture</li>
							<li>Responsive and accessible user interface</li>
							<li>Robust error handling and validation</li>
							<li>Performance-optimized implementation</li>
						</ul>
					</div>
				</CardContent>
			</Card>

			<div className="text-center">
			<Button
			asChild
			size="lg"
			className="btn-neon hover:glow-cyan font-semibold bg-transparent hover:bg-transparent border text-white hover:text-white/70"
			>
				<Link href="/projects" className="group">
					<HiArrowLeft className="mr-2 h-5 w-5 inline-block group-hover:-translate-x-1 transition-transform" />
					Back to Projects
				</Link>
			</Button>
			</div>
		</div>
	);
}

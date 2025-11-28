"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { HiExternalLink, HiCode, HiEye } from "react-icons/hi";

interface ProjectCardProps {
	project: {
		id: string;
		title: string;
		description: string;
		image?: string | null; // allow null/undefined and empty values
		technologies: string[];
		role?: string | null;
		year?: string | null;
		status?: string | null;
		links: {
			live?: string | null;
			case: string;
			repo?: string | null;
		};
	};
	featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
	return (
		<motion.div
			whileHover={{ y: featured ? -8 : -4 }}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
			className="group"
		>
			<Card
				className={`overflow-hidden card-hover p-0 glass ${featured ? "border-primary/20" : ""} h-full`}
			>
				{/* Project Image */}
				<div
					className="relative overflow-hidden h-80"
				>
					{project.image ? (
						<Image
							src={project.image}
							alt={project.title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-105"
							placeholder="blur"
							blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKECEQERIRFRERFRQhFRAYGhsYGhcRFhshGhkeGhseFCAhJSoiFCccJxsdGCA/Fhv/wAARCAAgACgDASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAwQFBgIB/8QALBAAAQQBAwMEAAcAAAAAAAAAAQIDEQAEBRIhQVFhIoGRsQYHEyNSocHh8P/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAHBEAAgIDAQEAAAAAAAAAAAAAAACgAQMhMkH/2gAMAwEAAhEDEQA/AKe2tZmJD2VGI/dTGXKQ0KfDSVElICwAKBUedR8rjJOTD2VGI/dTGXKQ0KfDSVElICwAKBUedR8"
						/>
					) : (
						<div className="flex items-center justify-center bg-muted/60 text-muted-foreground h-full w-full">
							<span className="px-4 text-center text-sm font-medium">{project.title}</span>
						</div>
					)}

					{/* Overlay with quick actions */}
					<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
						{project.links.live && (
							<Button asChild size="sm" className="glow-cyan">
								<Link
									href={project.links.live}
									target="_blank"
									rel="noopener noreferrer"
								>
									<HiExternalLink className="h-4 w-4" />
								</Link>
							</Button>
						)}

						<Button asChild size="sm" className="bg-transparent hover:bg-transparent text-white hover:text-primary">
							<Link href={project.links.case}>
								<HiEye className="h-4 w-4" />
							</Link>
						</Button>

						{project.links.repo && (
							<Button asChild size="sm" className="bg-transparent hover:bg-transparent text-white hover:text-primary">
								<Link
									href={project.links.repo}
									target="_blank"
									rel="noopener noreferrer"
								>
									<HiCode className="h-4 w-4" />
								</Link>
							</Button>
						)}
					</div>

					{/* Status Badge */}
					<div className="absolute top-4 right-4">
						<span
							className={`px-2 py-1 rounded-full text-xs font-medium ${
								project.status === "Ongoing"
									? "bg-primary text-primary-foreground"
									: project.status === "Active" || project.status === "Completed"
										? "bg-green-600 text-white"
										: "bg-gray-600 text-white"

							}`}
						>
							{project.status}
						</span>
					</div>
				</div>

				<CardContent className="px-6 pb-6 space-y-4">
					{/* Project Meta */}
					<div className="flex items-center justify-between text-sm text-muted-foreground">
						<span>{project.role}</span>
						<span>{project.year}</span>
					</div>

					{/* Project Title & Description */}
					<div className="space-y-2">
						<h3
							className={`font-bold tracking-tight ${featured ? "text-xl" : "text-lg"} group-hover:text-primary transition-colors`}
						>
							<Link href={project.links.case} className="focus-ring rounded">
								{project.title}
							</Link>
						</h3>

						<p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
							{project.description}
						</p>
					</div>

					{/* Technologies */}
					<div className="flex flex-wrap gap-2">
						{project.technologies.map((tech) => (
							<span
								key={tech}
								className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground font-medium"
							>
								{tech}
							</span>
						))}
					</div>

					{/* Action Buttons */}
					<div className="flex items-center justify-between pt-2">
						<Button
							asChild
							size="sm"
							className="text-white bg-transparent hover:text-primary hover:bg-transparent"
						>
							<Link href={project.links.case}>View Case Study →</Link>
						</Button>

						<div className="flex space-x-2">
							{project.links.live && (
								<Button
									asChild
									size="icon-sm"
									className="h-8 w-8 bg-transparent hover:bg-transparent text-white hover:text-primary"
								>
									<Link
										href={project.links.live}
										target="_blank"
										rel="noopener noreferrer"
										title="View Live Site"
									>
										<HiExternalLink className="h-4 w-4" />
									</Link>
								</Button>
							)}

							{project.links.repo && (
								<Button
									asChild
									size="icon-sm"
									className="h-8 w-8 bg-transparent hover:bg-transparent text-white hover:text-primary"
								>
									<Link
										href={project.links.repo}
										target="_blank"
										rel="noopener noreferrer"
										title="View Source Code"
									>
										<HiCode className="h-4 w-4" />
									</Link>
								</Button>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}

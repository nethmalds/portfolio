"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	HiCode,
	HiDesktopComputer,
	HiServer,
	HiDeviceMobile,
	HiCube,
	HiDatabase,
	HiCloud,
	HiLightningBolt,
} from "react-icons/hi";

const skillCategories = [
	{
		id: "frontend",
		title: "Frontend Development",
		icon: HiDesktopComputer,
		color: "from-blue-500 to-cyan-500",
		skills: [
			{ name: "React", level: 95 },
			{ name: "Next.js", level: 90 },
			{ name: "TypeScript", level: 90 },
			{ name: "Tailwind CSS", level: 85 },
			{ name: "Framer Motion", level: 80 },
			{ name: "Three.js", level: 75 },
		],
	},
	{
		id: "backend",
		title: "Backend Development",
		icon: HiServer,
		color: "from-green-500 to-emerald-500",
		skills: [
			{ name: "Node.js", level: 85 },
			{ name: "Python", level: 80 },
			{ name: "GraphQL", level: 85 },
			{ name: "REST APIs", level: 90 },
			{ name: "Microservices", level: 75 },
			{ name: "WebSockets", level: 80 },
		],
	},
	{
		id: "mobile",
		title: "Mobile Development",
		icon: HiDeviceMobile,
		color: "from-purple-500 to-pink-500",
		skills: [
			{ name: "React Native", level: 85 },
			{ name: "Expo", level: 80 },
			{ name: "Flutter", level: 70 },
			{ name: "iOS Development", level: 60 },
			{ name: "Android", level: 65 },
		],
	},
	{
		id: "database",
		title: "Database & Storage",
		icon: HiDatabase,
		color: "from-orange-500 to-red-500",
		skills: [
			{ name: "PostgreSQL", level: 85 },
			{ name: "MongoDB", level: 80 },
			{ name: "Redis", level: 75 },
			{ name: "Prisma", level: 85 },
			{ name: "Supabase", level: 80 },
		],
	},
	{
		id: "cloud",
		title: "Cloud & DevOps",
		icon: HiCloud,
		color: "from-indigo-500 to-blue-500",
		skills: [
			{ name: "AWS", level: 80 },
			{ name: "Vercel", level: 90 },
			{ name: "Docker", level: 75 },
			{ name: "CI/CD", level: 80 },
			{ name: "Kubernetes", level: 65 },
		],
	},
	{
		id: "emerging",
		title: "Emerging Tech",
		icon: HiCube,
		color: "from-yellow-500 to-orange-500",
		skills: [
			{ name: "AI/ML Integration", level: 75 },
			{ name: "WebGL", level: 70 },
			{ name: "WebAssembly", level: 60 },
			{ name: "Blockchain", level: 55 },
			{ name: "AR/VR", level: 65 },
		],
	},
];

export function SkillsSection() {
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
						<span className="gradient-text font-medium">
							Skills & Expertise
						</span>
					</div>

					<h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
						<span className="text-foreground">Technical </span>
						<span className="gradient-text">Skills</span>
					</h2>

					<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
						A comprehensive overview of my technical expertise across frontend,
						backend, mobile development, and emerging technologies.
					</p>
				</motion.div>

				{/* Skills Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{skillCategories.map((category, index) => (
						<motion.div
							key={category.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: index * 0.1 }}
						>
							<Card className="h-full hover:shadow-xl transition-all duration-300 group">
								<CardHeader className="text-center pb-4">
									<div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform">
										<category.icon className="h-6 w-6" />
									</div>
									<CardTitle className="text-lg">{category.title}</CardTitle>
								</CardHeader>

								<CardContent className="space-y-4">
									{category.skills.map((skill, skillIndex) => (
										<div key={skill.name} className="space-y-2">
											<div className="flex justify-between items-center">
												<span className="text-sm font-medium text-foreground">
													{skill.name}
												</span>
												<span className="text-xs text-muted-foreground">
													{skill.level}%
												</span>
											</div>

											<div className="w-full bg-muted rounded-full h-2 overflow-hidden">
												<motion.div
													initial={{ width: 0 }}
													whileInView={{ width: `${skill.level}%` }}
													viewport={{ once: true }}
													transition={{
														duration: 1,
														delay: index * 0.1 + skillIndex * 0.1,
													}}
													className="h-2 bg-primary rounded-full"
												/>
											</div>
										</div>
									))}
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>

				{/* Additional Skills */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="mt-16 text-center"
				>
					<h3 className="text-xl font-semibold mb-6 text-foreground">
						Additional Skills & Tools
					</h3>
					<div className="flex flex-wrap justify-center gap-3">
						{[
							"Git & GitHub",
							"Figma",
							"Photoshop",
							"Jira",
							"Slack",
							"Notion",
							"Testing (Jest, Cypress)",
							"Performance Optimization",
							"SEO",
							"Accessibility (WCAG)",
							"Agile/Scrum",
							"Technical Writing",
						].map((skill, index) => (
							<motion.span
								key={skill}
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.3, delay: index * 0.05 }}
								className="px-4 py-2 bg-muted/50 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
							>
								{skill}
							</motion.span>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}

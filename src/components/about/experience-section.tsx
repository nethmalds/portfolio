"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { HiBriefcase, HiCalendar, HiLocationMarker } from "react-icons/hi";

// Sample experience data - TODO: Replace with your actual experience
const experiences = [
	{
		id: "senior-dev-2023",
		title: "Senior Full Stack Developer",
		company: "TechCorp Inc.",
		location: "San Francisco, CA",
		period: "2023 - Present",
		type: "Full-time",
		description:
			"Leading development of AI-powered web applications and mentoring junior developers. Built scalable React applications serving 100k+ users.",
		achievements: [
			"Led migration from legacy PHP to modern React/Next.js stack",
			"Implemented AI-powered recommendation engine increasing user engagement by 40%",
			"Mentored 5 junior developers and established coding standards",
			"Optimized application performance resulting in 60% faster load times",
		],
		technologies: [
			"React",
			"Next.js",
			"TypeScript",
			"Python",
			"PostgreSQL",
			"AWS",
		],
	},
	{
		id: "fullstack-dev-2021",
		title: "Full Stack Developer",
		company: "Startup Ventures",
		location: "Remote",
		period: "2021 - 2023",
		type: "Full-time",
		description:
			"Developed MVP products for early-stage startups, working directly with founders to translate ideas into functional applications.",
		achievements: [
			"Built 3 successful MVPs from concept to launch",
			"Established CI/CD pipelines reducing deployment time by 80%",
			"Implemented real-time features using WebSocket technology",
			"Collaborated with design team to create pixel-perfect interfaces",
		],
		technologies: [
			"React",
			"Node.js",
			"MongoDB",
			"Socket.io",
			"Docker",
			"Vercel",
		],
	},
	{
		id: "frontend-dev-2019",
		title: "Frontend Developer",
		company: "Digital Agency",
		location: "New York, NY",
		period: "2019 - 2021",
		type: "Full-time",
		description:
			"Created responsive web applications and interactive websites for Fortune 500 clients.",
		achievements: [
			"Developed responsive websites for 20+ enterprise clients",
			"Improved accessibility compliance to WCAG 2.1 AA standards",
			"Built interactive data visualizations using D3.js",
			"Reduced bundle size by 40% through optimization techniques",
		],
		technologies: ["HTML", "CSS", "JavaScript", "React", "Sass", "Webpack"],
	},
];

export function ExperienceSection() {
	return (
		<section className="py-20 lg:py-32 bg-muted/20">
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
						<span className="gradient-text font-medium">Experience</span>
					</div>

					<h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
						<span className="text-foreground">Professional </span>
						<span className="gradient-text">Journey</span>
					</h2>

					<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
						Over the years, I&apos;ve had the opportunity to work with amazing teams
						and contribute to projects that have shaped my expertise.
					</p>
				</motion.div>

				{/* Experience Timeline */}
				<div className="space-y-8">
					{experiences.map((experience, index) => (
						<motion.div
							key={experience.id}
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: index * 0.2 }}
						>
							<Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary/20">
								<CardContent className="p-8">
									<div className="grid lg:grid-cols-3 gap-6">
										{/* Left Column - Basic Info */}
										<div className="space-y-4">
											<div>
												<h3 className="text-xl font-bold text-foreground">
													{experience.title}
												</h3>
												<p className="text-lg text-primary font-semibold">
													{experience.company}
												</p>
											</div>

											<div className="space-y-2 text-sm text-muted-foreground">
												<div className="flex items-center space-x-2">
													<HiCalendar className="h-4 w-4" />
													<span>{experience.period}</span>
												</div>
												<div className="flex items-center space-x-2">
													<HiLocationMarker className="h-4 w-4" />
													<span>{experience.location}</span>
												</div>
												<div className="flex items-center space-x-2">
													<HiBriefcase className="h-4 w-4" />
													<span>{experience.type}</span>
												</div>
											</div>
										</div>

										{/* Middle Column - Description & Achievements */}
										<div className="lg:col-span-2 space-y-6">
											<p className="text-muted-foreground">
												{experience.description}
											</p>

											<div className="space-y-3">
												<h4 className="font-semibold text-foreground">
													Key Achievements:
												</h4>
												<ul className="space-y-2">
													{experience.achievements.map((achievement, i) => (
														<li
															key={i}
															className="flex items-start space-x-3 text-sm text-muted-foreground"
														>
															<span className="text-primary font-bold">•</span>
															<span>{achievement}</span>
														</li>
													))}
												</ul>
											</div>

											<div className="space-y-3">
												<h4 className="font-semibold text-foreground">
													Technologies:
												</h4>
												<div className="flex flex-wrap gap-2">
													{experience.technologies.map((tech) => (
														<span
															key={tech}
															className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground"
														>
															{tech}
														</span>
													))}
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

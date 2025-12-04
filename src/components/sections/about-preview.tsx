"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
	HiDownload,
	HiMail,
	HiCode,
	HiDesktopComputer,
	HiDeviceMobile,
	HiCube,
} from "react-icons/hi";

const skills = [
	{
		category: "Frontend",
		icon: HiDesktopComputer,
		technologies: [
			"React",
			"Next.js",
			"TypeScript",
			"Tailwind CSS",
			"Framer Motion",
		],
	},
	{
		category: "Backend",
		icon: HiCode,
		technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL"],
	},
	{
		category: "Mobile",
		icon: HiDeviceMobile,
		technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"],
	},
	{
		category: "Emerging",
		icon: HiCube,
		technologies: ["AI/ML", "Blockchain", "WebGL", "WebAssembly", "AR/VR"],
	},
];

export function AboutPreview() {
	return (
		<section className="py-20 lg:py-32 bg-muted/30">
			<div className="container mx-auto max-w-screen-2xl px-4">
				<div className="grid lg:grid-cols-2 gap-6 items-center">
					{/* Left Column - Image and Stats */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="space-y-8 flex justify-center"
					>
						{/* Profile Image */}
						<div className="relative">
							<div className="relative h-150 w-lg mx-auto lg:mx-0">
								<div className="absolute inset-0 bg-linear-to-br from-primary to-accent rounded-2xl blur-2xl opacity-20 animate-glow" />
								<Image
									src="/images/profile/profile.jpg"
									alt="Alex Chen - Full Stack Developer"
									fill
									className="object-cover object-top rounded-2xl relative z-10"
									placeholder="blur"
									blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKECEQERIRFRERFRQhFRAYGhsYGhcRFhshGhkeGhseFCAhJSoiFCccJxsdGCA/Fhv/wAARCAAgACgDASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAwQFBgIB/8QALBAAAQQBAwMEAAcAAAAAAAAAAQIDEQAEBRIhQVFhIoGRsQYHEyNSocHh8P/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAHBEAAgIDAQEAAAAAAAAAAAAAAACgAQMhMkH/2gAMAwEAAhEDEQA/AKe2tZmJD2VGI/dTGXKQ0KfDSVElICwAKBUedR8rjJOTD2VGI/dTGXKQ0KfDSVElICwAKBUedR8"
								/>
							</div>
						</div>
					</motion.div>

					{/* Right Column - Content */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="space-y-8"
					>
						{/* Header */}
						<div className="space-y-4">
							<div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
								<span className="gradient-text font-medium">About Me</span>
							</div>

							<h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
								<span className="text-foreground">Passionate about </span>
								<span className="gradient-text">Technology</span>
							</h2>
						</div>

						{/* Bio */}
						<div className="space-y-4 text-muted-foreground">
							<p>
								I&apos;m a full stack developer with over 5 years of experience
								creating digital solutions that bridge the gap between design
								and technology. My journey started with a curiosity for how
								things work and evolved into a passion for building products
								that make a difference.
							</p>

							<p>
								When I&apos;m not coding, you&apos;ll find me exploring new technologies,
								contributing to open source projects, or sharing knowledge
								through technical writing and mentoring.
							</p>
						</div>

						{/* Skills Grid */}
						<div className="grid grid-cols-2 gap-4">
							{skills.map((skill, index) => (
								<motion.div
									key={skill.category}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
								>
									<Card className="h-full hover:shadow-lg transition-shadow">
										<CardContent className="p-4">
											<div className="flex items-center space-x-3 mb-3">
												<skill.icon className="h-5 w-5 text-primary" />
												<h3 className="font-semibold text-sm">
													{skill.category}
												</h3>
											</div>
											<div className="flex flex-wrap gap-1">
												{skill.technologies.map((tech) => (
													<span
														key={tech}
														className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
													>
														{tech}
													</span>
												))}
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>

						{/* CTAs */}
						<div className="flex flex-col sm:flex-row gap-4">
							{/* <Button asChild className="btn-neon glow-cyan font-semibold">
								<Link href="/about" className="group">
									Learn More
									<HiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button> */}

							<Button
								asChild
								className="font-semibold hover:glow-magenta"
							>
								<a
									href="/resume/alex-chen-resume.pdf"
									download
									className="group"
									target="_blank"
									rel="noopener noreferrer"
								>
									<HiDownload className="mr-2 h-4 w-4" />
									Download Resume
								</a>
							</Button>
							<Button
								asChild
								variant="outline"
								size="lg"
								className="font-semibold hover:glow-magenta hover:text-white/70"
							>
								<Link href="/contact" className="group">
									<HiMail className="mr-2 h-4 w-4" />
									Get In Touch
								</Link>
							</Button>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

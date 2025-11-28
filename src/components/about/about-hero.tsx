"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { HiDownload, HiMail } from "react-icons/hi";

export function AboutHero() {
	const [imageError, setImageError] = useState(false);
	return (
		<section className="py-20 lg:py-32 bg-background">
			<div className="container mx-auto max-w-screen-2xl px-4">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left Column - Image */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className="relative"
					>
						<div className="relative w-full mx-auto lg:mx-0">
							<div className="relative">
								<div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 rounded-2xl blur-3xl" />
								<div className="relative z-10 aspect-square rounded-2xl overflow-hidden glass border-2 border-primary/20">
									{/* Profile image with fallback placeholder */}
									<div className="relative w-full h-full">
										{!imageError ? (
											<Image
												src="/images/profile/profile-image.jpg"
												alt="Dasun Sri profile"
												fill
												className="object-cover"
												onError={() => setImageError(true)}
												priority
											/>
										) : (
											<div className="w-full h-full bg-muted flex items-center justify-center">
												<div className="text-center space-y-2">
													<div className="text-6xl">👨‍💻</div>
													<p className="text-sm text-muted-foreground">
														Profile Photo
													</p>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Right Column - Content */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="space-y-8"
					>
						<div className="space-y-4">
							<div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
								<span className="gradient-text font-medium">About Me</span>
							</div>

							<h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
								<span className="text-foreground">Building </span>
								<span className="gradient-text">Digital Experiences</span>
							</h1>
						</div>

						<div className="space-y-6 text-muted-foreground">
							<p className="text-lg">
								I&apos;m Alex Chen, a full stack developer with over 5 years of
								experience creating digital solutions that bridge the gap
								between design and technology. My passion lies in building
								products that not only solve real problems but also deliver
								exceptional user experiences.
							</p>

							<p>
								My journey into tech started with a curiosity about how websites
								work, which quickly evolved into a fascination with modern web
								technologies. Today, I specialize in React, Next.js, TypeScript,
								and emerging technologies like AI integration and WebGL.
							</p>

							<p>
								When I&apos;m not coding, you&apos;ll find me contributing to open source
								projects, writing technical articles, mentoring junior
								developers, or exploring the latest developments in web
								standards and performance optimization.
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-4">
							<Button asChild className="btn-neon glow-cyan font-semibold">
								<a
									href="/resume/alex-chen-resume.pdf"
									download
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
								className="font-semibold hover:glow-magenta"
							>
								<Link href="/contact">
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

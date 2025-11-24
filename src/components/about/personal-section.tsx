"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	HiMail,
	HiHeart,
	HiLightBulb,
	HiUsers,
	HiGlobe,
	HiAcademicCap,
} from "react-icons/hi";

const interests = [
	{
		icon: HiLightBulb,
		title: "Innovation",
		description:
			"Always exploring new technologies and pushing the boundaries of what's possible",
	},
	{
		icon: HiUsers,
		title: "Mentoring",
		description:
			"Passionate about helping junior developers grow and sharing knowledge",
	},
	{
		icon: HiGlobe,
		title: "Open Source",
		description:
			"Contributing to the community and building tools that developers love",
	},
	{
		icon: HiAcademicCap,
		title: "Learning",
		description:
			"Continuous learning enthusiast, always staying current with industry trends",
	},
];

const personalStats = [
	{ label: "Coffee Cups", value: "∞", icon: "☕" },
	{ label: "Side Projects", value: "20+", icon: "🚀" },
	{ label: "Blog Posts", value: "50+", icon: "✍️" },
	{ label: "Conferences", value: "15+", icon: "🎤" },
];

export function PersonalSection() {
	return (
		<section className="py-20 lg:py-32 bg-muted/20">
			<div className="container mx-auto max-w-screen-2xl px-4">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Left Column - Personal Info */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="space-y-8"
					>
						<div className="space-y-4">
							<div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
								<span className="gradient-text font-medium">Beyond Code</span>
							</div>

							<h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
								<span className="text-foreground">Personal </span>
								<span className="gradient-text">Values</span>
							</h2>
						</div>

						<div className="space-y-6 text-muted-foreground">
							<p className="text-lg">
								Technology is more than just code to me—it's a tool for creating
								meaningful connections and solving real-world problems. I
								believe in building inclusive, accessible, and sustainable
								digital solutions.
							</p>

							<p>
								When I'm not at my computer, you might find me hiking local
								trails, experimenting with photography, reading sci-fi novels,
								or contributing to open source projects. I'm also an active
								member of the local tech community and regularly speak at
								meetups and conferences.
							</p>
						</div>

						{/* Interests Grid */}
						<div className="grid grid-cols-2 gap-4">
							{interests.map((interest, index) => (
								<motion.div
									key={interest.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
								>
									<Card className="h-full hover:shadow-lg transition-shadow">
										<CardContent className="p-4 text-center space-y-3">
											<interest.icon className="h-8 w-8 text-primary mx-auto" />
											<h3 className="font-semibold text-foreground">
												{interest.title}
											</h3>
											<p className="text-xs text-muted-foreground leading-relaxed">
												{interest.description}
											</p>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>

						<div className="pt-4">
							<Button asChild className="btn-neon glow-cyan font-semibold">
								<Link href="/contact" className="group">
									<HiMail className="mr-2 h-4 w-4" />
									Let's Connect
								</Link>
							</Button>
						</div>
					</motion.div>

					{/* Right Column - Fun Stats */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="space-y-8"
					>
						<Card className="glass border-primary/20">
							<CardContent className="p-8">
								<div className="text-center space-y-6">
									<div className="space-y-2">
										<h3 className="text-2xl font-bold gradient-text">
											Fun Facts
										</h3>
										<p className="text-sm text-muted-foreground">
											Some personal stats that define my journey
										</p>
									</div>

									<div className="grid grid-cols-2 gap-6">
										{personalStats.map((stat, index) => (
											<motion.div
												key={stat.label}
												initial={{ opacity: 0, scale: 0.8 }}
												whileInView={{ opacity: 1, scale: 1 }}
												viewport={{ once: true }}
												transition={{ duration: 0.5, delay: index * 0.1 }}
												className="text-center space-y-2"
											>
												<div className="text-3xl">{stat.icon}</div>
												<div className="text-2xl font-bold text-primary">
													{stat.value}
												</div>
												<div className="text-xs text-muted-foreground">
													{stat.label}
												</div>
											</motion.div>
										))}
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="overflow-hidden">
							<CardContent className="p-0">
								<div className="relative h-64 bg-primary/5 flex items-center justify-center">
									{/* Quote section */}
									<div className="text-center space-y-4 px-6">
										<blockquote className="text-lg font-medium text-foreground italic">
											"The best way to predict the future is to create it."
										</blockquote>
										<cite className="text-sm text-muted-foreground">
											— Peter Drucker
										</cite>
									</div>

									{/* Decorative elements */}
									<div className="absolute top-4 left-4 w-8 h-8 border-2 border-primary/20 rounded-lg rotate-12" />
									<div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-accent/20 rounded-full" />
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

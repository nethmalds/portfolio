"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
	HiMail,
	HiPhone,
	HiLocationMarker,
	HiArrowRight,
} from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter, FaDribbble } from "react-icons/fa";

const contactMethods = [
	{
		icon: HiMail,
		label: "Email",
		value: "hello@alexchen.dev",
		href: "mailto:hello@alexchen.dev",
		primary: true,
	},
	{
		icon: HiLocationMarker,
		label: "Location",
		value: "San Francisco, CA",
		href: null,
		primary: false,
	},
	{
		icon: HiPhone,
		label: "Phone",
		value: "+1 (555) 123-4567",
		href: "tel:+15551234567",
		primary: false,
	},
];

const socialLinks = [
	{
		icon: FaGithub,
		label: "GitHub",
		href: "https://github.com/alexchen",
		color: "hover:text-gray-400",
	},
	{
		icon: FaLinkedin,
		label: "LinkedIn",
		href: "https://linkedin.com/in/alexchen",
		color: "hover:text-blue-400",
	},
	{
		icon: FaTwitter,
		label: "Twitter",
		href: "https://twitter.com/alexchen_dev",
		color: "hover:text-blue-400",
	},
	{
		icon: FaDribbble,
		label: "Dribbble",
		href: "https://dribbble.com/alexchen",
		color: "hover:text-pink-400",
	},
];

export function ContactPreview() {
	return (
		<section className="py-20 lg:py-32 bg-background">
			<div className="container mx-auto max-w-screen-2xl px-4">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left Column - Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="space-y-8"
					>
						{/* Header */}
						<div className="space-y-4">
							<div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
								<span className="gradient-text font-medium">Get In Touch</span>
								<div className="ml-2 h-2 w-2 rounded-full bg-primary animate-glow" />
							</div>

							<h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
								<span className="text-foreground">Let's Build </span>
								<span className="gradient-text">Something Amazing</span>
							</h2>

							<p className="text-lg text-muted-foreground max-w-lg">
								Have a project in mind? I'm always excited to collaborate on
								innovative ideas and bring them to life. Let's discuss how we
								can work together.
							</p>
						</div>

						{/* Contact Methods */}
						<div className="space-y-4">
							{contactMethods.map((method, index) => (
								<motion.div
									key={method.label}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									className={method.href ? "cursor-pointer" : ""}
								>
									<Card
										className={`transition-all duration-300 ${method.primary ? "border-primary/50 hover:border-primary" : "hover:shadow-md"}`}
									>
										<CardContent className="p-4">
											<div className="flex items-center space-x-4">
												<div
													className={`flex h-10 w-10 items-center justify-center rounded-lg ${method.primary ? "bg-primary text-primary-foreground" : "bg-muted"}`}
												>
													<method.icon className="h-5 w-5" />
												</div>
												<div className="flex-1">
													<div className="text-sm text-muted-foreground">
														{method.label}
													</div>
													{method.href ? (
														<Link
															href={method.href}
															className="text-foreground hover:text-primary transition-colors font-medium"
														>
															{method.value}
														</Link>
													) : (
														<div className="text-foreground font-medium">
															{method.value}
														</div>
													)}
												</div>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>

						{/* Social Links */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
							className="space-y-4"
						>
							<h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
								Connect With Me
							</h3>
							<div className="flex space-x-4">
								{socialLinks.map((social, index) => (
									<motion.a
										key={social.label}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										initial={{ opacity: 0, scale: 0.8 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true }}
										transition={{ duration: 0.3, delay: index * 0.1 }}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
										className={`flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-all duration-300 hover:bg-muted/80 ${social.color} focus-ring`}
										aria-label={social.label}
									>
										<social.icon className="h-5 w-5" />
									</motion.a>
								))}
							</div>
						</motion.div>
					</motion.div>

					{/* Right Column - CTA */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="lg:text-right"
					>
						<Card className="glass border-primary/20 hover:border-primary/40 transition-all duration-300">
							<CardContent className="p-8 text-center space-y-6">
								<div className="space-y-4">
									<div className="text-4xl">🚀</div>
									<h3 className="text-2xl font-bold">Ready to Start?</h3>
									<p className="text-muted-foreground">
										Let's discuss your project and turn your ideas into reality.
										I respond to all inquiries within 24 hours.
									</p>
								</div>

								<div className="space-y-4">
									<Button
										asChild
										size="lg"
										className="w-full btn-neon glow-cyan font-semibold"
									>
										<Link href="/contact" className="group">
											Start a Project
											<HiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
										</Link>
									</Button>

									<Button
										asChild
										variant="outline"
										size="lg"
										className="w-full hover:glow-magenta font-semibold"
									>
										<Link href="/work">View My Work</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

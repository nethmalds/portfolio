"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { HiMail, HiPhone, HiLocationMarker, HiClock } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter, FaDribbble } from "react-icons/fa";

const contactMethods = [
	{
		icon: HiMail,
		label: "Email",
		value: "hello@alexchen.dev",
		href: "mailto:hello@alexchen.dev",
		description: "Best way to reach me",
	},
	{
		icon: HiPhone,
		label: "Phone",
		value: "+1 (555) 123-4567",
		href: "tel:+15551234567",
		description: "Available during business hours",
	},
	{
		icon: HiLocationMarker,
		label: "Location",
		value: "San Francisco, CA",
		href: null,
		description: "Open to remote opportunities",
	},
	{
		icon: HiClock,
		label: "Response Time",
		value: "Within 24 hours",
		href: null,
		description: "Usually much faster!",
	},
];

const socialLinks = [
	{
		icon: FaGithub,
		label: "GitHub",
		href: "https://github.com/alexchen",
		username: "@alexchen",
		color: "hover:text-gray-400",
	},
	{
		icon: FaLinkedin,
		label: "LinkedIn",
		href: "https://linkedin.com/in/alexchen",
		username: "in/alexchen",
		color: "hover:text-blue-400",
	},
	{
		icon: FaTwitter,
		label: "Twitter",
		href: "https://twitter.com/alexchen_dev",
		username: "@alexchen_dev",
		color: "hover:text-blue-400",
	},
	{
		icon: FaDribbble,
		label: "Dribbble",
		href: "https://dribbble.com/alexchen",
		username: "alexchen",
		color: "hover:text-pink-400",
	},
];

export function ContactInfo() {
	return (
		<div className="space-y-8">
			{/* Contact Methods */}
			<div className="space-y-6">
				<h2 className="text-2xl font-bold text-foreground">Get In Touch</h2>

				<div className="space-y-4">
					{contactMethods.map((method, index) => (
						<motion.div
							key={method.label}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<Card className="transition-all duration-300 hover:shadow-lg hover:border-primary/30">
								<CardContent className="p-6">
									<div className="flex items-start space-x-4">
										<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
											<method.icon className="h-6 w-6" />
										</div>
										<div className="flex-1 min-w-0">
											<h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
												{method.label}
											</h3>
											{method.href ? (
												<a
													href={method.href}
													className="text-lg font-medium text-foreground hover:text-primary transition-colors focus-ring rounded"
												>
													{method.value}
												</a>
											) : (
												<p className="text-lg font-medium text-foreground">
													{method.value}
												</p>
											)}
											<p className="text-sm text-muted-foreground mt-1">
												{method.description}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>

			{/* Social Links */}
			<div className="space-y-6">
				<h3 className="text-xl font-semibold text-foreground">
					Connect Online
				</h3>

				<div className="grid grid-cols-2 gap-4">
					{socialLinks.map((social, index) => (
						<motion.a
							key={social.label}
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="group focus-ring rounded-lg"
						>
							<Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/30 group-hover:bg-muted/30">
								<CardContent className="p-4 text-center space-y-3">
									<social.icon
										className={`h-8 w-8 mx-auto text-muted-foreground group-hover:scale-110 transition-all ${social.color}`}
									/>
									<div>
										<h4 className="font-semibold text-foreground">
											{social.label}
										</h4>
										<p className="text-sm text-muted-foreground">
											{social.username}
										</p>
									</div>
								</CardContent>
							</Card>
						</motion.a>
					))}
				</div>
			</div>

			{/* Availability Status */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.6 }}
			>
				<Card className="border-primary/20 bg-primary/5">
					<CardContent className="p-6">
						<div className="flex items-center space-x-4">
							<div className="flex h-3 w-3">
								<span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-primary opacity-75"></span>
								<span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
							</div>
							<div>
								<h3 className="font-semibold text-foreground">
									Currently Available
								</h3>
								<p className="text-sm text-muted-foreground">
									Open to new opportunities and exciting projects
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}

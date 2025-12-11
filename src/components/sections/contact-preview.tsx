"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import {
	FaGithub,
	FaLinkedin,
	FaStackOverflow,
	FaPinterest,
	FaWhatsapp,
} from "react-icons/fa";
import { ContactForm } from "@/components/contact/contact-form";

const contactGroups = [
	{
		items: [
			{
				icon: HiMail,
				label: "Email",
				value: "contact@dasunsri.dev",
				href: "mailto:contact@dasunsri.dev",
			},
			{
				icon: HiPhone,
				label: "Phone",
				value: "+94 74 153 0326",
				href: "tel:+94741530326",
			},
			{
				icon: FaWhatsapp,
				label: "WhatsApp",
				value: "+94 74 153 0326",
				href: "https://wa.me/94741530326",
			},
		],
		primary: true,
	},
	{
		items: [
			{
				icon: HiLocationMarker,
				label: "Location",
				value: "Sri Lanka",
				href: undefined,
			},
		],
		primary: false,
	},
];

const socialLinks = [
	{
		icon: FaGithub,
		label: "GitHub",
		href: "https://github.com/nethmalds",
		color: "hover:text-gray-100",
	},
	{
		icon: FaLinkedin,
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/dasun-sri",
		color: "hover:text-blue-400",
	},
	{
		icon: FaStackOverflow,
		label: "Stack Overflow",
		href: "https://stackoverflow.com/users/30965245/dasun-sri-nethmal",
		color: "hover:text-orange-400",
	},
	{
		icon: FaPinterest,
		label: "Pinterest",
		href: "https://pin.it/7Dwp8e31i",
		color: "hover:text-red-400",
	},
];

export function ContactPreview() {
	return (
		<section id="contact" className="py-12 sm:py-16 lg:pt-32 bg-background overflow-x-hidden">
			<div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
					{/* Left Column - Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="space-y-6 sm:space-y-8"
					>
						{/* Header */}
						<div className="space-y-3 sm:space-y-4">
							<div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
								<span className="gradient-text font-medium">Get In Touch</span>
								<div className="ml-2 h-2 w-2 rounded-full bg-primary animate-glow" />
							</div>

							<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
								<span className="text-foreground">Let&apos;s Build </span>
								<span className="gradient-text">Something Amazing</span>
							</h2>

							<p className="text-base sm:text-lg text-muted-foreground max-w-lg">
								Have a project in mind? I&apos;m always excited to collaborate
								on innovative ideas and bring them to life. Let&apos;s discuss
								how we can work together.
							</p>
						</div>

						{/* Contact Methods */}
						<div className="space-y-6">
							{contactGroups.map((group, groupIndex) => (
								<motion.div
									key={groupIndex}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
								>
									<Card
										className={`transition-all p-0 duration-300 ${group.primary ? "border-primary/50 hover:border-primary py-4 px-8" : "hover:shadow-md"}`}
									>
										<CardContent className="p-0">
											{group.items.map((item) => (
												<div key={item.label}>
													{item.label === "Location" ? (
														<div className="w-full overflow-hidden rounded-lg">
															<iframe
																src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3963.9329533635314!2d79.99770167499298!3d6.530152393462526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMzEnNDguNiJOIDgwwrAwMCcwMS4wIkU!5e0!3m2!1sen!2slk!4v1764856303973!5m2!1sen!2slk"
																width="100%"
																height="360"
																style={{ border: 0 }}
																allowFullScreen
																loading="lazy"
																className="rounded-lg opacity-65 hover:opacity-100 transition-opacity duration-300 w-full"
																title="Location Map"
															></iframe>
														</div>
													) : (
														<div className="flex items-center space-x-4 py-3">
															<div
																className={`flex h-10 w-10 items-center justify-center rounded-lg ${group.primary ? "bg-primary text-primary-foreground" : "bg-muted"}`}
															>
																<item.icon className="h-5 w-5" />
															</div>
															<div className="flex-1">
																<div className="text-sm text-muted-foreground">
																	{item.label}
																</div>
																{item.href ? (
																	<Link
																		href={item.href}
																		className="text-foreground hover:text-primary transition-colors font-medium"
																	>
																		{item.value}
																	</Link>
																) : (
																	<div className="text-foreground font-medium">
																		{item.value}
																	</div>
																)}
															</div>
														</div>
													)}
												</div>
											))}
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Right Column - Social Links and Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<ContactForm />
						{/* Social Links (moved to bottom) */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
							className="space-y-4 mt-8"
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
				</div>
			</div>
		</section>
	);
}

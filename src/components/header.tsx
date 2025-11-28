"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	HiMenu,
} from "react-icons/hi";

const navigation = [
	{ name: "Work", href: "/work" },
	{ name: "About", href: "/about" },
	{ name: "Blog", href: "/blog" },
	{ name: "Contact", href: "/contact" },
];

export function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			setScrolled(scrollY > 200);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.header
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className={`fixed top-0 z-50 w-full transition-all duration-300 ${
				scrolled ? "backdrop-blur-sm pt-4" : "pt-8"
			}`}
		>
			<div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
				{/* Logo */}
				<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
					<Link
						href="/"
						className="flex items-center space-x-2 focus-ring rounded-lg"
					>
						<div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
							<span className="text-sm font-bold text-primary-foreground">
								DS
							</span>
						</div>
						<span className="hidden font-semibold text-xl text-foreground sm:inline-block">
							Dasun Sri Nethmal
						</span>
					</Link>
				</motion.div>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex md:items-center md:space-x-4">
					{navigation.map((item) => (
						<motion.div
							key={item.name}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Link
								href={item.href}
								className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground focus-ring rounded-lg px-3 py-2"
							>
								{item.name}
							</Link>
						</motion.div>
					))}
				</nav>

				{/* Mobile Menu */}
				<Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
					<DialogTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden focus-ring"
							aria-label="Open menu"
						>
							<HiMenu className="h-5 w-5" />
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[300px] glass">
						<DialogHeader>
							<DialogTitle className="gradient-text">Navigation</DialogTitle>
						</DialogHeader>
						<nav className="flex flex-col space-y-4">
							{navigation.map((item, index) => (
								<motion.div
									key={item.name}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
								>
									<Link
										href={item.href}
										onClick={() => setMobileMenuOpen(false)}
										className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground focus-ring rounded-lg p-3 block"
									>
										{item.name}
									</Link>
								</motion.div>
							))}
						</nav>
					</DialogContent>
				</Dialog>
			</div>
		</motion.header>
	);
}

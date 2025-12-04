"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SplineViewer } from "@/components/spline-viewer";
import Link from "next/link";
import { HiArrowRight, HiMail } from "react-icons/hi";
import Aurora from "../ui/aurora";

export function HeroSection() {
	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Plasma Background Animation */}
			<div className="absolute inset-0">
				<Aurora
					colorStops={["#00ffff", "#0080ff", "#00ffff"]}
					blend={0.5}
					amplitude={1.0}
					speed={0.5}
				/>
			</div>

			{/* Background gradient overlay */}
			<div className="absolute inset-0 pointer-events-none" />

			<div className="container mx-auto max-w-screen-2xl px-4 relative z-10">
				<div className="grid lg:grid-cols-7 gap-12 lg:gap-8 items-center min-h-[calc(100vh-4rem)]">
					{/* Left Column - Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
						className="space-y-8 text-center lg:text-left lg:col-span-4"
					>
						{/* Badge */}
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 1.2, duration: 0.5 }}
							className="inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-2 text-sm"
						>
							<span className="gradient-text font-medium">
								Available for new opportunities
							</span>
							<div className="ml-2 h-2 w-2 rounded-full bg-primary animate-glow" />
						</motion.div>

						{/* Main heading */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.3, duration: 0.8 }}
							className="space-y-4"
						>
							<h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
								<span className="text-foreground">Hi, I&apos;m </span>
								<span className="text-primary">Dasun Sri Nethmal</span>
							</h1>
							<h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground">
								Software Engineer, AI Enthusiast & Tech Innovator
							</h2>
						</motion.div>

						{/* Description */}
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.5, duration: 0.8 }}
							className="text-lg text-muted-foreground max-w-3xl"
						>
							I craft exceptional digital experiences through modern web
							technologies, intelligent automation, and thoughtful user-centered
							design. My work blends full-stack engineering, AI-powered
							features, and scalable architectures to create products that feel
							seamless, intuitive, and future-ready.
						</motion.p>

						{/* CTAs */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.7, duration: 0.8 }}
							className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
						>
							<Button
								asChild
								size="lg"
								className="btn-neon glow-cyan font-semibold"
							>
								<Link href="/work" className="group">
									View My Work
									<HiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>

							<Button
								asChild
								variant="outline"
								size="lg"
								className="font-semibold hover:glow-magenta hover:text-white/70"
							>
								<Link href="#contact" className="group">
									<HiMail className="mr-2 h-4 w-4" />
									Get In Touch
								</Link>
							</Button>
						</motion.div>

						{/* Quick stats */}
						{/* <motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.9, duration: 0.8 }}
							className="grid grid-cols-3 gap-6 pt-8"
						>
							{[
								{ label: "Years Experience", value: "5+" },
								{ label: "Projects Completed", value: "50+" },
								{ label: "Happy Clients", value: "30+" },
							].map((stat, index) => (
								<div key={stat.label} className="text-center lg:text-left">
									<div className="text-2xl font-bold text-primary">
										{stat.value}
									</div>
									<div className="text-sm text-muted-foreground">
										{stat.label}
									</div>
								</div>
							))}
						</motion.div> */}
					</motion.div>

					{/* Right Column - 3D Scene */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
						className="relative h-[400px] lg:h-[1000px] lg:w-full lg:col-span-3"
					>
						<SplineViewer />
					</motion.div>
				</div>
			</div>

			{/* Scroll indicator */}
			{/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full animate-bounce mt-2" />
          </div>
        </div>
      </motion.div> */}
		</section>
	);
}

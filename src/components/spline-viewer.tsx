"use client";

import { Component, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

// Client-only dynamic import avoids SSR issues
const Spline = dynamic(() => import("@splinetool/react-spline"), {
	ssr: false,
});

// Allow override via env; keep previous default as fallback
const DEFAULT_SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL;

class ErrorBoundary extends Component<
	{ fallback: React.ReactNode; children: React.ReactNode },
	{ hasError: boolean }
> {
	constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
		super(props);
		this.state = { hasError: false };
	}
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	componentDidCatch(error: unknown) {
		console.error("Spline viewer crashed:", error);
	}
	render() {
		if (this.state.hasError) return this.props.fallback;
		return this.props.children;
	}
}

export function SplineViewer({ scene }: { scene?: string }) {
	const sceneUrl = useMemo(() => scene || DEFAULT_SCENE_URL, [scene]);

	return (
		<div className="relative w-full h-full">
			<ErrorBoundary fallback={<SplineFallback />}>
				{sceneUrl ? (
					<div className="w-full h-full flex items-center justify-center">
						<Spline
							scene={sceneUrl}
							className=""
							onLoad={() => {
								console.log("Spline scene loaded successfully");
							}}
							onError={(error) => {
								console.error("Spline scene failed to load:", error);
								// Re-throw to let the ErrorBoundary show fallback
								throw error;
							}}
						/>
					</div>
				) : (
					<SplineFallback />
				)}
			</ErrorBoundary>
		</div>
	);
}

function SplineFallback() {
	return (
		<div className="relative w-full h-full">
			<div className="absolute inset-0 flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className="text-center space-y-4"
				>
					<div className="w-32 h-32 mx-auto rounded-full bg-linear-to-br from-primary to-accent animate-pulse" />
					<div>
						<h3 className="text-lg font-semibold text-foreground">
							Interactive 3D Scene
						</h3>
						<p className="text-sm text-muted-foreground">
							Loading immersive experience...
						</p>
					</div>
					<div className="flex justify-center">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
					</div>
				</motion.div>
			</div>

			<div className="absolute inset-0">
				<motion.div
					animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
					transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
					className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-primary/20 rounded-lg"
				/>
				<motion.div
					animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
					transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
					className="absolute bottom-1/4 right-1/4 w-12 h-12 border-2 border-accent/20 rounded-full"
				/>
			</div>
		</div>
	);
}

// Mobile optimized fallback
export function MobileSplineFallback() {
	return (
		<div className="relative w-full h-full flex items-center justify-center">
			<Image
				src="/images/hero-3d-fallback.jpg"
				alt="3D Scene Preview"
				fill
				className="object-cover"
				placeholder="blur"
				blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKECEQERIRFRERFRQhFRAYGhsYGhcRFhshGhkeGhseFCAhJSoiFCccJxsdGCA/Fhv/wAARCAAgACgDASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAwQFBgIB/8QALBAAAQQBAwMEAAcAAAAAAAAAAQIDEQAEBRIhQVFhIoGRsQYHEyNSocHh8P/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAHBEAAgIDAQEAAAAAAAAAAAAAAAgJAQMhMkH/2gAMAwEAAhEDEQA/AKe2tZmJD2VGI/dTGXKQ0KfDSVElICwAKBUedR8rjpOLUGZzS2oivJxVTBQTqOtcg0kkqOxVi7cSr3obhocKq2Lh2yQjDmXjMPqjqckOWChJTdOVRJP+aZUcyVLo/ELgKRJlK3JBLJClBF8hR/0CpJ7VdYu5syFJjSGJDZCXXYinz6qHnuKkZOPPJqBAZRdEK1CeGRQKj5A+O9QNOm3c26YrYdC6M9JU2C4pKaGgAOOwP1rv8xlZkXUH5eBGizZzx3YhZJSQOdqhySQKJ6V/9k="
			/>

			<div className="absolute inset-0 bg-black/20 flex items-center justify-center">
				<div className="text-center">
					<h3 className="text-lg font-semibold text-white">
						Interactive 3D Experience
					</h3>
					<p className="text-sm text-white/80">
						Visit on desktop for full interaction
					</p>
				</div>
			</div>
		</div>
	);
}

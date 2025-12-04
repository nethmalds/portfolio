"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
	CertificationCard,
	CertificationType,
} from "@/components/certification-card";

export default function CertificationsSection() {
	const [certifications, setCertifications] = useState<CertificationType[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;

		async function loadCertifications() {
			setLoading(true);
			setError(null);

			try {
				const res = await fetch("/api/certifications?featured=true&limit=5");
				if (!res.ok)
					throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
				const json = await res.json();
				if (mounted) {
					const raw = (json.data || []) as unknown[];
					const list: CertificationType[] = raw.map((c) => {
						const obj = c as Record<string, unknown>;
						return {
							id: String(obj.id ?? ""),
							title: String(obj.title ?? ""),
							issuer: String(obj.issuer ?? ""),
							issueDate: String(obj.issueDate ?? ""),
							expiryDate: (obj.expiryDate as string) ?? undefined,
							credentialId: (obj.credentialId as string) ?? undefined,
							credentialUrl: (obj.credentialUrl as string) ?? undefined,
							description: (obj.description as string) ?? undefined,
							image: (obj.image as string) ?? undefined,
							skills: (obj.skills as string[]) ?? [],
						} as CertificationType;
					});

					setCertifications(list);
				}
			} catch (err: unknown) {
				const error = err as Error;
				if (mounted) setError(error?.message || String(error));
			} finally {
				if (mounted) setLoading(false);
			}
		}

		loadCertifications();

		return () => {
			mounted = false;
		};
	}, []);

	if (error) {
		console.error("Error fetching certifications", error);
		return null;
	}

	return (
		<section className="py-12 sm:py-16 lg:py-32 bg-muted/30 overflow-x-hidden">
			<div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16"
				>
					<div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
						<span className="gradient-text font-medium">Certifications</span>
					</div>

					<h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight">
						<span className="text-foreground">Professional </span>
						<span className="gradient-text">Certifications</span>
					</h2>

					<p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
						Validated expertise and continuous learning in cutting-edge
						technologies and industry best practices.
					</p>
				</motion.div>

				{/* Certifications Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
					{loading ? (
						Array.from({ length: 4 }).map((_, index) => (
							<div
								key={`skeleton-${index}`}
								className="animate-pulse h-full border rounded-lg bg-background p-4 flex flex-col justify-between"
							>
								<div className="pb-3">
									<div className="h-4 bg-muted/30 rounded w-3/4 mb-2" />
									<div className="h-3 bg-muted/20 rounded w-1/2" />
								</div>
								<div>
									<div className="h-3 bg-muted/20 rounded w-full mb-2" />
									<div className="h-3 bg-muted/20 rounded w-2/3" />
								</div>
							</div>
						))
					) : (
						<>
							{certifications.map((certification, index) => (
								<motion.div
									key={certification.id}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 1.8, delay: index * 0.1 }}
								>
									<CertificationCard certification={certification} />
								</motion.div>
							))}
						</>
					)}
				</div>

				{/* View All Certifications CTA */}
				{/*  <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="btn-neon hover:glow-cyan font-semibold"
          >
            <Link href="/about" className="group">
              View All Certifications
              <HiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div> */}
			</div>
		</section>
	);
}

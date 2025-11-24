import { Metadata } from "next";
import WorkGrid from "@/components/work-grid";

export const metadata: Metadata = {
	title: "Work",
	description:
		"A collection of my recent projects, case studies, and technical experiments in web development, mobile apps, and AI integration.",
	keywords: [
		"portfolio",
		"projects",
		"web development",
		"mobile apps",
		"AI",
		"case studies",
	],
	openGraph: {
		title: "Work - Alex Chen Portfolio",
		description:
			"Explore my recent projects and case studies in modern web development.",
	},
};

export default function WorkPage() {
	return (
		<div className="container mx-auto max-w-screen-2xl px-4 py-16">
			<div className="space-y-8 mb-16">
				<div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
					<span className="gradient-text font-medium">Portfolio</span>
				</div>

				<div className="space-y-4">
					<h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
						<span className="text-foreground">My </span>
						<span className="gradient-text">Work</span>
					</h1>
					<p className="text-xl text-muted-foreground max-w-3xl">
						A curated collection of projects that showcase my expertise in
						modern web development, mobile applications, and emerging
						technologies. Each project tells a story of problem-solving and
						innovation.
					</p>
				</div>
			</div>

			<WorkGrid />
		</div>
	);
}

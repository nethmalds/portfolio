import { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { ExperienceSection } from "@/components/about/experience-section";
import { SkillsSection } from "@/components/about/skills-section";
import { PersonalSection } from "@/components/about/personal-section";

export const metadata: Metadata = {
	title: "About",
	description:
		"Learn more about Alex Chen - my background, experience, skills, and passion for technology and innovation.",
	keywords: [
		"about",
		"experience",
		"skills",
		"background",
		"full stack developer",
	],
	openGraph: {
		title: "About - Alex Chen Portfolio",
		description:
			"Full stack developer with 5+ years of experience in modern web technologies.",
	},
};

export default function AboutPage() {
	return (
		<div className="flex flex-col">
			<AboutHero />
			<ExperienceSection />
			<SkillsSection />
			<PersonalSection />
		</div>
	);
}

import { HeroSection } from "@/components/sections/hero-section";
import FeaturedWork from "@/components/sections/featured-work";
import { AboutPreview } from "@/components/sections/about-preview";
import { ContactPreview } from "@/components/sections/contact-preview";

export default function Home() {
	return (
		<div className="flex flex-col">
			<HeroSection />
			<FeaturedWork />
			<AboutPreview />
			<ContactPreview />
		</div>
	);
}

import { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";

export const metadata: Metadata = {
	title: "Contact",
	description:
		"Get in touch to discuss your project, collaborate on ideas, or just say hello. I&apos;m always excited to work on innovative projects.",
	keywords: ["contact", "collaborate", "project", "hire", "consultation"],
	openGraph: {
		title: "Contact - Alex Chen Portfolio",
		description: "Let&apos;s work together on your next project.",
	},
};

export default function ContactPage() {
	return (
		<div className="container mx-auto max-w-screen-2xl px-4 py-16">
			<div className="space-y-8 mb-16 text-center">
				<div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
					<span className="gradient-text font-medium">Get In Touch</span>
					<div className="ml-2 h-2 w-2 rounded-full bg-primary animate-glow" />
				</div>

				<div className="space-y-4">
					<h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
						<span className="text-foreground">Let&apos;s Build </span>
						<span className="gradient-text">Together</span>
					</h1>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Have a project in mind? Looking for a technical partner? Or just
						want to chat about the latest in web development? I&apos;d love to
						hear from you.
					</p>
				</div>
			</div>

			<div className="grid lg:grid-cols-2 gap-16 items-start">
				<ContactInfo />
				<ContactForm />
			</div>
		</div>
	);
}

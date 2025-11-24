import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

// TODO: Replace with your actual portfolio metadata
export const metadata: Metadata = {
	title: {
		default: "Alex Chen - Full Stack Developer & Designer",
		template: "%s | Alex Chen Portfolio",
	},
	description:
		"Full stack developer specializing in modern web applications, AI integration, and user-centered design. Building the future, one pixel at a time.",
	keywords: [
		"Full Stack Developer",
		"React",
		"Next.js",
		"TypeScript",
		"AI",
		"Web Design",
		"Frontend",
		"Backend",
	],
	authors: [{ name: "Alex Chen" }],
	creator: "Alex Chen",
	openGraph: {
		type: "website",
		locale: "en_US",
		title: "Alex Chen - Full Stack Developer & Designer",
		description:
			"Full stack developer specializing in modern web applications, AI integration, and user-centered design.",
		siteName: "Alex Chen Portfolio",
		url: "https://alexchen.dev", // TODO: Replace with your actual domain
	},
	twitter: {
		card: "summary_large_image",
		title: "Alex Chen - Full Stack Developer & Designer",
		description: "Building the future, one pixel at a time.",
		creator: "@alexchen_dev", // TODO: Replace with your Twitter handle
	},
	metadataBase: new URL("https://alexchen.dev"), // TODO: Replace with your actual domain
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans dark `}
				suppressHydrationWarning={true}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem={false}
					disableTransitionOnChange
				>
					<div className="relative flex min-h-screen flex-col">
						<Header />
						<main className="flex-1">{children}</main>
						<Toaster />
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}

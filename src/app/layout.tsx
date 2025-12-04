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

export const metadata: Metadata = {
	title: {
		default: "Dasun Sri Nethmal - Full Stack Developer & Founder of CodeArch",
		template: "%s | Dasun Sri Nethmal Portfolio",
	},
	description:
		"Computer Science undergraduate and Founder of CodeArch, specializing in modern web and mobile applications using Next.js, Nest.js, Flutter, Laravel, and .NET. Expert in full-stack development, serverless systems, and blockchain technology.",
	keywords: [
		"Full Stack Developer",
		"Next.js",
		"Nest.js",
		"Flutter",
		"Laravel",
		".NET",
		"TypeScript",
		"React",
		"MongoDB",
		"MySQL",
		"Blockchain",
		"Smart Contracts",
		"DApps",
		"Microservices",
		"UI/UX Design",
		"CodeArch",
	],
	authors: [{ name: "Dasun Sri Nethmal" }],
	creator: "Dasun Sri Nethmal",
	openGraph: {
		type: "website",
		locale: "en_US",
		title: "Dasun Sri Nethmal - Full Stack Developer & Founder of CodeArch",
		description:
			"Computer Science undergraduate and Founder of CodeArch, specializing in modern web and mobile applications using Next.js, Nest.js, Flutter, Laravel, and .NET.",
		siteName: "Dasun Sri Nethmal Portfolio",
		url: "https://dasun-sri.dev",
	},
	twitter: {
		card: "summary_large_image",
		title: "Dasun Sri Nethmal - Full Stack Developer & Founder of CodeArch",
		description:
			"Building modern web and mobile applications with cutting-edge technology.",
		creator: "@dasun_sri",
	},
	metadataBase: new URL("https://dasun-sri.dev"),
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
						{/* <Header /> */}
						<main className="flex-1">{children}</main>
						<Toaster />
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}

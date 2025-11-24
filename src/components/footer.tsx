import Link from "next/link";
import { HiHeart, HiCode } from "react-icons/hi";

const footerNavigation = {
	main: [
		{ name: "Work", href: "/work" },
		{ name: "About", href: "/about" },
		{ name: "Blog", href: "/blog" },
		{ name: "Contact", href: "/contact" },
	],
	social: [
		{ name: "GitHub", href: "https://github.com", icon: "github" },
		{ name: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
		{ name: "Twitter", href: "https://twitter.com", icon: "twitter" },
	],
};

export function Footer() {
	return (
		<footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto max-w-screen-2xl px-4 py-12">
				<div className="xl:grid xl:grid-cols-3 xl:gap-8">
					{/* Brand */}
					<div className="space-y-8 xl:col-span-1">
						<div className="flex items-center space-x-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
								<span className="text-sm font-bold text-primary-foreground">
									AC
								</span>
							</div>
							<span className="font-bold text-foreground">Alex Chen</span>
						</div>
						<p className="text-sm leading-6 text-muted-foreground">
							Building the future of web development with modern technologies
							and thoughtful design.
						</p>
					</div>

					{/* Navigation */}
					<div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
						<div>
							<h3 className="text-sm font-semibold leading-6 text-foreground">
								Navigation
							</h3>
							<ul role="list" className="mt-6 space-y-4">
								{footerNavigation.main.map((item) => (
									<li key={item.name}>
										<Link
											href={item.href}
											className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors focus-ring rounded px-1"
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div>
							<h3 className="text-sm font-semibold leading-6 text-foreground">
								Connect
							</h3>
							<ul role="list" className="mt-6 space-y-4">
								{footerNavigation.social.map((item) => (
									<li key={item.name}>
										<Link
											href={item.href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors focus-ring rounded px-1"
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				{/* Bottom */}
				<div className="mt-16 border-t border-border/40 pt-8 sm:mt-20 lg:mt-24">
					<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
						<p className="text-xs leading-5 text-muted-foreground">
							&copy; {new Date().getFullYear()} Alex Chen. All rights reserved.
						</p>

						<div className="flex items-center space-x-1 text-xs text-muted-foreground">
							<span>Built with</span>
							<HiHeart className="h-3 w-3 text-red-500" />
							<span>using</span>
							<HiCode className="h-3 w-3 text-primary" />
							<span>Next.js & Tailwind CSS</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

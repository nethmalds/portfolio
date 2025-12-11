import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiArrowLeft } from "react-icons/hi";

export default function ProjectNotFound() {
	return (
		<div className="container mx-auto max-w-5xl px-4 py-20">
			<div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
				<div className="text-8xl mb-6">🔍</div>
				<h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
				<p className="text-xl text-muted-foreground mb-8 max-w-md">
					Sorry, the project you&apos;re looking for doesn&apos;t exist or has been moved.
				</p>
				<div className="flex gap-4">
					<Button asChild size="lg">
						<Link href="/projects">
							<HiArrowLeft className="mr-2 h-5 w-5" />
							View All Projects
						</Link>
					</Button>
					<Button asChild size="lg" variant="outline">
						<Link href="/">Go Home</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}

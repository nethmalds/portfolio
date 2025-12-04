
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiExternalLink, HiOfficeBuilding, HiCalendar } from "react-icons/hi";

export interface CertificationType {
	id: string;
	title: string;
	issuer: string;
	issueDate: string;
	expiryDate?: string;
	credentialId?: string;
	credentialUrl?: string;
	description?: string;
	image?: string;
	skills: string[];
}

export function CertificationCard({ certification }: { certification: CertificationType }) {
	return (
		<Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between mb-2">
					<CardTitle className="text-lg font-semibold leading-tight">
						{certification.title}
					</CardTitle>
					{certification.credentialUrl && (
						<Button
							asChild
							size="icon-sm"
							className="h-8 w-8 bg-transparent hover:bg-transparent text-white hover:text-primary"
						>
							<Link
								href={certification.credentialUrl}
								target="_blank"
								rel="noopener noreferrer"
								title="View Live Site"
							>
								<HiExternalLink className="h-4 w-4" />
							</Link>
						</Button>
					)}
				</div>
				<div className="flex items-center text-sm text-muted-foreground">
					<HiOfficeBuilding className="h-4 w-4 mr-1" />
					{certification.issuer}
				</div>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="flex items-center text-sm text-muted-foreground">
					<HiCalendar className="h-4 w-4 mr-1" />
					Issued {certification.issueDate}
					{certification.expiryDate && (
						<span className="ml-1">• Expires {certification.expiryDate}</span>
					)}
				</div>
				{certification.description && (
					<p className="text-sm text-muted-foreground line-clamp-2">
						{certification.description}
					</p>
				)}
				{certification.skills.length > 0 && (
					<div className="flex flex-wrap gap-1">
						{certification.skills.slice(0, 4).map((skill) => (
							<span
								key={skill}
								className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
							>
								{skill}
							</span>
						))}
						{certification.skills.length > 4 && (
							<span className="text-xs text-muted-foreground">
								+{certification.skills.length - 4} more
							</span>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}

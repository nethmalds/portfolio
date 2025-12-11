import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Project } from "@/models";

export async function GET(request: NextRequest, props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    try {
		await connectDB();

		const slug = params.slug;

		// Find project where the case link matches the slug
		const project = await Project.findOne({
			"links.case": `/projects/${slug}`,
		}).lean();

		if (!project) {
			return NextResponse.json(
				{ error: "Project not found" },
				{ status: 404 }
			);
		}

		// Convert _id to id for client consumption
		const projectData = {
			...project,
			id: String(project._id),
		};
		delete (projectData as any)._id;

		return NextResponse.json({
			message: "Project retrieved",
			data: projectData,
		});
	} catch (error) {
		console.error("Get project error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

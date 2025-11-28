import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Project, IProject } from '@/models';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const featuredParam = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || (featuredParam === 'true' ? '3' : '20'));
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {};
    if (status) query.status = status;

    // If 'featured=true' is sent treat specially — return only projects
    // whose status is either 'Completed' or 'Active'
    if (featuredParam === 'true') {
      query.status = { $in: ['Completed', 'Ongoing'] };
    }

    // when fetching featured, always return exactly 3 items
    const effectiveLimit = featuredParam === 'true' ? 3 : limit;

    // use .lean() so Mongoose returns plain JS objects that serialize cleanly
    // .lean() returns plain objects — map those to include client-friendly `id` (string)
    let projects = await Project.find(query).sort({ createdAt: -1 }).limit(effectiveLimit).skip(skip).lean();
    projects = (projects as Record<string, unknown>[]).map((p) => {
      const obj = p as Record<string, unknown> & { _id?: unknown; id?: string };
      if (obj && obj._id !== undefined) {
        obj.id = String(obj._id);
        delete obj._id;
      }
      return obj;
    });
    const total = await Project.countDocuments(query);

    return NextResponse.json({ message: 'Projects retrieved', data: projects, pagination: { page, limit, total } });
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // minimal validation
    if (!body.title || !body.description || !body.links?.case) {
      return NextResponse.json({ error: 'title, description and case link required' }, { status: 400 });
    }

    const project = new Project(body);
    await project.save();

    return NextResponse.json({ message: 'Project created', data: project }, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

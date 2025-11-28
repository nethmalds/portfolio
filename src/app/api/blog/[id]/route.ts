import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { BlogPost } from '@/models';
import { Types } from 'mongoose';

interface Params {
  params: Promise<{
    id: string; // MongoDB ObjectId
  }>;
}

export async function GET(request: NextRequest, props: Params) {
  const params = await props.params;
  try {
    // Connect to database
    await connectDB();

    const { id } = params;

    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid blog post ID' },
        { status: 400 }
      );
    }

    // Find blog post by ID
    const post = await BlogPost.findById(id).select('-__v');

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await BlogPost.findByIdAndUpdate(post._id, { $inc: { views: 1 } });

    return NextResponse.json({
      message: 'Blog post retrieved successfully',
      data: { ...post.toObject(), views: post.views + 1 },
    });

  } catch (error) {
    console.error('Get blog post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, props: Params) {
  const params = await props.params;
  try {
    // Connect to database
    await connectDB();

    const { id } = params;
    const body = await request.json();

    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid blog post ID' },
        { status: 400 }
      );
    }

    // Find and update blog post
    const post = await BlogPost.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Blog post updated successfully',
      data: post,
    });

  } catch (error: unknown) {
    console.error('Update blog post error:', error);
    const err = error as { name?: string; errors?: Record<string, { message: string }> };

    // Handle validation errors
    if (err.name === 'ValidationError' && err.errors) {
      const validationErrors = Object.values(err.errors).map((e) => e.message);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, props: Params) {
  const params = await props.params;
  try {
    // Connect to database
    await connectDB();

    const { id } = params;

    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid blog post ID' },
        { status: 400 }
      );
    }

    // Find and delete blog post
    const post = await BlogPost.findByIdAndDelete(id);

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Blog post deleted successfully',
    });

  } catch (error) {
    console.error('Delete blog post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
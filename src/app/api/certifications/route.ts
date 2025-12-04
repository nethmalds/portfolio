import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Certification from '@/models/certifications';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '10');

    let query = {};
    if (featured) {
      // For featured, we can sort by createdAt or some other criteria
      query = {};
    }

    const certifications = await Certification.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: certifications,
      count: certifications.length,
    });
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch certifications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const certification = new Certification(body);
    const savedCertification = await certification.save();

    return NextResponse.json({
      success: true,
      data: savedCertification,
    });
  } catch (error) {
    console.error('Error creating certification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create certification' },
      { status: 500 }
    );
  }
}
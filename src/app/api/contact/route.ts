import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail, sendAutoReply, verifyEmailConfig } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, company, subject, message, budget, timeline } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Prepare email data
    const emailData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim(),
      subject: subject?.trim(),
      message: message.trim(),
      budget: budget?.trim(),
      timeline: timeline?.trim(),
    };

    // Send email notification to you
    const emailSent = await sendContactEmail(emailData);
    
    if (!emailSent) {
      throw new Error('Failed to send email notification');
    }

    // Send auto-reply to the submitter (optional, runs in background)
    sendAutoReply(emailData).catch(error => {
      console.error('Auto-reply failed (non-critical):', error);
    });

    return NextResponse.json(
      { 
        message: 'Message sent successfully! Thank you for reaching out.',
        success: true
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again or contact me directly.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Health check endpoint for email configuration
export async function GET() {
  try {
    const isConfigured = await verifyEmailConfig();
    
    return NextResponse.json({
      message: 'Email configuration status',
      configured: isConfigured,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Email config check failed:', error);
    
    return NextResponse.json(
      {
        message: 'Email configuration check failed',
        configured: false,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
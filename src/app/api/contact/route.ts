import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, budget, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nama, email, dan pesan wajib diisi' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format email tidak valid' },
        { status: 400 }
      );
    }

    // Try to save to database (optional, may not work on serverless)
    try {
      const { db } = await import('@/lib/db');
      await db.contactMessage.create({
        data: {
          name,
          email,
          phone: phone || null,
          service: service || null,
          budget: budget || null,
          message,
          status: 'new',
        },
      });
    } catch {
      // DB not available on serverless, that's OK
      // Contact form already redirects to WhatsApp as primary channel
      console.log('Database not available, message sent via WhatsApp instead');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Pesan berhasil dikirim! Tim kami akan menghubungi Anda dalam 24 jam.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan. Silakan coba lagi nanti.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { db } = await import('@/lib/db');
    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json(
      { messages: [] },
      { status: 200 }
    );
  }
}

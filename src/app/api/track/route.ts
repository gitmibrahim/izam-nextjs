import { NextResponse } from 'next/server';

const errorChance = 0.1;

export async function POST(request: Request) {
  if (Math.random() <= errorChance) {
    return new NextResponse(null, { status: 500 });
  }

  try {
    const { id, from, to } = await request.json();

    if (!id || typeof from === "undefined" || typeof to === "undefined") {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse(`Internal Server Error: ${error}`, { status: 500 });
  }
}
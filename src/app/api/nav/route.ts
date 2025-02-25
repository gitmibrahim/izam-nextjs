import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const errorChance = 0.1;
const navPath = path.join(process.cwd(), 'nav.json');

// Middleware to simulate random errors
const simulateError = () => Math.random() <= errorChance;

export async function GET() {
  if (simulateError()) {
    return new NextResponse(null, { status: 500 });
  }

  try {
    if (fs.existsSync(navPath)) {
      const data = JSON.parse(fs.readFileSync(navPath, 'utf8'));
      return NextResponse.json(data);
    }

    return NextResponse.json([
      { id: 1, title: "Dashboard", target: "/" },
      {
        id: 2,
        title: "Job Applications",
        target: "/applications",
        children: [
          { id: 7, title: "John Doe", target: "/applications/john-doe" },
          { id: 10, title: "James Bond", target: "/applications/james-bond" },
          { id: 20, title: "Scarlett Johansson", target: "/applications/scarlett-johansson", visible: false },
        ],
      },
      {
        id: 3,
        title: "Companies",
        target: "/companies",
        visible: false,
        children: [
          { id: 8, title: "Tanqeeb", target: "/companies/1" },
          { id: 9, title: "Daftra", target: "/companies/2" },
          { id: 11, title: "TBD", target: "/companies/14" },
        ],
      },
      {
        id: 4,
        title: "Qualifications",
        children: [
          { id: 14, title: "Q1", target: "/q1" },
          { id: 15, title: "Q2", target: "/q2" },
        ],
      },
      { id: 5, title: "About", target: "/about" },
      { id: 6, title: "Contact", target: "/contact" },
    ]);
  } catch (error) {
    return new NextResponse(`Internal Server Error: ${error}`, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (simulateError()) {
    return new NextResponse(null, { status: 500 });
  }

  try {
    const items = await request.json();
    
    if (!Array.isArray(items)) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    fs.writeFileSync(navPath, JSON.stringify(items));
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse(`Internal Server Error: ${error}`, { status: 500 });
  }
}
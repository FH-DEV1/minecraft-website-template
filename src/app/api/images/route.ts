import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const imagesDirectory = path.join(process.cwd(), 'public/images');
  const filenames = fs.readdirSync(imagesDirectory);
  
  return NextResponse.json({ images: filenames });
}

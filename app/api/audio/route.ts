import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  let folder = request.nextUrl.searchParams.get('folder');
  const file = request.nextUrl.searchParams.get('file');
  
  if (!folder) {
    folder = 'sfx';
  }

  if (!file) {
    return new NextResponse('Missing file', { status: 400 });
  }

  const allowedFolders = ['wigman', 'velvet', 'titan', 'alexander', 'ashley', 'sfx'];
  if (!allowedFolders.includes(folder)) {
    return new NextResponse('Invalid folder', { status: 403 });
  }

  const safeFile = path.basename(file);
  const baseDir = folder === 'sfx' ? 'private/audio' : 'public/audio';
  
  // Added turbopackIgnore comment to prevent full project tracing
  const filePath = path.join(/* turbopackIgnore: true */ process.cwd(), baseDir, folder, safeFile);

  if (!fs.existsSync(filePath)) {
    console.error(`[API] Audio file not found at: ${filePath}`);
    return new NextResponse('Audio not found', { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'inline',
      'Cache-Control': 'no-store', 
    },
  });
}
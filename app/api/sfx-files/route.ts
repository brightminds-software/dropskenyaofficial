import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const sfxDir = path.join(process.cwd(), 'public/audio/sfx');
    const files = fs.readdirSync(sfxDir).filter(file => file.endsWith('.mp3'));
    return NextResponse.json(files);
  } catch (error) {
    console.error('Error reading SFX directory:', error);
    return NextResponse.json([]);
  }
}
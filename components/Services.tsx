import fs from 'fs';
import path from 'path';
import ServicesClient from './ServicesClient';

export default function Services() {
  const artists = ['wigman', 'velvet', 'titan', 'alexander', 'ashley'];
  const audioData: Record<string, string[]> = {};

  artists.forEach((artist) => {
    const dir = path.join(process.cwd(), 'public/audio', artist);
    try {
      audioData[artist] = fs
        .readdirSync(dir)
        .filter((f) => /\.(mp3|wav|m4a|ogg)$/i.test(f))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    } catch (e) {
      // If folder doesn't exist, default to empty array
      audioData[artist] = [];
    }
  });

  return <ServicesClient audioData={audioData} />;
}
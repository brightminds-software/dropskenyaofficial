import { readdir } from 'fs/promises';
import { join } from 'path';
import SoundEffects from './SoundEffects';

export default async function SoundEffectsWrapper() {
  let files: string[] = [];

  try {
    // This looks inside your public/audio/sfx folder
    const sfxDir = join(process.cwd(), 'public', 'audio', 'sfx');
    const allFiles = await readdir(sfxDir);
    
    // Filter only mp3 files
    files = allFiles.filter(file => file.endsWith('.mp3'));
    console.log(`Found ${files.length} SFX files`); // Check your terminal to see this
  } catch (error) {
    console.error('Error reading SFX directory:', error);
  }

  // Pass the list of files to the player
  return <SoundEffects files={files} />;
}
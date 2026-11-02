import fs from "fs";
import path from "path";
import SoundEffectsPlayer from "./SoundEffectsPlayer";

export default function SoundEffects() {
  const sfxDir = path.join(process.cwd(), "private/audio/sfx");
  let files: string[] = [];

  try {
    files = fs
      .readdirSync(sfxDir)
      .filter((f) => /\.(mp3|wav|m4a|ogg)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch (e) {
    console.error("Could not read SFX directory:", e);
  }

  return <SoundEffectsPlayer files={files} />;
}
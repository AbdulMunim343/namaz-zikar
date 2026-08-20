/**
 * Writes src/data/audioManifest.js listing the recordings in public/audio/.
 *
 * The app checks this list instead of asking the server whether a file exists.
 * Asking was unreliable: Capacitor's local server answers unknown paths with
 * index.html (HTTP 200), so a missing file looked present inside the APK. A
 * build-time list cannot be wrong at runtime.
 *
 * Run with: npm run audio:manifest
 */
import { readdirSync, writeFileSync } from 'node:fs'

const files = readdirSync('public/audio')
  .filter((f) => /\.(mp3|m4a|ogg|wav)$/i.test(f))
  .sort()

writeFileSync(
  'src/data/audioManifest.js',
  `/**
 * آواز کی فائلوں کی فہرست — generated, do not edit by hand.
 * Regenerate with: npm run audio:manifest
 */
export const AUDIO_FILES = new Set([
${files.map((f) => `  '${f}',`).join('\n')}
])

export function hasRecording(file) {
  return Boolean(file) && AUDIO_FILES.has(file)
}
`,
)

console.log(`audioManifest.js: ${files.length} recordings`)

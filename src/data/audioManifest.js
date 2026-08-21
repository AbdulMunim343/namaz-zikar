/**
 * آواز کی فائلوں کی فہرست — generated, do not edit by hand.
 * Regenerate with: npm run audio:manifest
 */
export const AUDIO_FILES = new Set([

])

export function hasRecording(file) {
  return Boolean(file) && AUDIO_FILES.has(file)
}

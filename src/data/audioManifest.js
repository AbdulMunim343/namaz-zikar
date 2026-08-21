/**
 * آواز کی فائلوں کی فہرست — generated, do not edit by hand.
 * Regenerate with: npm run audio:manifest
 */
export const AUDIO_FILES = new Set([
  'after-ainni.mp3',
  'after-istighfar.mp3',
  'after-salam.mp3',
  'after-tahleel-mani.mp3',
  'ameen.mp3',
  'baqarah.mp3',
  'dua-salam.mp3',
  'durood.mp3',
  'falaq.mp3',
  'fatiha.mp3',
  'ikhlas.mp3',
  'istiftah.mp3',
  'jalsa.mp3',
  'kafirun.mp3',
  'naas.mp3',
  'night-alhamdulillah.mp3',
  'night-allahuakbar.mp3',
  'night-bismika.mp3',
  'night-subhanallah.mp3',
  'night-waking.mp3',
  'qawma.mp3',
  'qunoot.mp3',
  'ruku.mp3',
  'sajda.mp3',
  'salam.mp3',
  'taawwuz.mp3',
  'takbir.mp3',
  'tashahhud.mp3',
  'tasmiya.mp3',
  'zikr-asbahna.mp3',
  'zikr-ayat-ul-kursi.mp3',
  'zikr-falaq.mp3',
  'zikr-hasbiyallah.mp3',
  'zikr-ikhlas.mp3',
  'zikr-la-yadurr.mp3',
  'zikr-naas.mp3',
  'zikr-radeetu.mp3',
  'zikr-sayyid-istighfar.mp3',
  'zikr-subhanallah.mp3',
  'zikr-tahleel.mp3',
])

export function hasRecording(file) {
  return Boolean(file) && AUDIO_FILES.has(file)
}

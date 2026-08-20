/**
 * Dumps the Arabic of every dua that has a recording, for scripts/generate.py.
 * Run with: npm run audio:texts
 */
import { writeFileSync } from 'node:fs'
import { buildNamazSteps } from '../src/data/namaz.js'
import { buildWitrSteps } from '../src/data/witr.js'
import { getAzkaar } from '../src/data/azkaar.js'
import { getNightAzkaar } from '../src/data/nightAzkaar.js'

const out = new Map()
const add = (o) => { if (o?.audio && o?.arabic) out.set(o.audio, o.arabic) }
const walk = (steps) => steps.forEach((s) => { add(s); (s.options || []).forEach(add) })

;['fajr', 'zuhr', 'asr', 'maghrib', 'isha'].forEach((p) => walk(buildNamazSteps(p)))
;['two', 'one'].forEach((v) => walk(buildWitrSteps(v)))
;['morning', 'evening'].forEach((t) => getAzkaar(t).forEach(add))
getNightAzkaar().forEach(add)

const list = [...out].map(([file, arabic]) => ({ file, arabic }))
writeFileSync('scripts/audio-texts.json', JSON.stringify(list, null, 1))
console.log(`audio-texts.json: ${list.length} duas`)

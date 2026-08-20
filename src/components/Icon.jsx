/**
 * آئیکن — inline SVG, no emoji
 *
 * Emoji render differently on every phone and are decorative glyphs from a
 * text font; these are real icons that inherit the surrounding colour and text
 * size, so they look the same everywhere and scale with the A+ / A− control.
 */

const P = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const PATHS = {
  // مسجد
  mosque: (
    <>
      <path d="M4 20v-6a8 8 0 0 1 16 0v6" {...P} />
      <path d="M12 6a5 5 0 0 1 5 5H7a5 5 0 0 1 5-5Z" fill="currentColor" stroke="none" />
      <path d="M12 6V3.5" {...P} />
      <circle cx="12" cy="2.4" r="1" fill="currentColor" stroke="none" />
      <path d="M2.5 20v-9M21.5 20v-9" {...P} />
      <circle cx="2.5" cy="9.4" r="1.2" {...P} />
      <circle cx="21.5" cy="9.4" r="1.2" {...P} />
      <path d="M1.5 20h21" {...P} />
      <path d="M10 20v-4a2 2 0 0 1 4 0v4" {...P} />
    </>
  ),
  // چاند
  moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" {...P} />,
  // سورج
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" {...P} />
      <path d="M12 2v2.2M12 19.8V22M2 12h2.2M19.8 12H22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M19.1 4.9l-1.6 1.6M6.5 17.5l-1.6 1.6" {...P} />
    </>
  ),
  // تسبیح
  beads: (
    <>
      <path d="M6.5 7.5a7 7 0 1 0 11 0" {...P} />
      <circle cx="12" cy="4.6" r="1.5" {...P} />
      <circle cx="6.2" cy="7.6" r="1.4" {...P} />
      <circle cx="17.8" cy="7.6" r="1.4" {...P} />
      <circle cx="5.4" cy="14" r="1.4" {...P} />
      <circle cx="18.6" cy="14" r="1.4" {...P} />
      <circle cx="9.2" cy="18.4" r="1.4" {...P} />
      <circle cx="14.8" cy="18.4" r="1.4" {...P} />
    </>
  ),
  // بستر
  bed: (
    <>
      <path d="M2.5 19v-9M2.5 14h19v5M21.5 19v-5" {...P} />
      <path d="M6.5 14v-2.5h4a2 2 0 0 1 2 2V14" {...P} />
    </>
  ),
  // گھر
  home: (
    <>
      <path d="M3.5 10.5 12 3.5l8.5 7" {...P} />
      <path d="M5.5 9.6V20h13V9.6" {...P} />
      <path d="M10 20v-5.5h4V20" {...P} />
    </>
  ),
  // آواز
  speaker: (
    <>
      <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4Z" {...P} />
      <path d="M15.5 9a4.5 4.5 0 0 1 0 6M18.4 6.4a8.5 8.5 0 0 1 0 11.2" {...P} />
    </>
  ),
  // روکیں
  stop: <rect x="6" y="6" width="12" height="12" rx="2" {...P} />,
  // ڈاؤن لوڈ
  download: (
    <>
      <path d="M12 3.5v11" {...P} />
      <path d="M7.5 10.5 12 15l4.5-4.5" {...P} />
      <path d="M4 18.5h16" {...P} />
    </>
  ),
  // مکمل
  check: (
    <>
      <circle cx="12" cy="12" r="9" {...P} />
      <path d="M7.8 12.3l2.9 2.9 5.5-6" {...P} />
    </>
  ),
  // دوبارہ / جاری رکھیں
  resume: (
    <>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" {...P} />
      <path d="M20 3.5V8h-4.5" {...P} />
    </>
  ),
  // ۱ رکعت
  one: (
    <>
      <circle cx="12" cy="12" r="9" {...P} />
      <path d="M10.6 9.6 12.4 8.4V16" {...P} />
    </>
  ),
  // ۲ رکعت
  two: (
    <>
      <circle cx="12" cy="12" r="9" {...P} />
      <path d="M9.8 9.6a2.3 2.3 0 1 1 4.2 1.3L9.7 16h4.6" {...P} />
    </>
  ),
}

export default function Icon({ name, className = '' }) {
  const path = PATHS[name]
  if (!path) return null

  return (
    <svg
      className={`icon ${className}`.trim()}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {path}
    </svg>
  )
}

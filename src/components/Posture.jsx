/**
 * نماز کی حالتوں کی سادہ تصویریں
 *
 * Simple line figures rather than photographs: they read clearly at a glance,
 * scale to any size, work offline, and stay respectful.
 */

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const FIGURES = {
  // سیدھے کھڑے، ہاتھ سینے پر
  qiyam: (
    <>
      <circle cx="50" cy="20" r="10" {...STROKE} />
      <path d="M50 30 L50 68" {...STROKE} />
      <path d="M36 40 L40 54 L60 54 M64 40 L60 54" {...STROKE} />
      <path d="M50 68 L42 96 M50 68 L58 96" {...STROKE} />
    </>
  ),
  // ہاتھ کندھوں تک اُٹھائے ہوئے
  takbir: (
    <>
      <circle cx="50" cy="20" r="10" {...STROKE} />
      <path d="M50 30 L50 68" {...STROKE} />
      <path d="M50 38 L34 30 L30 18 M50 38 L66 30 L70 18" {...STROKE} />
      <path d="M50 68 L42 96 M50 68 L58 96" {...STROKE} />
    </>
  ),
  // جھکے ہوئے، ہاتھ گھٹنوں پر
  ruku: (
    <>
      <circle cx="22" cy="42" r="10" {...STROKE} />
      <path d="M32 44 L68 44" {...STROKE} />
      <path d="M40 44 L40 72" {...STROKE} />
      <path d="M68 44 L70 70 L64 96" {...STROKE} />
      <path d="M70 70 L78 96" {...STROKE} />
    </>
  ),
  // سجدہ
  sujud: (
    <>
      <circle cx="20" cy="76" r="9" {...STROKE} />
      <path d="M29 74 L52 60" {...STROKE} />
      <path d="M52 60 L74 74 L82 92" {...STROKE} />
      <path d="M52 60 L60 88" {...STROKE} />
      <path d="M30 84 L46 84" {...STROKE} />
      <path d="M8 92 L88 92" {...STROKE} strokeWidth="4" opacity="0.45" />
    </>
  ),
  // بیٹھنا (جلسہ / تشہد)
  jalsa: (
    <>
      <circle cx="46" cy="26" r="10" {...STROKE} />
      <path d="M46 36 L48 68" {...STROKE} />
      <path d="M48 68 L74 70" {...STROKE} />
      <path d="M74 70 L74 86 L60 88" {...STROKE} />
      <path d="M48 52 L62 62" {...STROKE} />
      <path d="M18 88 L86 88" {...STROKE} strokeWidth="4" opacity="0.45" />
    </>
  ),
  // سلام — دائیں طرف رُخ
  salam: (
    <>
      <circle cx="62" cy="26" r="10" {...STROKE} />
      <path d="M72 24 L82 20" {...STROKE} strokeWidth="4" opacity="0.55" />
      <path d="M56 34 L48 68" {...STROKE} />
      <path d="M48 68 L74 70" {...STROKE} />
      <path d="M74 70 L74 86 L60 88" {...STROKE} />
      <path d="M52 52 L64 62" {...STROKE} />
      <path d="M18 88 L86 88" {...STROKE} strokeWidth="4" opacity="0.45" />
    </>
  ),
}

const LABELS = {
  qiyam: 'قیام — کھڑے ہونے کی حالت',
  takbir: 'تکبیر — ہاتھ اُٹھانے کی حالت',
  ruku: 'رکوع — جھکنے کی حالت',
  sujud: 'سجدہ',
  jalsa: 'بیٹھنے کی حالت',
  salam: 'سلام پھیرنا',
}

export default function Posture({ name }) {
  const figure = FIGURES[name]
  if (!figure) return null

  return (
    <svg viewBox="0 0 100 104" role="img" aria-label={LABELS[name] || ''} style={{ color: 'var(--green)' }}>
      {figure}
    </svg>
  )
}

const URDU_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

/** 12 → "۱۲" — every number shown to the reader goes through this. */
export function toUrduNumber(value) {
  return String(value).replace(/\d/g, (d) => URDU_DIGITS[Number(d)])
}

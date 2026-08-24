/**
 * وتر — اہلحدیث طریقے کے مطابق، دو الگ الگ نمازیں
 *
 *   ۲ رکعت وتر  — پڑھ کر سلام پھیر لیں۔
 *   ۱ رکعت وتر  — الگ نیت سے، اس میں دعائے قنوت رکوع سے *پہلے* پڑھی جاتی ہے۔
 *
 */

import {
  TAKBIR,
  HANDS_ON_CHEST,
  DUA_ISTIFTAH,
  TAAWWUZ,
  TASMIYA,
  FATIHA,
  AMEEN,
  FOUR_QULS,
  RUKU,
  QAWMA,
  SAJDA_1,
  JALSA,
  SAJDA_2,
  TASHAHHUD,
  DUROOD,
  SALAM,
  STAND_UP,
} from './namaz.js'

export const WITR_OPTIONS = [
  {
    id: 'two',
    name: '۲ رکعت وتر',
    rakahs: 2,
    hint: 'پہلے یہ دو رکعت پڑھ کر سلام پھیر لیں',
  },
  {
    id: 'one',
    name: '۱ رکعت وتر',
    rakahs: 1,
    hint: 'اس میں دعائے قنوت پڑھی جاتی ہے',
  },
]

export function getWitrOption(id) {
  return WITR_OPTIONS.find((o) => o.id === id)
}

const QUNOOT = {
  key: 'qunoot',
  title: 'دعائے قنوت',
  do: 'اس رکعت میں سورت کے بعد، رکوع میں جانے سے پہلے — یعنی کھڑے کھڑے ہی — ہاتھ دعا کے لیے اُٹھائیں اور پوری دعا پڑھیں:',
  arabic:
    'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، إِنَّكَ تَقْضِي وَلَا يُقْضَى عَلَيْكَ، وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، وَلَا يَعِزُّ مَنْ عَادَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ',
  translit:
    'اَللّٰہُمَّ اہْدِنِیْ فِیْمَنْ ہَدَیْت، وَعَافِنِیْ فِیْمَنْ عَافَیْت، وَتَوَلَّنِیْ فِیْمَنْ تَوَلَّیْت، وَبَارِکْ لِیْ فِیْمَا اَعْطَیْت، وَقِنِیْ شَرَّ مَا قَضَیْت، اِنَّکَ تَقْضِیْ وَلَا یُقْضٰی عَلَیْک، وَاِنَّہٗ لَا یَذِلُّ مَنْ وَّالَیْت، وَلَا یَعِزُّ مَنْ عَادَیْت، تَبَارَکْتَ رَبَّنَا وَتَعَالَیْت',
  meaning:
    'اے اللہ! مجھے ہدایت دے اُن لوگوں میں جنہیں تُو نے ہدایت دی، مجھے عافیت دے اُن میں جنہیں تُو نے عافیت دی، میرا کارساز بن جا اُن میں جن کا تُو کارساز بنا، اور جو کچھ تُو نے مجھے دیا اُس میں برکت عطا فرما۔ اور جو تُو نے مقدر کیا اُس کی برائی سے مجھے بچا۔ بے شک تُو ہی فیصلہ کرتا ہے، تیرے خلاف کوئی فیصلہ نہیں کر سکتا۔ جس کا تُو دوست بن جائے وہ ذلیل نہیں ہوتا، اور جس سے تُو دشمنی رکھے وہ عزت نہیں پاتا۔ اے ہمارے رب! تُو بابرکت اور بلند و بالا ہے۔',
  audio: 'qunoot.mp3',
}

const RUKU_AFTER_QUNOOT = {
  ...RUKU,
  key: 'rukuAfterQunoot',
  do: 'دعا کے بعد ہاتھ نیچے کر لیں، «اللہ اکبر» کہیں اور رکوع میں جائیں۔ ہاتھ گھٹنوں پر رکھیں اور پڑھیں:',
}

/** ایک رکعت — قنوت صرف آخری رکعت میں۔ */
function witrRakah(rakah, { withQunoot }) {
  const steps = []
  steps.push(rakah === 1 ? TAKBIR : STAND_UP)
  if (rakah === 1) steps.push(HANDS_ON_CHEST, DUA_ISTIFTAH, TAAWWUZ)
  else steps.push(TASMIYA)
  steps.push(FATIHA, AMEEN, FOUR_QULS)

  // اہلحدیث: دعائے قنوت رکوع سے پہلے
  if (withQunoot) steps.push(QUNOOT, RUKU_AFTER_QUNOOT)
  else steps.push(RUKU)

  steps.push(QAWMA, SAJDA_1, JALSA, SAJDA_2)
  return steps.map((step, i) => ({ ...step, rakah, id: `w${rakah}-${i}-${step.title}` }))
}

const ending = (rakah) => [
  { ...TASHAHHUD, rakah, id: `w${rakah}-tashahhud` },
  { ...DUROOD, rakah, id: `w${rakah}-durood` },
  { ...SALAM, rakah, id: `w${rakah}-salam` },
]

/** ۲ رکعت وتر — قنوت کے بغیر، دو رکعت کے بعد سلام۔ */
export function buildWitrTwoSteps() {
  return [
    ...witrRakah(1, { withQunoot: false }),
    ...witrRakah(2, { withQunoot: false }),
    ...ending(2),
  ]
}

/** ۱ رکعت وتر — دعائے قنوت کے ساتھ، الگ نیت اور الگ سلام۔ */
export function buildWitrOneSteps() {
  return [...witrRakah(1, { withQunoot: true }), ...ending(1)]
}

export function buildWitrSteps(variant) {
  return variant === 'one' ? buildWitrOneSteps() : buildWitrTwoSteps()
}

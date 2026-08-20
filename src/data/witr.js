/**
 * وتر — تین رکعت، اہلحدیث طریقے کے مطابق
 *
 * تیسری رکعت میں دعائے قنوت رکوع سے *پہلے* پڑھی جاتی ہے۔
 * دعائے قنوت کو دو حصوں میں بانٹا گیا ہے تاکہ ایک ساتھ لمبی عبارت نہ آئے۔
 */

import {
  TAKBIR,
  HANDS_ON_CHEST,
  DUA_ISTIFTAH,
  TAAWWUZ,
  TASMIYA,
  FATIHA,
  AMEEN,
  SURAH_IKHLAS,
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

export const WITR_INFO = {
  name: 'وتر',
  rakahs: 3,
  time: 'عشاء کے بعد سے فجر سے پہلے تک',
  note: 'وتر تین رکعت ہیں جو ایک ہی سلام کے ساتھ پڑھی جاتی ہیں۔ تیسری رکعت میں رکوع سے پہلے دعائے قنوت پڑھی جاتی ہے۔',
}

const QUNOOT_1 = {
  posture: 'qiyam',
  title: 'دعائے قنوت — پہلا حصہ',
  do: 'تیسری رکعت میں سورت کے بعد، رکوع میں جانے سے *پہلے* ہاتھ دعا کے لیے اُٹھائیں اور پڑھیں:',
  arabic:
    'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ',
  translit:
    'اَللّٰہُمَّ اہْدِنِیْ فِیْمَنْ ہَدَیْت، وَعَافِنِیْ فِیْمَنْ عَافَیْت، وَتَوَلَّنِیْ فِیْمَنْ تَوَلَّیْت، وَبَارِکْ لِیْ فِیْمَا اَعْطَیْت',
  meaning:
    'اے اللہ! مجھے ہدایت دے اُن لوگوں میں جنہیں تُو نے ہدایت دی، مجھے عافیت دے اُن میں جنہیں تُو نے عافیت دی، میرا کارساز بن جا اُن میں جن کا تُو کارساز بنا، اور جو کچھ تُو نے مجھے دیا اُس میں برکت عطا فرما۔',
  audio: 'qunoot-1.mp3',
}

const QUNOOT_2 = {
  posture: 'qiyam',
  title: 'دعائے قنوت — دوسرا حصہ',
  do: 'اسی طرح ہاتھ اُٹھائے ہوئے دعا مکمل کریں:',
  arabic:
    'وَقِنِي شَرَّ مَا قَضَيْتَ، إِنَّكَ تَقْضِي وَلَا يُقْضَىٰ عَلَيْكَ، إِنَّهُ لَا يَذِلُّ مَن وَالَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ',
  translit:
    'وَقِنِیْ شَرَّ مَا قَضَیْت، اِنَّکَ تَقْضِیْ وَلَا یُقْضٰی عَلَیْک، اِنَّہٗ لَا یَذِلُّ مَنْ وَّالَیْت، تَبَارَکْتَ رَبَّنَا وَتَعَالَیْت',
  meaning:
    'اور جو تُو نے مقدر کیا اُس کی برائی سے مجھے بچا۔ بے شک تُو ہی فیصلہ کرتا ہے، تیرے خلاف کوئی فیصلہ نہیں کر سکتا۔ جس کا تُو دوست بن جائے وہ ذلیل نہیں ہوتا۔ اے ہمارے رب! تُو بابرکت اور بلند و بالا ہے۔',
  audio: 'qunoot-2.mp3',
}

const RUKU_AFTER_QUNOOT = {
  ...RUKU,
  do: 'دعا کے بعد ہاتھ نیچے کر لیں، «اللہ اکبر» کہیں اور رکوع میں جائیں۔ ہاتھ گھٹنوں پر رکھیں اور پڑھیں:',
}

function witrRakah(rakah) {
  const steps = []
  steps.push(rakah === 1 ? TAKBIR : STAND_UP)
  if (rakah === 1) steps.push(HANDS_ON_CHEST, DUA_ISTIFTAH, TAAWWUZ)
  else steps.push(TASMIYA)
  steps.push(FATIHA, AMEEN, SURAH_IKHLAS)

  if (rakah === 3) {
    // اہلحدیث: دعائے قنوت رکوع سے پہلے
    steps.push(QUNOOT_1, QUNOOT_2, RUKU_AFTER_QUNOOT)
  } else {
    steps.push(RUKU)
  }

  steps.push(QAWMA, SAJDA_1, JALSA, SAJDA_2)
  return steps.map((step, i) => ({ ...step, rakah, id: `w${rakah}-${i}-${step.title}` }))
}

/** تینوں رکعتیں ایک ہی سلام کے ساتھ — درمیان میں تشہد کے لیے نہیں بیٹھتے۔ */
export function buildWitrSteps() {
  const steps = [...witrRakah(1), ...witrRakah(2), ...witrRakah(3)]
  steps.push(
    { ...TASHAHHUD, rakah: 3, id: 'w3-tashahhud' },
    { ...DUROOD, rakah: 3, id: 'w3-durood' },
    { ...SALAM, rakah: 3, id: 'w3-salam' },
  )
  return steps
}

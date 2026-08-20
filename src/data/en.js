/**
 * English text for the app.
 *
 * Only what changes with language lives here: interface wording, the
 * step-by-step instructions, and the meanings of the duas. The Arabic and the
 * Urdu transliteration are the same in both languages, so they stay in their
 * own files and are never duplicated.
 *
 * Steps are keyed by their stable `key`, duas by their `id`.
 */

/* ---------------- interface ---------------- */

export const UI = {
  ur: {
    appName: 'نماز و اذکار',
    salam: 'السلام علیکم',
    tagline: 'جو پڑھنا ہے اُس پر اُنگلی رکھیں',
    whichPrayer: 'کون سی نماز؟',
    rakahsFard: 'رکعت فرض',
    resume: 'جاری رکھیں',
    forget: 'محفوظ شدہ جگہ بھول جائیں',
    home: 'مرکزی صفحہ',
    step: 'قدم',
    of: 'از',
    rakah: 'رکعت',
    times: 'بار',
    nextStep: 'اگلا قدم',
    finish: 'مکمل کریں',
    back: 'پیچھے',
    again: 'دوبارہ پڑھیں',
    doneTitle: 'مکمل ہو گئی',
    doneMashallah: 'ماشاءاللہ!',
    doneText: 'اللہ آپ کی نماز قبول فرمائے۔',
    afterNamazCta: 'نماز کے بعد کے اذکار',
    listen: 'سنیں',
    playing: 'چل رہا ہے…',
    stop: 'روکیں',
    meaningLabel: 'ترجمہ: ',
    remaining: 'باقی',
    complete: 'مکمل',
    allDone: 'سب مکمل ہو گئے — ماشاءاللہ',
    resetCount: 'گنتی دوبارہ شروع کریں',
    tabs: { namaz: 'نماز', witr: 'وتر', azkaar: 'اذکار', night: 'رات' },
    azkaarTitle: 'اذکار',
    nightTitle: 'سونے کے اذکار',
    segMorning: 'صبح',
    segEvening: 'شام',
    segAfter: 'نماز کے بعد',
    counterHint: 'ہر دعا کے نیچے بڑا گول بٹن ہے۔ ایک بار پڑھ کر بٹن دبائیں — گنتی خودبخود بڑھ جائے گی۔',
    afterHint: 'یہ اذکار ہر فرض نماز کے فوراً بعد، سلام پھیرتے ہی پڑھے جاتے ہیں۔',
    nightHint: 'یہ اذکار رات کو بستر پر لیٹنے سے پہلے پڑھے جاتے ہیں۔ آخری دعا صبح آنکھ کھلنے پر۔',
    fardNote: 'یہاں صرف فرض رکعتیں سکھائی گئی ہیں۔ سنتیں بھی اسی طریقے سے پڑھی جاتی ہیں، بس نیت رکعتوں کی تعداد کی کریں۔',
    tabHint: 'وتر، صبح و شام کے اذکار، اور سونے کے اذکار کے لیے نیچے والی پٹی استعمال کریں۔',
    witrTitle: 'وتر',
    witrNote: 'وتر دو حصوں میں پڑھے جاتے ہیں۔ پہلے ۲ رکعت پڑھ کر سلام پھیر لیں، پھر الگ نیت سے ۱ رکعت پڑھیں جس میں دعائے قنوت ہے۔',
    apkTitle: 'اینڈرائیڈ ایپ ڈاؤن لوڈ کریں',
    apkHint: 'فون میں انسٹال کر لیں — انٹرنیٹ کے بغیر چلے گی',
    langLabel: 'زبان',
    biggerText: 'تحریر بڑی کریں',
    smallerText: 'تحریر چھوٹی کریں',
  },
  en: {
    appName: 'Namaz & Azkaar',
    salam: 'Assalamu Alaikum',
    tagline: 'Tap whichever you want to pray',
    whichPrayer: 'Which prayer?',
    rakahsFard: 'rak‘ah fard',
    resume: 'Continue',
    forget: 'Forget the saved place',
    home: 'Home',
    step: 'Step',
    of: 'of',
    rakah: 'rak‘ah',
    times: 'times',
    nextStep: 'Next step',
    finish: 'Finish',
    back: 'Back',
    again: 'Pray again',
    doneTitle: 'complete',
    doneMashallah: 'Mashallah!',
    doneText: 'May Allah accept your prayer.',
    afterNamazCta: 'Azkaar after the prayer',
    listen: 'Listen',
    playing: 'Playing…',
    stop: 'Stop',
    meaningLabel: 'Meaning: ',
    remaining: 'left',
    complete: 'Done',
    allDone: 'All complete — Mashallah',
    resetCount: 'Start the count again',
    tabs: { namaz: 'Prayer', witr: 'Witr', azkaar: 'Azkaar', night: 'Night' },
    azkaarTitle: 'Azkaar',
    nightTitle: 'Azkaar before sleeping',
    segMorning: 'Morning',
    segEvening: 'Evening',
    segAfter: 'After prayer',
    counterHint: 'Each dua has a large round button below it. Read it once, then tap the button — the count goes up on its own.',
    afterHint: 'These are read straight after every fard prayer, as soon as you have given the salam.',
    nightHint: 'These are read at night before lying down. The last one is for when you wake up.',
    fardNote: 'Only the fard rak‘ahs are taught here. The sunnah rak‘ahs are prayed the same way — just make the intention for that number of rak‘ahs.',
    tabHint: 'Use the bar at the bottom for Witr, the morning and evening azkaar, and the azkaar before sleeping.',
    witrTitle: 'Witr',
    witrNote: 'Witr is prayed in two parts. First pray 2 rak‘ah and give the salam, then pray 1 rak‘ah with a fresh intention — that one has the Dua-e-Qunoot.',
    apkTitle: 'Download the Android app',
    apkHint: 'Install it on the phone — it works without internet',
    langLabel: 'Language',
    biggerText: 'Larger text',
    smallerText: 'Smaller text',
  },
}

/* ---------------- namaz and witr steps ---------------- */

export const EN_STEPS = {
  takbir: {
    title: 'Takbir-e-Tahrima',
    do: 'Stand straight facing the qiblah. Raise both hands to your shoulders (raf‘ al-yadain) and say:',
    meaning: 'Allah is the greatest.',
  },
  handsOnChest: {
    title: 'Fold your hands',
    do: 'Now place your right hand over your left and fold both hands on your chest. Look at the place of sajdah.',
  },
  istiftah: {
    title: 'Opening dua',
    do: 'Read this quietly:',
    meaning:
      'Glory be to You, O Allah, and all praise is Yours. Blessed is Your name, exalted is Your majesty, and there is no god but You.',
  },
  taawwuz: {
    title: 'Ta‘awwuz and Tasmiyah',
    do: 'Read quietly:',
    meaning:
      'I seek refuge with Allah from the accursed Shaytan. In the name of Allah, the Most Gracious, the Most Merciful.',
  },
  tasmiya: {
    title: 'Tasmiyah',
    do: 'The ta‘awwuz is read only in the first rak‘ah. Now read just the bismillah, quietly:',
    meaning: 'In the name of Allah, the Most Gracious, the Most Merciful.',
  },
  fatiha: {
    title: 'Surah al-Fatihah',
    do: 'Surah al-Fatihah must be read in every rak‘ah. Read it slowly:',
    meaning:
      'All praise is for Allah, Lord of all the worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgement. You alone we worship, and You alone we ask for help. Guide us along the straight path — the path of those You have blessed, not of those who earned Your anger, nor of those who went astray.',
  },
  ameen: {
    title: 'Ameen',
    do: 'Say Ameen as soon as you finish al-Fatihah — aloud in the rak‘ahs of Fajr, Maghrib and Isha where the recitation is aloud.',
    meaning: 'O Allah, accept it.',
  },
  ameenQuiet: {
    title: 'Ameen',
    do: 'The recitation is quiet in the third and fourth rak‘ah, so say Ameen quietly too.',
    meaning: 'O Allah, accept it.',
  },
  fourQuls: {
    title: 'Any one short surah',
    do: 'A short surah is read after al-Fatihah in the first two rak‘ahs only. All four “Qul” surahs are given below — read just ONE of them, whichever is easiest for you.',
    choose: 'Read any ONE of these four',
    options: {
      kafirun: {
        name: 'Surah al-Kafirun',
        meaning:
          'Say: O disbelievers! I do not worship what you worship, nor do you worship what I worship. I will never worship what you worship, nor will you ever worship what I worship. You have your religion, and I have mine.',
      },
      ikhlas: {
        name: 'Surah al-Ikhlas',
        meaning:
          'Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, and there is none comparable to Him.',
      },
      falaq: {
        name: 'Surah al-Falaq',
        meaning:
          'Say: I seek refuge with the Lord of the daybreak from the evil of what He created, from the evil of the darkness when it settles, from the evil of those who blow on knots, and from the evil of the envier when he envies.',
      },
      naas: {
        name: 'Surah an-Nas',
        meaning:
          'Say: I seek refuge with the Lord of mankind, the King of mankind, the God of mankind, from the evil of the retreating whisperer, who whispers into the hearts of mankind, from among jinn and men.',
      },
    },
  },
  ruku: {
    title: 'Ruku‘',
    do: 'Raise both hands to your shoulders (raf‘ al-yadain), say “Allahu Akbar”, then bow and place your hands on your knees. Keep your back straight. Then read:',
    meaning: 'Glory be to my Lord, the Most Great.',
  },
  rukuAfterQunoot: {
    title: 'Ruku‘',
    do: 'After the dua, lower your hands, say “Allahu Akbar” and go into ruku‘. Place your hands on your knees and read:',
    meaning: 'Glory be to my Lord, the Most Great.',
  },
  qawma: {
    title: 'Rising from ruku‘',
    do: 'As you rise, raise your hands to your shoulders (raf‘ al-yadain) and say “Sami‘ Allahu liman hamidah”, then stand straight and say:',
    meaning: 'Allah hears the one who praises Him. Our Lord, all praise is Yours.',
  },
  sajda1: {
    title: 'First sajdah',
    do: 'Say “Allahu Akbar” and go into sajdah. Your forehead, nose, both palms, both knees and the toes of both feet touch the ground. Then read:',
    meaning: 'Glory be to my Lord, the Most High.',
  },
  jalsa: {
    title: 'Sitting between the two sajdahs',
    do: 'Say “Allahu Akbar”, rise from the sajdah and sit calmly, then read:',
    meaning: 'My Lord, forgive me and have mercy on me.',
  },
  sajda2: {
    title: 'Second sajdah',
    do: 'Say “Allahu Akbar” again, go back into sajdah and read the same words:',
    meaning: 'Glory be to my Lord, the Most High.',
  },
  tashahhud: {
    title: 'Tashahhud (At-Tahiyyat)',
    do: 'Sitting, point with the index finger of your right hand and read:',
    meaning:
      'All greetings, prayers and good things are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no god but Allah, and I bear witness that Muhammad ﷺ is His servant and messenger.',
  },
  tashahhudMiddle: {
    title: 'Middle tashahhud',
    do: 'After the second rak‘ah, sit and read only the tashahhud (the durood and dua come in the last rak‘ah):',
    meaning:
      'All greetings, prayers and good things are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no god but Allah, and I bear witness that Muhammad ﷺ is His servant and messenger.',
  },
  durood: {
    title: 'Durood-e-Ibrahimi',
    do: 'After the tashahhud, still sitting, send blessings upon the Prophet ﷺ:',
    meaning:
      'O Allah, send Your grace upon Muhammad ﷺ and the family of Muhammad, as You sent it upon Ibrahim and the family of Ibrahim. Indeed You are Praiseworthy, Most Glorious. O Allah, send Your blessings upon Muhammad ﷺ and the family of Muhammad, as You blessed Ibrahim and the family of Ibrahim. Indeed You are Praiseworthy, Most Glorious.',
  },
  duaBeforeSalam: {
    title: 'Dua before the salam',
    do: 'Before giving the salam, make this dua:',
    meaning:
      'O Allah, I seek refuge with You from the punishment of Hell, from the punishment of the grave, from the trials of life and death, and from the evil of the trial of the Dajjal.',
  },
  salam: {
    title: 'Salam',
    do: 'Turn your face to the right, then to the left, saying each time:',
    meaning: 'Peace be upon you, and the mercy of Allah.',
  },
  standUp: {
    title: 'Stand for the next rak‘ah',
    do: 'Say “Allahu Akbar”, stand up straight and fold your hands on your chest.',
    meaning: 'Allah is the greatest.',
  },
  standFromTashahhud: {
    title: 'Stand after the tashahhud',
    do: 'Say “Allahu Akbar”, stand up and raise your hands to your shoulders (raf‘ al-yadain), then fold your hands on your chest.',
    meaning: 'Allah is the greatest.',
  },
  qunoot1: {
    title: 'Dua-e-Qunoot — first part',
    do: 'In this rak‘ah, after the surah and BEFORE going into ruku‘ — while still standing — raise your hands in dua and read:',
    meaning:
      'O Allah, guide me among those You have guided, grant me well-being among those You have granted well-being, take me into Your care among those You have taken into Your care, and bless what You have given me.',
  },
  qunoot2: {
    title: 'Dua-e-Qunoot — second part',
    do: 'With your hands still raised, complete the dua:',
    meaning:
      'And protect me from the evil of what You have decreed. Indeed You decree, and none decrees over You. The one You befriend is never humiliated. Blessed are You, our Lord, and exalted.',
  },
}

/* ---------------- prayers and witr ---------------- */

export const EN_PRAYERS = {
  fajr: 'Fajr', zuhr: 'Zuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha',
}

export const EN_WITR = {
  two: { name: '2 rak‘ah Witr', hint: 'Pray these two first and give the salam' },
  one: { name: '1 rak‘ah Witr', hint: 'This one has the Dua-e-Qunoot' },
}

export const EN_PRAYER_SUFFIX = ' prayer'

/* ---------------- azkaar (all four lists, keyed by id) ---------------- */

export const EN_ZIKR = {
  /* --- morning / evening --- */
  'ayat-ul-kursi': {
    name: 'Ayat-ul-Kursi',
    virtue: 'Whoever reads it in the morning is protected until evening, and whoever reads it in the evening is protected until morning.',
    meaning:
      'Allah — there is no god but He, the Ever-Living, the Sustainer of all. Neither drowsiness nor sleep overtakes Him. To Him belongs whatever is in the heavens and whatever is on the earth. Who can intercede with Him except by His permission? He knows what lies before them and what is behind them, and they grasp nothing of His knowledge except what He wills. His Kursi extends over the heavens and the earth, and guarding them does not tire Him. He is the Most High, the Most Great.',
  },
  ikhlas: {
    name: 'Surah al-Ikhlas',
    virtue: 'Reading these three surahs three times each, morning and evening, suffices you against everything.',
    meaning: 'Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, and there is none comparable to Him.',
  },
  falaq: {
    name: 'Surah al-Falaq',
    meaning: 'Say: I seek refuge with the Lord of the daybreak from the evil of what He created, from the evil of the darkness when it settles, from the evil of those who blow on knots, and from the evil of the envier when he envies.',
  },
  naas: {
    name: 'Surah an-Nas',
    meaning: 'Say: I seek refuge with the Lord of mankind, the King of mankind, the God of mankind, from the evil of the retreating whisperer, who whispers into the hearts of mankind, from among jinn and men.',
  },
  asbahna: {
    name: 'Dua for morning and evening',
    meaning: {
      morning: 'We have entered the morning and the whole kingdom belongs to Allah, and all praise is for Allah. There is no god but Allah alone, with no partner.',
      evening: 'We have entered the evening and the whole kingdom belongs to Allah, and all praise is for Allah. There is no god but Allah alone, with no partner.',
    },
  },
  'sayyid-istighfar': {
    name: 'Sayyid-ul-Istighfar',
    virtue: 'Whoever says this during the day and dies that same day is of the people of Paradise.',
    meaning:
      'O Allah, You are my Lord, there is no god but You. You created me and I am Your servant. I keep to Your covenant and Your promise as much as I can. I seek refuge with You from the evil of what I have done. I acknowledge Your favours upon me, and I acknowledge my sin — so forgive me, for none forgives sins but You.',
  },
  'bismillah-la-yadurr': {
    name: 'Protection from every harm',
    virtue: 'Whoever says this three times, nothing will harm him.',
    meaning: 'In the name of Allah, with whose name nothing on earth or in the heaven can cause harm, and He is the All-Hearing, the All-Knowing.',
  },
  radeetu: {
    name: 'Declaring contentment',
    virtue: 'Whoever says this, Allah has taken it upon Himself to please him on the Day of Judgement.',
    meaning: 'I am content with Allah as my Lord, with Islam as my religion, and with Muhammad ﷺ as my Prophet.',
  },
  subhanallah: {
    name: 'Tasbeeh',
    virtue: 'These words are light on the tongue, heavy on the scales, and beloved to Allah.',
    meaning: 'Glory be to Allah and all praise is His. Glory be to Allah, the Most Great.',
  },
  hasbiyallah: {
    name: 'Allah is enough for me',
    virtue: 'Whoever says this seven times, Allah will take care of all his worries in this world and the next.',
    meaning: 'Allah is sufficient for me. There is no god but He. In Him I put my trust, and He is the Lord of the Mighty Throne.',
  },
  tahleel: {
    name: 'The word of tawheed',
    virtue: 'Saying this is like freeing a slave, and it is a protection from Shaytan.',
    meaning: 'There is no god but Allah alone, with no partner. His is the kingdom, His is all praise, and He has power over everything.',
  },

  /* --- before sleeping --- */
  'night-wudu': {
    name: 'Before sleeping',
    virtue: 'The Prophet ﷺ would sleep in a state of wudu, on his right side, with his right hand under his cheek.',
    instruction: 'Make wudu, dust off the bed, lie down on your right side and place your right hand under your right cheek.',
  },
  'night-bismika': {
    name: 'Dua when lying down',
    virtue: 'The Prophet ﷺ would say this as he lay down on his bed.',
    meaning: 'O Allah, with Your name I die and I live.',
  },
  'night-ayat-ul-kursi': {
    name: 'Ayat-ul-Kursi',
    virtue: 'Whoever reads Ayat-ul-Kursi on going to bed has a guardian from Allah over him until morning.',
    meaning:
      'Allah — there is no god but He, the Ever-Living, the Sustainer of all. Neither drowsiness nor sleep overtakes Him. To Him belongs whatever is in the heavens and whatever is on the earth. Who can intercede with Him except by His permission? He knows what lies before them and what is behind them, and they grasp nothing of His knowledge except what He wills. His Kursi extends over the heavens and the earth, and guarding them does not tire Him. He is the Most High, the Most Great.',
  },
  'night-baqarah-285': {
    name: 'Last ruku‘ of Surah al-Baqarah — first verse',
    virtue: 'Whoever reads the last two verses of Surah al-Baqarah at night, they will suffice him.',
    meaning:
      'The Messenger believes in what was revealed to him from his Lord, and so do the believers. All believe in Allah, His angels, His books and His messengers. We make no distinction between any of His messengers. And they say: We hear and we obey. Grant us Your forgiveness, our Lord, and to You is the return.',
  },
  'night-baqarah-286': {
    name: 'Last ruku‘ of Surah al-Baqarah — second verse',
    meaning:
      'Allah does not burden a soul beyond what it can bear. It gets what good it earned, and it bears what evil it earned. Our Lord, do not take us to task if we forget or make a mistake. Our Lord, do not lay upon us a burden like the one You laid upon those before us. Our Lord, do not burden us with what we have no strength to bear. Pardon us, forgive us and have mercy on us. You are our Protector, so help us against the disbelieving people.',
  },
  'night-ikhlas': {
    name: 'Surah al-Ikhlas',
    virtue: 'Read all three surahs, blow into your palms and wipe over your body as far as your hands reach — three times.',
    meaning: 'Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, and there is none comparable to Him.',
  },
  'night-falaq': { name: 'Surah al-Falaq', meaning: 'Say: I seek refuge with the Lord of the daybreak from the evil of what He created, from the evil of the darkness when it settles, from the evil of those who blow on knots, and from the evil of the envier when he envies.' },
  'night-naas': { name: 'Surah an-Nas', meaning: 'Say: I seek refuge with the Lord of mankind, the King of mankind, the God of mankind, from the evil of the retreating whisperer, who whispers into the hearts of mankind, from among jinn and men.' },
  'night-subhanallah': {
    name: 'Subhan Allah',
    virtue: 'This tasbeeh at bedtime (33, 33, 34) is better than a servant. Say it slowly, without hurrying.',
    meaning: 'Glory be to Allah.',
  },
  'night-alhamdulillah': { name: 'Alhamdulillah', meaning: 'All praise is for Allah.' },
  'night-allahuakbar': { name: 'Allahu Akbar', meaning: 'Allah is the greatest.' },
  'night-waking': {
    name: 'Dua on waking up',
    virtue: 'Say this as soon as you open your eyes in the morning.',
    meaning: 'All praise is for Allah, who gave us life after He caused us to die, and to Him is the return.',
  },

  /* --- after the prayer --- */
  'after-istighfar': {
    name: 'Istighfar',
    virtue: 'Say this three times first, as soon as you have given the salam.',
    meaning: 'I seek forgiveness from Allah.',
  },
  'after-salam': {
    name: 'Allahumma Antas-Salam',
    meaning: 'O Allah, You are Peace, and from You comes peace. Blessed are You, O Owner of majesty and honour.',
  },
  'after-tahleel-mani': {
    name: 'La ilaha illallah',
    meaning:
      'There is no god but Allah alone, with no partner. His is the kingdom, His is all praise, and He has power over everything. O Allah, none can withhold what You give, and none can give what You withhold, and no wealth of the wealthy can benefit them against You.',
  },
  'after-ainni': {
    name: 'Dua for help in remembering Allah',
    virtue: 'The Prophet ﷺ especially urged that this be said after every prayer.',
    meaning: 'O Allah, help me to remember You, to thank You, and to worship You well.',
  },
  'after-subhanallah': {
    name: 'Subhan Allah',
    virtue: 'After every prayer: 33 times Subhan Allah, 33 times Alhamdulillah, 33 times Allahu Akbar, and the word of tawheed once at the end — sins are forgiven.',
    meaning: 'Glory be to Allah.',
  },
  'after-alhamdulillah': { name: 'Alhamdulillah', meaning: 'All praise is for Allah.' },
  'after-allahuakbar': { name: 'Allahu Akbar', meaning: 'Allah is the greatest.' },
  'after-tahleel': {
    name: 'The word that completes the hundred',
    virtue: 'Saying this once completes the count of a hundred.',
    meaning: 'There is no god but Allah alone, with no partner. His is the kingdom, His is all praise, and He has power over everything.',
  },
  'after-ayat-ul-kursi': {
    name: 'Ayat-ul-Kursi',
    virtue: 'Whoever reads Ayat-ul-Kursi after every fard prayer, nothing keeps him from Paradise except death.',
    meaning:
      'Allah — there is no god but He, the Ever-Living, the Sustainer of all. Neither drowsiness nor sleep overtakes Him. To Him belongs whatever is in the heavens and whatever is on the earth. Who can intercede with Him except by His permission? He knows what lies before them and what is behind them, and they grasp nothing of His knowledge except what He wills. His Kursi extends over the heavens and the earth, and guarding them does not tire Him. He is the Most High, the Most Great.',
  },
  'after-ikhlas': {
    name: 'Surah al-Ikhlas',
    virtue: 'After Fajr and Maghrib read these three surahs three times each; after the other prayers, once each.',
    meaning: 'Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, and there is none comparable to Him.',
  },
  'after-falaq': { name: 'Surah al-Falaq', meaning: 'Say: I seek refuge with the Lord of the daybreak from the evil of what He created, from the evil of the darkness when it settles, from the evil of those who blow on knots, and from the evil of the envier when he envies.' },
  'after-naas': { name: 'Surah an-Nas', meaning: 'Say: I seek refuge with the Lord of mankind, the King of mankind, the God of mankind, from the evil of the retreating whisperer, who whispers into the hearts of mankind, from among jinn and men.' },
}

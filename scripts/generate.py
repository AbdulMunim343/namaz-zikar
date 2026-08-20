import json, os, re, subprocess, sys, tempfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tts import synth
import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
OUT = '/home/user/namaz-zikar/public/audio'
os.makedirs(OUT, exist_ok=True)

# Verse markers and the ﷺ glyph are punctuation to a reader, not sounds.
STRIP = re.compile(r'[۝۞]')

items = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'audio-texts.json'), encoding='utf-8'))
total = 0
for it in items:
    text = STRIP.sub('،', it['arabic']).replace('ﷺ', '')
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as tmp:
        wav = tmp.name
    # +m3 is one of espeak-ng's male variants; the low pitch keeps it male.
    secs = synth(text, 'ar+m3', wav, rate=120, pitch=25)
    mp3 = os.path.join(OUT, it['file'])
    subprocess.run(
        [FFMPEG, '-y', '-loglevel', 'error', '-i', wav,
         '-codec:a', 'libmp3lame', '-b:a', '48k', '-ac', '1', '-ar', '22050', mp3],
        check=True)
    os.unlink(wav)
    size = os.path.getsize(mp3)
    total += size
    print(f'  {it["file"]:<28} {secs:5.1f}s  {size/1024:6.1f} KB')

print(f'\n{len(items)} clips, {total/1024/1024:.2f} MB total')

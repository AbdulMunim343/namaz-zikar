"""Synthesise WAV clips with espeak-ng, driven through ctypes.

The wheel ships the shared library and voice data but no CLI, so the C API is
called directly: initialise in RETRIEVAL mode, register a callback that
accumulates the PCM frames, then synthesise.
"""
import ctypes, wave, espeakng_loader

AUDIO_OUTPUT_RETRIEVAL = 1
espeakCHARS_UTF8 = 1
espeakENDPAUSE = 0x1000

lib = ctypes.CDLL(espeakng_loader.get_library_path())

CALLBACK = ctypes.CFUNCTYPE(
    ctypes.c_int, ctypes.POINTER(ctypes.c_short), ctypes.c_int, ctypes.c_void_p
)

lib.espeak_Initialize.restype = ctypes.c_int
lib.espeak_Initialize.argtypes = [ctypes.c_int, ctypes.c_int, ctypes.c_char_p, ctypes.c_int]
lib.espeak_SetVoiceByName.argtypes = [ctypes.c_char_p]
lib.espeak_SetParameter.argtypes = [ctypes.c_int, ctypes.c_int, ctypes.c_int]
lib.espeak_Synth.argtypes = [
    ctypes.c_void_p, ctypes.c_size_t, ctypes.c_uint, ctypes.c_int,
    ctypes.c_uint, ctypes.c_uint, ctypes.POINTER(ctypes.c_uint), ctypes.c_void_p,
]

SAMPLE_RATE = lib.espeak_Initialize(
    AUDIO_OUTPUT_RETRIEVAL, 0, espeakng_loader.get_data_path().encode(), 0
)
if SAMPLE_RATE <= 0:
    raise SystemExit('espeak-ng failed to initialise')

_frames = []

@CALLBACK
def _cb(wav, numsamples, events):
    if wav and numsamples > 0:
        _frames.append(ctypes.string_at(wav, numsamples * 2))
    return 0

lib.espeak_SetSynthCallback(_cb)

# espeak parameter ids
RATE, VOLUME, PITCH, RANGE = 1, 2, 3, 4


def synth(text, voice, path, rate=125, pitch=45):
    """Speak `text` in `voice` and write a mono 16-bit WAV to `path`."""
    _frames.clear()
    if lib.espeak_SetVoiceByName(voice.encode()) != 0:
        raise RuntimeError(f'no espeak voice for {voice!r}')
    lib.espeak_SetParameter(RATE, rate, 0)     # slower than default, easier to follow
    lib.espeak_SetParameter(PITCH, pitch, 0)   # lower pitch reads as male
    lib.espeak_SetParameter(VOLUME, 200, 0)
    data = text.encode('utf-8')
    lib.espeak_Synth(data, len(data) + 1, 0, 0, 0,
                     espeakCHARS_UTF8 | espeakENDPAUSE, None, None)
    lib.espeak_Synchronize()
    pcm = b''.join(_frames)
    if not pcm:
        raise RuntimeError(f'no audio produced for {voice!r}')
    with wave.open(path, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SAMPLE_RATE)
        w.writeframes(pcm)
    return len(pcm) / 2 / SAMPLE_RATE

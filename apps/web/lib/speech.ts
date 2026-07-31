// lib/speech.ts

let activeUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Speaks the provided text using the browser's SpeechSynthesis API.
 * Automatically selects a high-quality native English voice.
 */
export function speak(text: string): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn('Speech synthesis is not supported in this environment.');
    return;
  }

  try {
    window.speechSynthesis.cancel();
  } catch (error) {
    console.warn('Failed to cancel ongoing speech synthesis:', error);
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95; // Natural speaking rate
  utterance.pitch = 1.0; // Normal pitch

  // Keep a reference to prevent garbage collection on some browsers
  activeUtterance = utterance;

  utterance.onend = () => {
    if (activeUtterance === utterance) {
      activeUtterance = null;
    }
  };

  utterance.onerror = (event) => {
    if (event.error !== 'interrupted') {
      console.error('SpeechSynthesisUtterance error:', event);
    }
    if (activeUtterance === utterance) {
      activeUtterance = null;
    }
  };

  const selectVoiceAndSpeak = () => {
    const voices = window.speechSynthesis.getVoices();

    const englishVoices = voices.filter((v) =>
      v.lang.toLowerCase().startsWith('en')
    );

    // High quality/native preference order:
    // 1. en-US Google or Natural voices
    // 2. en-US Microsoft or Apple voices
    // 3. Any en-US voice
    // 4. en-GB voice
    // 5. Any English voice
    const selectedVoice =
      englishVoices.find(
        (v) =>
          v.lang.toLowerCase() === 'en-us' &&
          (v.name.includes('Google') || v.name.includes('Natural'))
      ) ||
      englishVoices.find(
        (v) =>
          v.lang.toLowerCase() === 'en-us' &&
          (v.name.includes('Microsoft') || v.name.includes('Apple'))
      ) ||
      englishVoices.find((v) => v.lang.toLowerCase() === 'en-us') ||
      englishVoices.find((v) => v.lang.toLowerCase() === 'en-gb') ||
      englishVoices[0];

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      utterance.lang = 'en-US';
    }

    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Failed to call speak on speech synthesis:', error);
    }
  };

  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    selectVoiceAndSpeak();
  } else {
    // If voices are not loaded yet, wait for voiceschanged event
    const handleVoicesChanged = () => {
      selectVoiceAndSpeak();
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
  }
}

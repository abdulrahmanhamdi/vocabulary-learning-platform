import { Word, DayData, allWords, generateDaysFromWords, DEFAULT_WORDS_PER_DAY } from '@vocabulary/shared';


/**
 * Fetches all words dynamically from the /api/words endpoint.
 * Falls back to statically bundled JSON if the network request fails
 * (e.g. before Service Worker caches the data or during initial offline boot).
 */
export async function fetchAllWords(): Promise<Word[]> {
  try {
    const response = await fetch('/api/words');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('Failed to fetch words from API, using bundled fallback:', error);
    return allWords;
  }
}

export async function fetchDayData(dayNumber: number): Promise<DayData | null> {
  try {
    const words = await fetchAllWords();
    const days = generateDaysFromWords(words, DEFAULT_WORDS_PER_DAY);
    const dayData = days.find((d) => d.day === dayNumber);
    return dayData || null;
  } catch (error) {
    console.error('Error fetching day data:', error);
    return null;
  }
}

export async function fetchWordById(id: number): Promise<Word | undefined> {
  try {
    const words = await fetchAllWords();
    return words.find((w) => w.id === id);
  } catch (error) {
    console.error('Error fetching word by ID:', error);
    return undefined;
  }
}

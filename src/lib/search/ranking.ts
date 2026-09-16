import { VideoResult } from './types';

export function rankResults(results: VideoResult[], keyword: string): VideoResult[] {
  const kw = keyword.toLowerCase();
  const kwWords = kw.split(/\s+/).filter(Boolean);

  return results.map(result => {
    let score = 0;
    const title = (result.title || '').toLowerCase();
    
    // Exact title match
    if (title.includes(kw)) {
      score += 40; 
    } else {
      let matchedWords = 0;
      for (const word of kwWords) {
        if (title.includes(word)) matchedWords++;
      }
      if (matchedWords > 0) {
        score += (20 * (matchedWords / kwWords.length));
      }
    }
    
    score += 10; // Base freshness/relevance
    
    result.relevanceScore = Math.round(score);
    return result;
  }).sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
}

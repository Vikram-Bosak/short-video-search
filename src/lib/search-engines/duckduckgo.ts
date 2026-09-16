import * as cheerio from 'cheerio';
import { VideoResult, Platform } from '../search/types';

export async function searchWithDuckDuckGo(query: string, platform: Platform, limit: number): Promise<VideoResult[]> {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      console.warn(`Search engine returned ${response.status} for ${platform}`);
      return [];
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const results: VideoResult[] = [];
    
    $('.result__body').each((i, el) => {
      if (results.length >= limit) return;
      
      const titleEl = $(el).find('.result__title a');
      const title = titleEl.text().trim();
      let resultUrl = titleEl.attr('href') || '';
      
      // DDG redirects
      if (resultUrl.startsWith('//duckduckgo.com/l/?uddg=')) {
        try {
          const urlObj = new URL('https:' + resultUrl);
          const uddg = urlObj.searchParams.get('uddg');
          if (uddg) resultUrl = decodeURIComponent(uddg);
        } catch (e) {
          // keep as is
        }
      }
      
      if (title && resultUrl) {
        results.push({
          platform,
          title,
          url: resultUrl,
        });
      }
    });
    
    return results;
  } catch (err) {
    console.error(`Search error for ${platform}:`, err);
    return [];
  }
}

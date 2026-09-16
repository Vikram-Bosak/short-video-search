import { Platform, VideoResult } from '../search/types';
import { SearchProvider } from '../search-engines/provider';
import { normalizeUrl } from '../utils/url';
import * as cheerio from 'cheerio';
import { chromium } from 'playwright';

export class YouTubeProvider extends SearchProvider {
  platform: Platform = 'youtube';

  async search(keyword: string, limit: number = 10): Promise<VideoResult[]> {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}+shorts&sp=EgIYAQ%253D%253D`;
    
    // Playwright for YouTube as it relies heavily on JS for Shorts rendering
    let browser;
    try {
      browser = await chromium.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      
      // Wait for at least some video titles
      await page.waitForSelector('ytd-video-renderer, ytd-reel-item-renderer', { timeout: 10000 }).catch(() => {});
      
      const content = await page.content();
      const $ = cheerio.load(content);
      
      const results: VideoResult[] = [];
      
      $('ytd-reel-item-renderer, ytd-video-renderer').each((i, el) => {
        if (results.length >= limit) return;
        
        const titleEl = $(el).find('#video-title');
        const title = titleEl.text().trim() || titleEl.attr('title') || '';
        let urlPath = titleEl.attr('href') || '';
        
        if (!urlPath) return;
        
        // Ensure it's a shorts link or format it
        if (!urlPath.includes('/shorts/')) {
           // sometimes regular videos show up, we could skip or include
           if (!urlPath.includes('/watch')) return;
        }
        
        const url = urlPath.startsWith('http') ? urlPath : `https://www.youtube.com${urlPath}`;
        
        const imgEl = $(el).find('img');
        const thumbnail = imgEl.attr('src') || imgEl.attr('data-thumb') || '';
        
        const viewsText = $(el).find('#metadata-line span').text();
        let views = undefined;
        
        if (title && url) {
          results.push({
            platform: this.platform,
            title,
            url,
            thumbnail: thumbnail.startsWith('http') ? thumbnail : undefined,
          });
        }
      });
      
      return results;
    } catch (error) {
      console.error('YouTube search error:', error);
      return [];
    } finally {
      if (browser) await browser.close();
    }
  }
}

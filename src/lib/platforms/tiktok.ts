import { Platform, VideoResult } from '../search/types';
import { SearchProvider } from '../search-engines/provider';
import { searchWithDuckDuckGo } from '../search-engines/duckduckgo';

export class TikTokProvider extends SearchProvider {
  platform: Platform = 'tiktok';

  async search(keyword: string, limit: number = 10): Promise<VideoResult[]> {
    const query = `site:tiktok.com ${keyword}`;
    return searchWithDuckDuckGo(query, this.platform, limit);
  }
}

import { Platform, VideoResult } from '../search/types';
import { SearchProvider } from '../search-engines/provider';
import { searchWithDuckDuckGo } from '../search-engines/duckduckgo';

export class InstagramProvider extends SearchProvider {
  platform: Platform = 'instagram';

  async search(keyword: string, limit: number = 10): Promise<VideoResult[]> {
    const query = `site:instagram.com/reel ${keyword}`;
    return searchWithDuckDuckGo(query, this.platform, limit);
  }
}

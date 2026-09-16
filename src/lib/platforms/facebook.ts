import { Platform, VideoResult } from '../search/types';
import { SearchProvider } from '../search-engines/provider';
import { searchWithDuckDuckGo } from '../search-engines/duckduckgo';

export class FacebookProvider extends SearchProvider {
  platform: Platform = 'facebook';

  async search(keyword: string, limit: number = 10): Promise<VideoResult[]> {
    const query = `site:facebook.com/reel ${keyword}`;
    return searchWithDuckDuckGo(query, this.platform, limit);
  }
}

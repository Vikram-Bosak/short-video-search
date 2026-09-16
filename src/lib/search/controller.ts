import { Platform, VideoResult } from './types';
import { SearchProvider } from '../search-engines/provider';
import { YouTubeProvider } from '../platforms/youtube';
import { TikTokProvider } from '../platforms/tiktok';
import { InstagramProvider } from '../platforms/instagram';
import { FacebookProvider } from '../platforms/facebook';
import { normalizeUrl } from '../utils/url';
import { rankResults } from './ranking';

export class SearchController {
  private providers: Record<Platform, SearchProvider>;

  constructor() {
    this.providers = {
      youtube: new YouTubeProvider(),
      tiktok: new TikTokProvider(),
      instagram: new InstagramProvider(),
      facebook: new FacebookProvider(),
    };
  }

  async search(keyword: string, platforms: Platform[], limitPerPlatform: number = 10): Promise<{results: VideoResult[], stats: Record<string, number>}> {
    const activeProviders = platforms.map(p => this.providers[p]).filter(Boolean);
    
    // Execute searches concurrently
    const searchPromises = activeProviders.map(provider => 
      provider.search(keyword, limitPerPlatform).catch(err => {
        console.error(`Error searching ${provider.platform}:`, err);
        return [];
      })
    );
    
    const resultsArrays = await Promise.all(searchPromises);
    const allResults = resultsArrays.flat();
    
    // Deduplicate
    const uniqueResults = this.deduplicate(allResults);
    
    // Rank
    const rankedResults = rankResults(uniqueResults, keyword);
    
    // Calculate stats
    const stats: Record<string, number> = {
      youtube: 0,
      tiktok: 0,
      instagram: 0,
      facebook: 0,
    };
    
    rankedResults.forEach(r => {
      stats[r.platform] = (stats[r.platform] || 0) + 1;
    });
    
    return {
      results: rankedResults,
      stats
    };
  }
  
  private deduplicate(results: VideoResult[]): VideoResult[] {
    const seen = new Set<string>();
    return results.filter(r => {
      const canonical = normalizeUrl(r.url);
      if (seen.has(canonical)) return false;
      seen.add(canonical);
      return true;
    });
  }
}

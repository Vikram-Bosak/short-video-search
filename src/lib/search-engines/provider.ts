import { Platform, VideoResult } from '../search/types';

export abstract class SearchProvider {
  public abstract platform: Platform;

  /**
   * Performs the search on the specific platform.
   * @param keyword the search keyword
   * @param limit maximum number of results to fetch
   * @returns a list of normalized VideoResults
   */
  abstract search(keyword: string, limit?: number): Promise<VideoResult[]>;
}

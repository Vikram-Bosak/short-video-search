/**
 * Normalizes a URL for comparison and storage.
 * Removes common tracking parameters.
 */
export function normalizeUrl(urlStr: string): string {
  try {
    const url = new URL(urlStr);
    
    // Remove common tracking params
    const trackingParams = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
      'fbclid', 'gclid', 'igshid', 'si', 'vxtit'
    ];
    
    trackingParams.forEach(param => url.searchParams.delete(param));
    
    // Some platforms use trailing slashes inconsistently
    let href = url.href;
    if (href.endsWith('/')) {
      href = href.slice(0, -1);
    }
    
    return href;
  } catch (e) {
    return urlStr;
  }
}

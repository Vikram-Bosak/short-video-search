import { Platform } from '../search/types';

/**
 * Validates search keywords.
 */
export function validateKeyword(keyword: string): { valid: boolean; message?: string } {
  if (!keyword || keyword.trim() === '') {
    return { valid: false, message: 'Keyword cannot be empty.' };
  }
  
  if (keyword.length > 100) {
    return { valid: false, message: 'Keyword is too long (max 100 characters).' };
  }
  
  return { valid: true };
}

export function validatePlatforms(platformsStr: string | null): Platform[] {
  const validPlatforms: Platform[] = ["youtube", "tiktok", "instagram", "facebook"];
  
  if (!platformsStr) {
    return validPlatforms; // Default all
  }

  const requested = platformsStr.split(',').map(p => p.trim().toLowerCase() as Platform);
  const filtered = requested.filter(p => validPlatforms.includes(p));
  
  return filtered.length > 0 ? filtered : validPlatforms;
}

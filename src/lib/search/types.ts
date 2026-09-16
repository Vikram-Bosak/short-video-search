export type Platform = "youtube" | "tiktok" | "instagram" | "facebook";

export interface VideoResult {
  platform: Platform;
  title: string;
  url: string;
  thumbnail?: string;
  creator?: string;
  views?: number;
  likes?: number;
  comments?: number;
  publishedAt?: string;
  duration?: number;
  relevanceScore?: number;
}

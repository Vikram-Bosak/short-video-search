# Short Video Search Engine

## 1. Project Purpose
A complete "No-API" Short Video Search Engine designed to help users find publicly discoverable short-form video pages from YouTube Shorts, TikTok, Instagram Reels, and Facebook Reels in one interface.

## 2. Features
- Cross-platform search (YouTube, TikTok, Instagram, Facebook)
- No official API keys required
- Playwright + Cheerio based public scraping
- Relevance ranking system
- Search history stored locally
- Saved videos collection

## 3. Architecture
- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes (`/api/search`)
- **Scrapers**: Playwright (for JS-heavy platforms like YouTube), Cheerio (for static parsing)
- **State**: React State, LocalStorage (No DB required)

## 4. Installation
```bash
npm install
npx playwright install chromium
```

## 5. Development
```bash
npm run dev
```
Navigate to `http://localhost:3000`.

## 6. Production deployment
Since this project uses Playwright, deploying to standard Serverless environments (like Vercel or Netlify) may fail due to package size limitations (50MB limit) and lack of browser binaries.
**Recommended Deployment**: Deploy using Docker on a VPS (Render, DigitalOcean, Railway) or AWS Fargate where you can install Chromium binaries.

## 7. Environment variables
See `.env.example`. Currently, environment variables are placeholders for future API-based search providers.

## 8. Platform limitations
- **YouTube**: Requires Playwright to render JS.
- **TikTok/Instagram/Facebook**: Searched via DuckDuckGo HTML fallbacks to avoid aggressive bot protection on their main sites.

## 9. Search limitations
- Results are limited to what is publicly indexed.
- Maximum 10-20 results per platform to avoid rate limits.

## 10. Security
- Validated inputs and URLs to prevent SSRF and XSS.
- No sensitive user data stored on the server.

## 11. Legal/compliance considerations
This tool only reads publicly accessible HTML metadata. It does not download, re-host, or redistribute videos. It links directly to the original creators' platforms.

## 12. Troubleshooting
- If searches fail, ensure `npx playwright install chromium` was run.
- If platforms block the IP, deploy behind a proxy or VPN.

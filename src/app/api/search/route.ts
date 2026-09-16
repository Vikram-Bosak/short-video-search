import { NextRequest, NextResponse } from 'next/server';
import { SearchController } from '../../../lib/search/controller';
import { validateKeyword, validatePlatforms } from '../../../lib/utils/validation';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const platformsParam = searchParams.get('platforms');

  const keywordValidation = validateKeyword(query || '');
  if (!keywordValidation.valid) {
    return NextResponse.json({ error: keywordValidation.message }, { status: 400 });
  }

  const platforms = validatePlatforms(platformsParam);
  
  const controller = new SearchController();
  try {
    const { results, stats } = await controller.search(query as string, platforms, 10);

    return NextResponse.json({
      query,
      results,
      stats,
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { Client, Environment } from 'square';

// Initialize Square client with environment-specific settings
const client = new Client({
  accessToken: process.env.NODE_ENV === 'development' 
    ? process.env.NEXT_PUBLIC_DEVELOPMENT_SQUARE_ACCESS_TOKEN 
    : process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.NODE_ENV === 'development' ? Environment.Sandbox : Environment.Production,
});

export async function GET() {
  try {
    console.log('Initializing menu fetch from Square...', {
      environment: process.env.NODE_ENV,
      usingDevToken: process.env.NODE_ENV === 'development'
    });
    
    // First, get all categories to map IDs to names
    const categoriesResponse = await client.catalogApi.listCatalog(undefined, 'CATEGORY');
    const categoryMap = new Map(
      categoriesResponse.result.objects
        ?.filter(obj => obj.type === 'CATEGORY')
        .map(cat => [cat.id, cat.categoryData?.name]) || []
    );

    // Fetch catalog items from Square
    const response = await client.catalogApi.searchCatalogItems({
      // You can add custom attributes or category filters here
    });

    if (!response.result || !response.result.items) {
      throw new Error('No menu items found');
    }

    // Transform Square catalog items into our menu format
    const menuItems = response.result.items.map(item => ({
      id: item.id,
      name: item.itemData?.name || '',
      description: item.itemData?.description || '',
      price: item.itemData?.variations?.[0]?.itemVariationData?.priceMoney?.amount || 0,
      category: categoryMap.get(item.itemData?.categoryId || '') || 'uncategorized',
      image: item.itemData?.imageIds?.[0] || null,
    }));

    console.log('Successfully fetched menu items. Count:', menuItems.length);
    
    const headers = {
      'Cache-Control': 'no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    };
    
    return NextResponse.json(menuItems, { headers });
  } catch (error: any) {
    console.error('Error fetching menu from Square:', {
      name: error?.name || 'UnknownError',
      message: error?.message || 'No error message available',
      stack: error?.stack || 'No stack trace available',
      environment: process.env.NODE_ENV,
    });

    return NextResponse.json(
      { error: 'Failed to fetch menu items', details: error?.message || 'Unknown error' }, 
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

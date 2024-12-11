import { NextResponse } from 'next/server';
import { Client, Environment } from 'square';

// Initialize Square client with environment-specific settings
const client = new Client({
  accessToken: process.env.NODE_ENV === 'development' 
    ? process.env.NEXT_PUBLIC_DEVELOPMENT_SQUARE_ACCESS_TOKEN 
    : process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.NODE_ENV === 'development' ? Environment.Sandbox : Environment.Production,
});

// Helper function to safely stringify BigInt values
function replaceBigInt(key: string, value: any) {
  if (typeof value === 'bigint') {
    return Number(value);
  }
  return value;
}

export async function GET() {
  try {
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
    const menuItems = response.result.items.map(item => {
      const itemCategories = item.itemData?.categories || [];
      const categoryId = itemCategories[0]?.id;
      const rawCategory = categoryMap.get(categoryId || '') || 'Other';
      
      // Map category names to our desired display names
      const displayCategory = rawCategory === 'Chai' ? 'Chai' :
                            rawCategory === 'Snacks' ? 'Snacks' :
                            'Other';
      
      return {
        id: item.id,
        name: item.itemData?.name || '',
        description: item.itemData?.description || '',
        price: Number(item.itemData?.variations?.[0]?.itemVariationData?.priceMoney?.amount || 0),
        category: displayCategory,
        image: item.itemData?.imageIds?.[0] || null,
      };
    });
    
    console.log('Final transformed menu items:', JSON.stringify(menuItems, replaceBigInt, 2));
    
    const headers = {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=7200',
    };
    
    return NextResponse.json(menuItems, { headers });
  } catch (error: any) {
    console.error('Error fetching menu from Square:', error?.message);

    return NextResponse.json(
      { error: 'Failed to fetch menu items' }, 
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

import { Client, Environment, ApiResponse, ListCatalogResponse, BatchUpsertCatalogObjectsRequest, BatchDeleteCatalogObjectsRequest } from 'square';
import { config } from 'dotenv';
import { randomBytes } from 'crypto';

// Load environment variables
config();

console.log('Token:', process.env.NEXT_PUBLIC_DEVELOPMENT_SQUARE_ACCESS_TOKEN);

const client = new Client({
  accessToken: process.env.NEXT_PUBLIC_DEVELOPMENT_SQUARE_ACCESS_TOKEN || '',
  environment: Environment.Sandbox,
});

// Helper function to generate idempotency key
function generateIdempotencyKey(): string {
  return randomBytes(32).toString('hex');
}

interface MenuItem {
  name: string;
  description: string;
  price: number;
  category: string;
}

const menuItems: MenuItem[] = [
  // Chai Items
  {
    name: "Hyderbadi Irani Chai",
    description: "Taste a rich history between the Iranians and Indians. A medley of spices including black cardamom, cinnamon, cloves, and peppercorn.",
    price: 400,
    category: "chai"
  },
  {
    name: "Masala Chai",
    description: "A classic milk tea blend of warming spices - cardamom, cinnamon, cloves, ginger, fennel, and nutmeg.",
    price: 500,
    category: "chai"
  },
  {
    name: "Dood Pati Chai",
    description: "The simplest, yet most comforting. Taste the flavor of robust black Assam leaves, simmered in milk until the shade is just right.",
    price: 300,
    category: "chai"
  },
  {
    name: "Karwa Chai",
    description: "Experience the soul-warming essence of our rich, black Assam chai.",
    price: 400,
    category: "chai"
  },
  {
    name: "Lamsa Chai",
    description: "A special hyderbadi Assam tea blend with hints of chocolate.",
    price: 400,
    category: "chai"
  },
  {
    name: "Zafron Rose Chai",
    description: "Delicate saffron, fragrant rose water, aromatic cardamom, and spicy ginger, all purposely paired with the richness of Assam tea simmered in milk.",
    price: 500,
    category: "chai"
  },
  // Food Items
  {
    name: "Parle-G Cookies",
    description: "A classic Indian tea-time treat, these simple, slightly sweet biscuits are loved for their nostalgic taste. They're light, crisp, and perfect for dunking in chai.",
    price: 100,
    category: "food"
  },
  {
    name: "Rusk Cake",
    description: "A twice-baked bread with a crisp, golden texture, perfect for dunking in chai. Lightly sweet and wonderfully crunchy.",
    price: 100,
    category: "food"
  },
  {
    name: "Bakar Khani",
    description: "A rich, flaky pastry with layers of crispiness, often flavored with cardamom.",
    price: 100,
    category: "food"
  },
  {
    name: "Osmania Biscuits",
    description: "Originating from Hyderabad, these soft and crumbly biscuits are mildly sweet with a hint of salt, making them a perfect companion to a hot cup of chai.",
    price: 50,
    category: "food"
  },
  {
    name: "Biscoff Cookies",
    description: "European spiced biscuits with a distinctive caramelized flavor and a crunchy texture.",
    price: 200,
    category: "food"
  },
  {
    name: "Karachi's Fruit Biscuits",
    description: "These popular biscuits from Karachi are studded with colorful candied fruit bits, offering a delightful blend of sweetness and crunch.",
    price: 200,
    category: "food"
  }
];

async function populateSquareCatalog() {
  try {
    console.log('Starting Square catalog population...');

    // First, delete existing catalog (clean slate)
    console.log('Cleaning existing catalog...');
    const existingItems = await client.catalogApi.listCatalog() as ApiResponse<ListCatalogResponse>;
    console.log('Existing items:', JSON.stringify(existingItems, null, 2));

    if (existingItems.result.objects && existingItems.result.objects.length > 0) {
      const objectIds = existingItems.result.objects.map(obj => obj.id);
      const deleteResponse = await client.catalogApi.batchDeleteCatalogObjects({
        objectIds: objectIds
      } as BatchDeleteCatalogObjectsRequest);
      console.log('Delete response:', JSON.stringify(deleteResponse, null, 2));
    }

    // Create categories
    console.log('Creating categories...');
    const categoryObjects = [
      {
        type: 'CATEGORY',
        id: '#chai',
        categoryData: {
          name: 'chai'
        }
      },
      {
        type: 'CATEGORY',
        id: '#food',
        categoryData: {
          name: 'food'
        }
      }
    ];

    const categoryResponse = await client.catalogApi.batchUpsertCatalogObjects({
      idempotencyKey: generateIdempotencyKey(),
      batches: [
        {
          objects: categoryObjects
        }
      ]
    } as BatchUpsertCatalogObjectsRequest);
    console.log('Category response:', JSON.stringify(categoryResponse, null, 2));

    const categoryIds = {
      chai: categoryResponse.result.objects?.find(obj => obj.categoryData?.name === 'chai')?.id,
      food: categoryResponse.result.objects?.find(obj => obj.categoryData?.name === 'food')?.id
    };

    // Create menu items
    console.log('Creating menu items...');
    const menuItemObjects = menuItems.map(item => ({
      type: 'ITEM',
      id: `#${item.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      itemData: {
        name: item.name,
        description: item.description,
        categoryId: categoryIds[item.category as keyof typeof categoryIds],
        variations: [
          {
            type: 'ITEM_VARIATION',
            id: `#${item.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_regular`,
            itemVariationData: {
              itemId: `#${item.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
              name: 'Regular',
              priceMoney: {
                amount: BigInt(item.price),
                currency: 'USD'
              }
            }
          }
        ]
      }
    }));

    // Batch create items
    const batchSize = 10;
    for (let i = 0; i < menuItemObjects.length; i += batchSize) {
      const batch = menuItemObjects.slice(i, i + batchSize);
      console.log(`Creating batch ${i / batchSize + 1}...`);
      const batchResponse = await client.catalogApi.batchUpsertCatalogObjects({
        idempotencyKey: generateIdempotencyKey(),
        batches: [{ objects: batch }]
      } as BatchUpsertCatalogObjectsRequest);
      console.log('Batch response:', JSON.stringify(batchResponse, null, 2));
    }

    console.log('Successfully populated Square catalog!');
  } catch (error) {
    console.error('Error populating Square catalog:', error);
    throw error;
  }
}

// Run the population script
populateSquareCatalog().catch(console.error);

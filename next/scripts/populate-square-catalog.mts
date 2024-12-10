import { Client, Environment, ApiResponse, ListCatalogResponse, BatchUpsertCatalogObjectsRequest, BatchDeleteCatalogObjectsRequest, CatalogObject } from 'square';
import { config } from 'dotenv';
import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

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

// Helper function to safely stringify BigInt values
function replaceBigInt(key: string, value: any) {
  if (typeof value === 'bigint') {
    return Number(value);
  }
  return value;
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
    category: "snacks"
  },
  {
    name: "Rusk Cake",
    description: "A twice-baked bread with a crisp, golden texture, perfect for dunking in chai. Lightly sweet and wonderfully crunchy.",
    price: 100,
    category: "snacks"
  },
  {
    name: "Bakar Khani",
    description: "A rich, flaky pastry with layers of crispiness, often flavored with cardamom.",
    price: 100,
    category: "snacks"
  },
  {
    name: "Osmania Biscuits",
    description: "Originating from Hyderabad, these soft and crumbly biscuits are mildly sweet with a hint of salt, making them a perfect companion to a hot cup of chai.",
    price: 50,
    category: "snacks"
  },
  {
    name: "Biscoff Cookies",
    description: "European spiced biscuits with a distinctive caramelized flavor and a crunchy texture.",
    price: 200,
    category: "snacks"
  },
  {
    name: "Karachi's Fruit Biscuits",
    description: "These popular biscuits from Karachi are studded with colorful candied fruit bits, offering a delightful blend of sweetness and crunch.",
    price: 200,
    category: "snacks"
  }
];

async function populateSquareCatalog() {
  try {
    console.log('Token:', process.env.NEXT_PUBLIC_DEVELOPMENT_SQUARE_ACCESS_TOKEN);
    console.log('Starting Square catalog population...');

    // Initialize Square client
    const client = new Client({
      accessToken: process.env.NEXT_PUBLIC_DEVELOPMENT_SQUARE_ACCESS_TOKEN,
      environment: Environment.Sandbox,
    });

    // Clean existing catalog first
    console.log('Cleaning existing catalog...');
    try {
      const existingItems = await client.catalogApi.listCatalog();
      console.log('Existing items:', JSON.stringify(existingItems.result, replaceBigInt, 2));

      if (existingItems.result.objects && existingItems.result.objects.length > 0) {
        const objectIds = existingItems.result.objects.map(obj => obj.id);
        const deleteResponse = await client.catalogApi.batchDeleteCatalogObjects({
          objectIds
        });
        console.log('Delete response:', JSON.stringify(deleteResponse, replaceBigInt, 2));
      }
    } catch (error) {
      console.error('Error cleaning catalog:', error);
      throw error;
    }

    // Create categories first
    console.log('Creating categories...');
    const categoryObjects = [
      {
        type: 'CATEGORY',
        id: '#chai_category',  
        presentAtAllLocations: true,
        categoryData: {
          name: 'Chai'
        }
      },
      {
        type: 'CATEGORY',
        id: '#snacks_category',  
        presentAtAllLocations: true,
        categoryData: {
          name: 'Snacks'
        }
      }
    ];

    // Create categories first and wait for them to be created
    console.log('Creating categories...');
    try {
      const categoriesResult = await client.catalogApi.batchUpsertCatalogObjects({
        idempotencyKey: uuidv4(),
        batches: [{
          objects: categoryObjects
        }]
      });

      console.log('Categories created:', JSON.stringify(categoriesResult.result, replaceBigInt, 2));

      if (!categoriesResult.result.objects) {
        throw new Error('Failed to create categories - no objects returned');
      }

      // Get the actual Square-assigned category IDs from the id mappings
      const categoryIds = {
        chai: categoriesResult.result.idMappings?.find(m => m.clientObjectId === '#chai_category')?.objectId,
        snacks: categoriesResult.result.idMappings?.find(m => m.clientObjectId === '#snacks_category')?.objectId
      };

      if (!categoryIds.chai || !categoryIds.snacks) {
        throw new Error(`Failed to get category IDs from mappings. Got: ${JSON.stringify(categoryIds)}`);
      }

      console.log('Category IDs:', categoryIds);

      // Create menu items with explicit category references
      console.log('Creating menu items...');
      const menuItemObjects = menuItems.map((item, index) => {
        // Map category to the correct category ID
        const categoryId = item.category === 'chai' ? categoryIds.chai : categoryIds.snacks;
        if (!categoryId) {
          throw new Error(`Category ID not found for item ${item.name}`);
        }
        console.log(`Creating item "${item.name}" with category "${item.category}" (ID: ${categoryId})`);

        const itemId = `#${item.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
        const variationId = `#${itemId}_regular`;

        const menuItemObject: CatalogObject = {
          type: 'ITEM',
          id: itemId,
          presentAtAllLocations: true,
          itemData: {
            name: item.name,
            description: item.description,
            categories: [
              {
                id: categoryId,
                ordinal: BigInt(index + 1)
              }
            ],
            variations: [
              {
                type: 'ITEM_VARIATION',
                id: variationId,
                presentAtAllLocations: true,
                itemVariationData: {
                  itemId: itemId,
                  name: 'Regular',
                  pricingType: 'FIXED_PRICING',
                  priceMoney: {
                    amount: BigInt(item.price),
                    currency: 'USD'
                  },
                  trackInventory: false,
                  sellable: true,
                  stockable: true
                }
              } as CatalogObject
            ],
            isTaxable: false,
            productType: 'REGULAR'
          }
        };

        console.log(`Menu item object for "${item.name}":`, JSON.stringify(menuItemObject, replaceBigInt, 2));
        return menuItemObject;
      });

      // Create items in batches
      const batchSize = 10;
      for (let i = 0; i < menuItemObjects.length; i += batchSize) {
        const batch = menuItemObjects.slice(i, i + batchSize);
        console.log(`Creating batch ${i / batchSize + 1}...`);
        
        try {
          const batchResponse = await client.catalogApi.batchUpsertCatalogObjects({
            idempotencyKey: uuidv4(),
            batches: [{
              objects: batch
            }]
          });

          console.log('Batch response:', JSON.stringify(batchResponse.result, replaceBigInt, 2));
        } catch (error) {
          console.error('Error creating batch:', error);
          throw error;
        }
      }

      console.log('Successfully populated Square catalog!');
    } catch (error) {
      console.error('Error creating categories:', error);
      throw error;
    }
  } catch (error: any) {
    console.error('Error populating Square catalog:', {
      name: error?.name || 'UnknownError',
      message: error?.message || 'No error message available',
      stack: error?.stack || 'No stack trace available',
      error
    });
    process.exit(1);
  }
}

// Run the script
populateSquareCatalog();

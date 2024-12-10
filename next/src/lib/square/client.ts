import { Client, Environment } from 'square';

// Initialize Square client
export const squareClient = new Client({
  accessToken: process.env.DEVELOPMENT_SQUARE_ACCESS_TOKEN || '',
  environment: Environment.Sandbox, // Use Environment.Production for production
});

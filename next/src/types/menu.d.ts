export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'chai' | 'food';
  imageUrl?: string;
}

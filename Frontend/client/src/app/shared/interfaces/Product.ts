export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  productImages: string[];
  category: string;
  brand: string;

 // Optional fields for future features
  rating?: number;
  reviewCount?: number;
  isOnSale?: boolean;
  discountPercent?: number;
  inStock?: boolean;
  isInWishlist?: boolean;
  originalPrice?: number;
  freeShipping?: boolean;
}

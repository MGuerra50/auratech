export interface ProductVariant {
  id: string;
  label: string;
  priceDelta?: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  isNew?: boolean;
  featured?: boolean;
  variants?: ProductVariant[];
  specs?: ProductSpec[];
}

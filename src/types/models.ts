export type UserRole = 'CUSTOMER' | 'ADMIN';

export type ProductCategory =
  | 'Electronics'
  | 'Fashion'
  | 'Home'
  | 'Gaming'
  | 'Beauty'
  | 'Books';

export interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  images: string[];
  description: string;
  badge?: string;
  specifications: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  fullName: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | 'CREATED'
  | 'PAYMENT_PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';


export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;

  // Saved price breakdown returned by the backend
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;

  items: OrderItem[];
  address: Address;
  paymentMethod: string;
}



export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface ProductQuery {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
}

export interface PaginatedProducts {
  content: Product[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

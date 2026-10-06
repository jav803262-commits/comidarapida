export type ProductCategory =
  | "hamburguesas"
  | "combos"
  | "papas"
  | "bebidas";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  category: ProductCategory;
  available: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderType = "pickup" | "delivery";
export type PaymentMethod = "cash" | "transfer";

export interface CustomerAddress {
  street: string;
  neighborhood: string;
  reference?: string;
}

export interface OrderCustomer {
  name: string;
  orderType: OrderType;
  paymentMethod: PaymentMethod;
  address?: CustomerAddress;
  cashAmount?: number;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: OrderCustomer;
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
}
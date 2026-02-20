export interface OrderItem {
  name: string;
  category: "coffee" | "tea" | "pastry";
  size?: "small" | "large";
  temperature?: "hot" | "iced";
  milk?: string;
  addOns?: string[];
  sweetness?: string;
  iceLevel?: string;
  basePrice: number;
  addOnTotal: number;
  itemTotal: number;
}

export interface Order {
  id: string;
  order_number: number;
  status: "pending" | "in-progress" | "completed";
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  created_at: string;
  completed_at: string | null;
}

export type OrderStatus = Order["status"];

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

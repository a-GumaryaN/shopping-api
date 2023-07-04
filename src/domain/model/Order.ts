export interface Order_product {
  product_id: string;
  number: number;
}

export interface Order {
  order_products: Order_product[];
  description: string;
  total_amount: number;
  order_uuid: string;
}

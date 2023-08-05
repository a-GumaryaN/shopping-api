import { Comment } from ".";

export interface color {
  color_name: string;
  color_code: string;
}

export interface phone_description {
  brand: string;
  colors: color[];
  display_technology: string;
  display_size: number;
  OS: string;
}

export interface discount {
  expire_time: number;
  amount: number;
}

interface Product {
  uuid: string;
  product_name: string;
  price: number;
  images: string[];
  comments: Comment[];
  discount: discount | null;
  rate: number;
  category: string[]; // /category1/subcategory2/subcategory1
  description: phone_description | any;
}

export default Product;

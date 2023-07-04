import { Comment } from ".";

interface Product {
  uuid: string;
  product_name: string;
  price: number;
  images: string[];
  comments: Comment[];
  rate: number;
}


export default Product;
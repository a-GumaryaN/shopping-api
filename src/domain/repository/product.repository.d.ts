import base_repository from "./base_repository"
import { Product } from "../model";
interface product_repository extends base_repository<Product> {
  find_by_uuid(
    uuid: string,
    projection?: any
  ): Promise<Partial<Product>>;
  
  find_by_category(
    category: string,
    projection?: any
  ): Promise<[Partial<Product>]>;
}

export default product_repository;

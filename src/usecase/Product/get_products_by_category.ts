import { Product } from "src/domain/model";
import product_repository from "src/domain/repository/product.repository";

class Get_product_by_category {
  constructor(private Product_repository: product_repository) {}
  async action(products_category: string): Promise<Partial<Product>[]> {
    return await this.Product_repository.find_by_category(products_category);
  }
}

export default Get_product_by_category;

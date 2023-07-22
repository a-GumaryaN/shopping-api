import { Product } from "src/domain/model";
import product_repository from "src/domain/repository/product.repository";

class Get_product {
  constructor(private Product_repository: product_repository) {}
  async action(product_uuid: string): Promise<Partial<Product>> {
    return await this.Product_repository.find_by_uuid(product_uuid);
  }
}

export default Get_product;

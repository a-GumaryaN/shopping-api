import { Product } from "src/domain/model";
import product_repository from "src/domain/repository/product.repository";

class Get_product {
  constructor(private Product_repository: product_repository) {}
  async action(): Promise<Partial<Product>[]> {
    return await this.Product_repository.find_many({},{},{skip:0,take:1000});
  }
}

export default Get_product;

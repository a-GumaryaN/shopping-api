import result from "src/domain/common/result";
import { Product } from "src/domain/model";
import product_repository from "src/domain/repository/product.repository";
import update_product_validator from "src/domain/validators/Product/update_product";

class Update_product {
  constructor(
    private Product_repository: product_repository,
    private Update_product_validator: update_product_validator
  ) {}

  async action({
    uuid,
    updated_product,
  }: {
    uuid: string;
    updated_product: Pick<Product, "product_name" | "price">;
  }): Promise<result> {
    //validate input data
    const { error: validate_error, value } =
      this.Update_product_validator.validate({ uuid, updated_product });
    if (validate_error)
      return {
        result: null,
        error: {
          message: validate_error,
          error_code: 123,
          path: "update product",
        },
      };
    //check existence of product
    const product = await this.Product_repository.find_by_uuid(uuid);
    if (!product)
      return {
        result: null,
        error: {
          message: "product not exist",
          error_code: 123,
          path: "update product",
        },
      };
    //update product
    await this.Product_repository.update_one({ uuid }, updated_product);
    //return result
    return {
      result: "product updated successfully",
      error: null,
    };
  }
}


export default Update_product;
import result from "src/domain/common/result";
import { Product } from "src/domain/model";
import product_repository from "src/domain/repository/product.repository";
import uuid_generator from "src/domain/services/uuid_generator";
import add_product_validator from "src/domain/validators/Product/add_product";

class Add_product {
  constructor(
    private Product_repository: product_repository,
    private Uuid_generator: uuid_generator,
    private Add_product_validator: add_product_validator
  ) {}
  async action({
    price,
    product_name,
  }: Pick<Product, "product_name" | "price">): Promise<result> {
    //validate input product
    const { error: validate_error, value } =
      this.Add_product_validator.validate({
        price,
        product_name,
      });
    if (validate_error)
      return {
        result: null,
        error: {
          message: validate_error,
          path: "add product",
          error_code: 123,
        },
      };
    //check existence of product
    const exist_product = await this.Product_repository.find_one(
      { product_name },
      { product_name: true }
    );
    if (exist_product)
      return {
        result: null,
        error: {
          message: "product already exists",
          path: "add product",
          error_code: 123,
        },
      };
    //generate new uuid
    const uuid = this.Uuid_generator.generate();
    //save product object
    await this.Product_repository.add_new({ product_name, price, uuid });
    //return result
    return {
      result: "product generated successfully",
      error: null,
    };
  }
}

export default Add_product;

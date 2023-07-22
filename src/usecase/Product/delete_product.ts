import result from "src/domain/common/result";
import product_repository from "src/domain/repository/product.repository";
import delete_product_validator from "src/domain/validators/Product/delete_product";

class Delete_product {
  constructor(
    private Product_repository: product_repository,
    private Product_validator: delete_product_validator
  ) {}
  async action({ uuid }): Promise<result> {
    //validate input data
    const { error, value } = this.Product_validator.validate({ uuid });
    if (error)
      return {
        result: null,
        error: {
          message: error,
          error_code: 123,
          path: "Delete product",
        },
      };
    //delete product
    await this.Product_repository.delete_one({ uuid: value.uuid });
    //return result
    return {
      result: "product deleted successfully",
      error: null,
    };
  }
}

export default Delete_product;

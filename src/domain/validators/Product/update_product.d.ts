import { Product } from "src/domain/model";
import validator_proxy from "../validator.proxy";

interface update_product_validator {
  validate: validator_proxy<{
    uuid: string;
    updated_product: Pick<Product, "product_name"|"price">;
  }>;
}

export default update_product_validator;

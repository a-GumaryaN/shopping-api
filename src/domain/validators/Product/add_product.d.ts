import { Product } from "src/domain/model";
import validator_proxy from "../validator.proxy";

interface add_product_validator {
  validate: validator_proxy<Pick<Product, "price" | "product_name">>;
}

export default add_product_validator;

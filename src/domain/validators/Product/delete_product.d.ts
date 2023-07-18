import { Product } from "src/domain/model";
import validator_proxy from "../validator.proxy";

interface delete_product_validator {
  validate: validator_proxy<Pick<Product, "uuid">>;
}

export default delete_product_validator;

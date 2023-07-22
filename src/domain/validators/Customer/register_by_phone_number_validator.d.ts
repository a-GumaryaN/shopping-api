import { Customer, Product } from "src/domain/model";
import validator_proxy from "../validator.proxy";

interface register_by_phone_number_validator {
  validate: validator_proxy<{
    code: string;
    new_customer: Pick<
      Customer,
      "phone_number" | "first_name" | "last_name" | "password"
    >;
  }>;
}

export default register_by_phone_number_validator;

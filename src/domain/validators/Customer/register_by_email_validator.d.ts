import { Customer, Product } from "src/domain/model";
import validator_proxy from "../validator.proxy";

interface register_by_email_validator {
  validate: validator_proxy<{
    code: string;
    new_customer: Pick<
      Customer,
      "email" | "first_name" | "last_name" | "password"
    >;
  }>;
}

export default register_by_email_validator;

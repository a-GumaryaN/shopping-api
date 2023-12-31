import { Injectable } from "@nestjs/common";
import register_by_phone_number_validator from "src/domain/validators/Customer/register_by_phone_number_validator";

const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  code: { type: "string", max: 80 },

  new_customer: {
    $$type: "object",
    phone_number: { type: "string", max: 20 },
    first_name: { type: "string", max: 40 },
    last_name: { type: "string", max: 40 },
    password: { type: "string", max: 50 },
  },
};

@Injectable()
class Register_by_phone_number_validator
  implements register_by_phone_number_validator
{
  private checker;
  constructor() {
    this.checker = v.compile(schema);
  }

  validate({ code, new_customer }) {
    const error = this.checker({ code, new_customer });

    const result =
      error !== true
        ? {
            error: error[0].message,
            value: null,
          }
        : {
            error: null,
            value: { code, new_customer },
          };
    return result;
  }
}

export default Register_by_phone_number_validator;

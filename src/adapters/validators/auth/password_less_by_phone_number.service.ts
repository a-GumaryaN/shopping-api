import { Injectable } from "@nestjs/common";
import reset_password_by_phone_number_validator from "src/domain/validators/Auth/reset_password_by_phone_number";
const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  phone_number: { type: "string", max: 20 },
  code: { type: "string", max: 40 },
};


@Injectable()
class password_less_by_phone_number
  implements reset_password_by_phone_number_validator
{
  private checker;
  constructor() {
    this.checker = v.compile(schema);
  }

  validate({ phone_number, code }) {
    const error = this.checker({
      phone_number,
      code,
    });
    const result =
      error !== true
        ? {
            error: error[0].message,
            value: null,
          }
        : {
            error: null,
            value: { phone_number, code },
          };
    return result;
  }
}

export default password_less_by_phone_number;

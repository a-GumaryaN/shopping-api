import { Injectable } from "@nestjs/common";
import phone_number_validator from "src/domain/validators/Auth/phone_number";
const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  phone_number: { type: "string", max: 20 },
};


@Injectable()
class Phone_number_validator implements phone_number_validator {
  private checker;
  constructor() {
    this.checker = v.compile(schema);
  }
  validate({ phone_number }) {
    const error = this.checker({ phone_number });
    const result =
      error !== true
        ? {
            error: error[0].message,
            value: null,
          }
        : {
            error: null,
            value: { phone_number },
          };
    return result;
  }
}

export default Phone_number_validator;

import reset_password_by_phone_number_validator from "src/domain/validators/Auth/reset_password_by_phone_number";
const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  phone_number: { type: 'string', max: 20 },
  code: { type: 'string', max: 6 },
  new_password: { type: 'string', max: 40 },
};

class Reset_password_by_phone_number_validator
  implements reset_password_by_phone_number_validator
{
  private checker;
  constructor() {
    this.checker = v.compile(schema);
  }

  validate({ phone_number, code, new_password }) {
    const error = this.checker({
      phone_number,
      code,
      new_password,
    });
    const result =
      error !== true
        ? {
            error: error[0].message,
            value: null,
          }
        : {
            error: null,
            value: { phone_number, code, new_password },
          };
    return result;
  }
}

export default Reset_password_by_phone_number_validator;

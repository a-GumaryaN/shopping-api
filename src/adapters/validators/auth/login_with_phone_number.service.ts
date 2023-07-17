import login_with_phone_number_validator from "src/domain/validators/Auth/login_with_phone_number";
const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  phone_number: { type: "string", max: 20 },
  password: { type: "string", max: 40 },
};

class Login_with_phone_number_validator
  implements login_with_phone_number_validator
{
  private checker;
  constructor() {
    this.checker = v.compile(schema);
  }

  validate({ phone_number, password }) {
    const error = this.checker({
      phone_number,
      password,
    });

    const result =
      error !== true
        ? {
            error: error[0].message,
            value: null,
          }
        : {
            error: null,
            value: { phone_number, password },
          };
    return result;
  }
}

export default Login_with_phone_number_validator;

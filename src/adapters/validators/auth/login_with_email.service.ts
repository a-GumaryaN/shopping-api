import login_with_email_validator from "src/domain/validators/Auth/login_with_email";
import password_less_by_phone_number_validator from "src/domain/validators/Auth/password_less_by_phone_number";
import reset_password_by_phone_number from "src/domain/validators/Auth/reset_password_by_phone_number";
const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  email: { type: "email", max: 255 },
  code: { type: "string", max: 40 },
};

class Login_with_email_validator
  implements login_with_email_validator
{
  private checker;
  constructor() {
    this.checker = v.compile(schema);
  }

  validate({ email, password }) {
    const error = this.checker({ email, password });

    const result =
      error !== true
        ? {
            error: error[0].message,
            value: null,
          }
        : {
            error: null,
            value: { email, password },
          };
    return result;
  }
}

export default Login_with_email_validator;

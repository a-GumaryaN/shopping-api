import reset_password_by_phone_number_validator from "src/domain/validators/Auth/reset_password_by_phone_number";
const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  email: { type: 'email', max: 255 },
  code: { type: 'string', max: 40 },
};

class Password_less_by_email_validator
  implements reset_password_by_phone_number_validator
{
  private checker;
  constructor() {
    this.checker = v.compile(schema);
  }

  validate({ email, code }) {
    const error = this.checker({ email, code });
    const result =
      error !== true
        ? {
            error: error[0].message,
            value: null,
          }
        : {
            error: null,
            value: { email, code },
          };
    return result;
  }
}

export default Password_less_by_email_validator;

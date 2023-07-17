import reset_password_by_email_validator from "src/domain/validators/Auth/reset_password_by_email";
const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  email: { type: "email", max: 255 },
  code: { type: "string", max: 6 },
  new_password: { type: "string", max: 40 },
};

class Reset_password_by_email_validator implements reset_password_by_email_validator {
  private checker;
  constructor() {
    this.checker = v.compile(schema);
  }

  validate({ email, code, new_password }) {
    const error = this.checker({
      email,
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
            value: { email, code, new_password },
          };
    return result;
  }
}

export default Reset_password_by_email_validator;

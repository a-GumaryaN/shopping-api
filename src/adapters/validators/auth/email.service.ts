import email_validator from "src/domain/validators/Auth/email_validator";
const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  email: { type: "email", max: 255 },
};

class Email_validator implements email_validator {
  private checker;
  constructor() {
    this.checker = v.compile(schema);
  }

  validate({ email }) {
    const error = this.checker({ email });

    const result =
      error !== true
        ? {
            error: error[0].message,
            value: null,
          }
        : {
            error: null,
            value: { email },
          };
    return result;
  }
}

export default Email_validator;

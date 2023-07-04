const Validator = require("fastest-validator");

const v = new Validator();
const login_with_email_schema = {
  email: { type: 'string', max: 255 },
  password: { type: 'string', max: 40 },
};

const login_with_phone_number_schema = {
  phone_number: { type: 'string', max: 20 },
  password: { type: 'string', max: 40 },
};

class Auth_validator_service implements auth_validator {
  login_with_email_validator(email: string, password: string) {
    const check = v.compile(login_with_email_schema);
    const error = check({ id: 5, name: 'John', status: true });

    const result = error
      ? {
          error: error,
          value: null,
        }
      : {
          error: null,
          value: { email, password },
        };
    return result;
  }

  login_with_phone_number_validator(phone_number: string, password: string) {
    const check = v.compile(login_with_phone_number_schema);
    const error = check({ id: 5, name: 'John', status: true });

    const result = error
      ? {
          error: error,
          value: null,
        }
      : {
          error: null,
          value: { phone_number, password },
        };
    return result;
  }
}

export default Auth_validator_service;

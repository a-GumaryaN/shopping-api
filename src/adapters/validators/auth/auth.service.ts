import { auth_validator } from 'src/domain/validators/auth';

const Validator = require('fastest-validator');

const v = new Validator();
const login_with_email_schema = {
  email: { type: 'email', max: 255 },
  password: { type: 'string', max: 40,required: true },
};

const login_with_phone_number_schema = {
  phone_number: { type: 'string', max: 20 },
  password: { type: 'string', max: 40 },
};

const email_schema = {
  email: { type: 'email', max: 255 },
};

const phone_number_schema = {
  email: { type: 'email', max: 255 },
};

const password_less_login_by_email_schema = {
  email: { type: 'email', max: 255 },
  code: { type: 'string', max: 40 },
};

const password_less_login_by_phone_number_schema = {
  phone_number: { type: 'email', max: 255 },
  code: { type: 'string', max: 40 },
};

const reset_password_by_email_schema = {
  email: { type: 'email', max: 255 },
  code: { type: 'string', max: 6 },
  new_password: { type: 'string', max: 40 },
};

const reset_password_by_phone_number_schema = {
  email: { type: 'email', max: 255 },
  code: { type: 'string', max: 6 },
  new_password: { type: 'string', max: 40 },
};

class Auth_validator_service implements auth_validator {
  private login_with_email_checker;
  private login_with_phone_number_checker;
  private email_checker;
  private phone_number_checker;
  private password_less_login_by_email_checker;
  private password_less_login_by_phone_number_checker;
  private reset_password_by_email_checker;
  private reset_password_by_phone_number_checker;
  constructor() {
    this.login_with_email_checker = v.compile(login_with_email_schema);
    this.login_with_phone_number_checker = v.compile(
      login_with_phone_number_schema,
    );
    this.email_checker = v.compile(email_schema);
    this.phone_number_checker = v.compile(phone_number_schema);
    this.password_less_login_by_email_checker = v.compile(
      password_less_login_by_email_schema,
    );

    this.password_less_login_by_phone_number_checker = v.compile(
      password_less_login_by_phone_number_schema,
    );

    this.reset_password_by_email_checker = v.compile(
      reset_password_by_email_schema,
    );

    this.reset_password_by_phone_number_checker = v.compile(
      reset_password_by_phone_number_schema,
    );
  }

  login_with_email_validator({ email, password }) {
    const error = this.login_with_email_checker({ email, password });

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

  login_with_phone_number_validator({ phone_number, password }) {
    const error = this.login_with_phone_number_checker({
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

  email_validator({ email }) {
    const error = this.email_checker({ email });

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

  phone_number_validator({ phone_number }) {
    const error = this.phone_number_checker({ phone_number });

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

  password_less_login_by_email_validator({ email, code }) {
    const error = this.password_less_login_by_email_checker({ email, code });
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

  password_less_by_email_validator({ email, code }) {
    const error = this.password_less_login_by_email_checker({
      email,
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
            value: { email, code },
          };
    return result;
  }

  password_less_by_phone_number_validator({ phone_number, code }) {
    const error = this.password_less_login_by_phone_number_checker({
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

  reset_password_by_email_validator({ email, code, new_password }) {
    const error = this.reset_password_by_email_checker({
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

  reset_password_by_phone_number_validator({
    phone_number,
    code,
    new_password,
  }) {
    const error = this.reset_password_by_phone_number_checker({
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

export default Auth_validator_service;

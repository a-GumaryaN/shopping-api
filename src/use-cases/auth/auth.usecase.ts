import { hash_service } from 'src/domain/adapters/hash_service';
import { jwt_service } from 'src/domain/adapters/jwt.interface';
import { login_schema } from 'src/domain/common/auth';

class Auth_use_case {
  constructor(
    private customer_repository,
    private validator: auth_validator,
    private Hash_service: hash_service,
    private Token_service: jwt_service,
  ) {}
  async login_with_email(
    email: string,
    password: string,
  ): Promise<login_schema> {
    //validation input data
    const { error, value } = this.validator.login_with_email_validator(
      email,
      password,
    );
    if (error)
      return {
        error: { error_code: 123, message: error, path: 'login_with_email' },
        token: null,
        user: null,
      };
    //checking existence of user
    const user = await this.customer_repository.findOne({ email });
    if (!user)
      return {
        error: {
          error_code: 123,
          message: 'user not found',
          path: 'login_with_email',
        },
        token: null,
        user: null,
      };
    //checking password validity
    const is_password_valid = this.Hash_service.compare(
      user.password,
      password,
    );
    if (!is_password_valid)
      return {
        error: {
          error_code: 123,
          message: 'password not valid',
          path: 'login_with_email',
        },
        token: null,
        user: null,
      };
    //generate new jwt token
    const token = this.Token_service.generate_token(
      { uuid: user.uuid, role: 'customer' },
      '1d',
    );
    //return token to user
    return { token, user, error: null };
  }

  async login_with_phone_number(phone_number, password): Promise<login_schema> {
    //validation input data
    const { error, value } = this.validator.login_with_phone_number_validator(
      phone_number,
      password,
    );
    if (error)
      return {
        error: { error_code: 123, message: error, path: 'login_with_email' },
        token: null,
        user: null,
      };
    //checking existence of user
    const user = await this.customer_repository.findOne({
      phone_number: value.phone_number,
    });
    if (!user)
      return {
        error: {
          error_code: 123,
          message: 'user not found',
          path: 'login_with_email',
        },
        token: null,
        user: null,
      };
    //checking password validity
    const is_password_valid = this.Hash_service.compare(
      user.password,
      password,
    );
    if (!is_password_valid)
      return {
        error: {
          error_code: 123,
          message: 'password not valid',
          path: 'login_with_email',
        },
        token: null,
        user: null,
      };
    //generate new jwt token
    const token = this.Token_service.generate_token(
      { uuid: user.uuid, role: 'customer' },
      '1d',
    );
    //return token to user
    return { token, user, error: null };
  }

  reset_password_by_email(email: string, code: string) {}

  reset_password_by_phone_number(phone_number: string, code: string) {}

  get_reset_code_by_email(email: string) {}

  get_reset_code_by_phone_number(email: string) {}
}

export default Auth_use_case;

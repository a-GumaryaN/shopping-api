import { hash_service } from 'src/domain/services/hash_service';
import { jwt_service } from 'src/domain/services/jwt.interface';
import { login_schema } from 'src/domain/common/auth';
import customer_repository from 'src/domain/repository/customer_repository';
import { auth_validator } from 'src/domain/validators/auth';

class Login_by_email {
  constructor(
    private customer_repository: customer_repository,
    private validator: auth_validator,
    private Hash_service: hash_service,
    private Token_service: jwt_service,
  ) {}

  /**
   *
   * @param email
   * @param password
   * @returns error object
   * @returns token
   * @returns user
   */
  async action({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<login_schema> {
    //validation input data
    const { error, value } = this.validator.login_with_email_validator({
      email,
      password,
    });
    if (error)
      return {
        error: { error_code: 123, message: error, path: 'login_with_email' },
        token: null,
        user: null,
      };
    //checking existence of user
    const user = await this.customer_repository.find_one(
      { email: value.email },
      { email: true },
    );
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
}

export default Login_by_email;

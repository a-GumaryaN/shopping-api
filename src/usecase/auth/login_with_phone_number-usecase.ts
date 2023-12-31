import { hash_service } from 'src/domain/services/hash_service';
import { jwt_service } from 'src/domain/services/jwt.interface';
import { login_schema } from 'src/domain/common/auth';
import customer_repository from 'src/domain/repository/customer_repository';

import login_with_phone_number_validator from 'src/domain/validators/Auth/login_with_phone_number';

class Login_by_phone_number {
  constructor(
    private customer_repository: customer_repository,
    private validator: login_with_phone_number_validator,
    private Hash_service: hash_service,
    private Token_service: jwt_service,
  ) {}

  /**
   *
   * @param phone_number
   * @param password
   * @returns error object
   * @returns token
   * @returns user
   */
  async action({
    phone_number,
    password,
  }: {
    phone_number: string;
    password: string;
  }): Promise<login_schema> {
    //validation input data
    const { error, value } = this.validator.validate({
      phone_number,
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
      {
        phone_number: value.phone_number,
      },
      { phone_number: true },
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

export default Login_by_phone_number;

import { jwt_service } from 'src/domain/services/jwt.interface';
import { login_schema } from 'src/domain/common/auth';
import customer_repository from 'src/domain/repository/customer_repository';

import code_repository from 'src/domain/repository/code_repository';
import password_less_login_by_email_validator from 'src/domain/validators/Auth/password_less_login_by_email';

class Password_less_login_by_email {
  constructor(
    private customer_repository: customer_repository,
    private code_repository: code_repository,
    private validator: password_less_login_by_email_validator,
    private Token_service: jwt_service,
  ) {}

  /**
   * @param email
   * @param code
   * @return token
   * @return user
   * @return error
   */
  async action(email: string, code: string): Promise<login_schema> {
    //validate input data
    const { error, value } =
      this.validator.validate({
        email,
        code,
      });
    if (error)
      return {
        token: '',
        user: null,
        error: {
          error_code: 123,
          message: error,
          path: 'password less login by email',
        },
      };
    //check existence of user
    const user = await this.customer_repository.find_one(
      { email },
      { email: true },
    );
    if (!user)
      return {
        token: '',
        user: null,
        error: {
          error_code: 123,
          message: 'user not found',
          path: 'password less login by email',
        },
      };
    //check validity of code
    const registered_code = await this.code_repository.find_one(
      { email, target: 'password less login' },
      { code: true, target: true },
    );
    if (!registered_code)
      return {
        token: '',
        user: null,
        error: {
          error_code: 123,
          message: 'code not registered for this email',
          path: 'password less login by email',
        },
      };
    //generate token
    const token = this.Token_service.generate_token(
      { uuid: user.uuid, role: 'customer' },
      '1d',
    );
    //return token
    return {
      token,
      user,
      error: null,
    };
  }
}

export default Password_less_login_by_email;

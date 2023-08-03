import { jwt_service } from 'src/domain/services/jwt.interface';
import { login_schema } from 'src/domain/common/auth';
import customer_repository from 'src/domain/repository/customer_repository';

import code_repository from 'src/domain/repository/code_repository';
import password_less_login_by_email_validator from 'src/domain/validators/Auth/password_less_login_by_email';

class Password_less_login_by_phone_number {
  constructor(
    private customer_repository: customer_repository,
    private code_repository: code_repository,
    private validator: password_less_login_by_email_validator,
    private Token_service: jwt_service,
  ) {}

  /**
   * login with phone number and new code
   * @param phone_number
   * @param code
   * @returns token
   * @returns user
   * @returns error object
   */
  async action(phone_number: string, code: string): Promise<login_schema> {
    const path = 'password less login by phone number';
    //validate input data
    const { error, value } =
      await this.validator.validate({
        phone_number,
        code,
      });
    if (error)
      return {
        token: null,
        user: null,
        error: {
          error_code: 123,
          message: error,
          path,
        },
      };
    //check existence of user
    const registered_code = await this.code_repository.find_one(
      { phone_number, target: 'password less login' },
      { phone_number: true, code:true },
    );
    if (!registered_code)
      return {
        token: null,
        user: null,
        error: {
          error_code: 123,
          message: 'code not set for this phone number',
          path,
        },
      };
    //check validity of code
    if (registered_code.code !== code)
      return {
        token: null,
        user: null,
        error: {
          error_code: 123,
          message: 'code not valid',
          path,
        },
      };
    //after successful code validation , delete code
    await this.code_repository.delete_one({
      phone_number,
      target: "password less login",
    });
    //generate token
    const user = await this.customer_repository.find_one({ phone_number }, {});
    const { uuid, first_name, last_name, profile_image, email } = user;
    //generate new jwt token
    const token = this.Token_service.generate_token({
      uuid,
      role: "customer",
      first_name,
      last_name,
      email,
      profile_image,
      phone_number,
    });
    //return token
    return { token, user, error: null };
  }
}

export default Password_less_login_by_phone_number;

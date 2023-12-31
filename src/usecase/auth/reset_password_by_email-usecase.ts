import { hash_service } from 'src/domain/services/hash_service';
import { jwt_service } from 'src/domain/services/jwt.interface';
import { login_schema } from 'src/domain/common/auth';
import customer_repository from 'src/domain/repository/customer_repository';
import code_repository from 'src/domain/repository/code_repository';
import reset_password_by_email_validator from 'src/domain/validators/Auth/reset_password_by_email';

class Reset_password_by_email {
  constructor(
    private customer_repository: customer_repository,
    private code_repository: code_repository,
    private validator: reset_password_by_email_validator,
    private Hash_service: hash_service,
    private Token_service: jwt_service,
  ) {}

  /**
   * reset password with registered code and email
   * @param email
   * @param code
   * @param new_password
   * @returns token
   * @returns user
   * @returns error object
   */
  async action(
    email: string,
    code: string,
    new_password: string,
  ): Promise<login_schema> {
    const path = 'reset password by email';
    //validate input data
    const { error, value } = this.validator.validate({
      email,
      new_password,
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
    //check code
    const registered_code = await this.code_repository.find_one(
      { target: 'reset password', email },
      { code: true },
    );
    if (!registered_code)
      return {
        token: null,
        user: null,
        error: {
          error_code: 123,
          message: 'code not set for this email',
          path,
        },
      };
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
    //delete last code from database
    await this.code_repository.delete_one({ email });
    //reset password
    const hashed_new_password = await this.Hash_service.hash(new_password);
    await this.customer_repository.update_one(
      { email },
      { password: hashed_new_password },
    );
    const user = await this.customer_repository.find_one(
      { email },
      { uuid: true },
    );
    const token = this.Token_service.generate_token(
      { uuid: user.uuid, role: 'customer' },
      '1d',
    );
    //return token to client
    return { token, user, error: null };
  }
}

export default Reset_password_by_email;

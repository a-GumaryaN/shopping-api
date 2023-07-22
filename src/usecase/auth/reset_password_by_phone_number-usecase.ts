import { hash_service } from 'src/domain/services/hash_service';
import { jwt_service } from 'src/domain/services/jwt.interface';
import { login_schema } from 'src/domain/common/auth';
import customer_repository from 'src/domain/repository/customer_repository';

import code_repository from 'src/domain/repository/code_repository';
import reset_password_by_phone_number_validator from 'src/domain/validators/Auth/reset_password_by_phone_number';

class Reset_password_by_phone_number {
  constructor(
    private customer_repository: customer_repository,
    private code_repository: code_repository,
    private validator: reset_password_by_phone_number_validator,
    private Hash_service: hash_service,
    private Token_service: jwt_service,
  ) {}

  /**
   *
   * @param phone_number
   * @param code
   * @param new_password
   * @returns token
   * @returns user
   * @returns error object
   */
  async action(
    phone_number: string,
    code: string,
    new_password: string,
  ): Promise<login_schema> {
    const path = 'reset password by_phone number';
    //validate input data
    const { error } = this.validator.validate({
      phone_number,
      code,
      new_password,
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
      { target: 'reset password', phone_number },
      { code:true },
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
    //delete latest code from database
    await this.code_repository.delete_one({
      code,
      target: 'reset password',
      phone_number,
    });
    //generate hash of new password
    const hashed_new_password = await this.Hash_service.hash(new_password);
    await this.customer_repository.update_one(
      { phone_number },
      { password: hashed_new_password },
    );
    const user = await this.customer_repository.find_one({ phone_number }, {});
    const token = this.Token_service.generate_token(
      { uuid: user.uuid, role: 'customer' },
      '1d',
    );
    //return code to client
    return { token, user, error: null };
  }
}

export default Reset_password_by_phone_number;

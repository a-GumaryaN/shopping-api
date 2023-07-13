import result from 'src/domain/common/result';
import customer_repository from 'src/domain/repository/customer_repository';
import { send_validation_code } from 'src/domain/services/code.sender';
import { auth_validator } from 'src/domain/validators/auth';
import code_generator from 'src/domain/services/code_generator';
import code_repository from 'src/domain/repository/code_repository';

class Get_reset_code_by_email {
  constructor(
    private customer_repository: customer_repository,
    private code_repository: code_repository,
    private validator: auth_validator,
    private email_service: send_validation_code,
    private code_generator: code_generator,
  ) {}

  /**
   * send code to user email for resetting password
   * @param email
   * @returns result
   * @returns error object
   */
  async action(email: string): Promise<result> {
    //validate email
    const { error, value } = this.validator.email_validator(email);
    if (error)
      return {
        result: null,
        error: {
          error_code: 123,
          message: error,
          path: 'get reset code by email',
        },
      };
    //check existing email
    const user = this.customer_repository.find_one(
      { email: value.email },
      { email: 1 },
    );
    if (!user)
      return {
        result: null,
        error: {
          error_code: 123,
          message: 'user not found',
          path: 'get reset code by email',
        },
      };
    //generate new code
    const code: string = this.code_generator.generate();
    //save generated code to database
    const new_code: code = {
      target: 'reset password',
      email: value.email,
      phone_number: '',
      code,
    };
    await this.code_repository.add_new(new_code);
    //send code to user email
    await this.email_service.sender(value.email, code);
    //return result
    return { result: 'code send to email', error: null };
  }
}

export default Get_reset_code_by_email;

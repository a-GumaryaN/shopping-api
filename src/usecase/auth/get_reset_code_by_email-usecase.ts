import result from "src/domain/common/result";
import customer_repository from "src/domain/repository/customer_repository";
import { send_validation_code } from "src/domain/services/code.sender";

import code_generator from "src/domain/services/code_generator";
import code_repository from "src/domain/repository/code_repository";
import email_validator from "src/domain/validators/Auth/email_validator";
import Code from "src/domain/model/Code";

class Get_reset_code_by_email {
  constructor(
    private customer_repository: customer_repository,
    private code_repository: code_repository,
    private validator: email_validator,
    private email_service: send_validation_code,
    private code_generator: code_generator
  ) {}

  /**
   * send code to user email for resetting password
   * @param email
   * @returns result
   * @returns error object
   */
  async action(email: string): Promise<result> {
    const path = "get reset code by email";
    //validate email
    const { error, value } = this.validator.validate({ email });
    if (error)
      return {
        result: null,
        error: {
          error_code: 123,
          message: error,
          path,
        },
      };
    //check existing email
    const user = await this.customer_repository.find_one(
      { email: value.email },
      { email: true }
    );
    if (!user)
      return {
        result: null,
        error: {
          error_code: 123,
          message: "user not found",
          path: "get reset code by email",
        },
      };
    //generate new code
    const code: string = this.code_generator.generate();
    //check if code save for this email
    const last_code = await this.code_repository.find_one(
      {
        email: value.email,
      },
      { code }
    );
    //if code exist delete code
    if (last_code)
      await this.code_repository.delete_one({
        email: value.email,
      });
    //save generated code to database
    const new_code: Code = {
      target: "reset password",
      email: value.email,
      phone_number: "",
      code,
    };
    await this.code_repository.add_new(new_code);
    //send code to user email
    await this.email_service.sender(value.email, code);
    //return result
    return { result: "code send to email"+code, error: null };
  }
}

export default Get_reset_code_by_email;

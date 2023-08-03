import result from "src/domain/common/result";
import customer_repository from "src/domain/repository/customer_repository";
import { send_validation_code } from "src/domain/services/code.sender";

import code_generator from "src/domain/services/code_generator";
import code_repository from "src/domain/repository/code_repository";
import Code from "src/domain/model/Code";
import email_validator from "src/domain/validators/Auth/email_validator";

class Get_login_code_by_email {
  constructor(
    private customer_repository: customer_repository,
    private code_repository: code_repository,
    private validator: email_validator,
    private email_service: send_validation_code,
    private code_generator: code_generator
  ) {}

  /**
   * sms code to user with phone number for password-less login
   * @param email
   * @returns result
   * @returns error object
   */
  async action(email: string): Promise<result> {
    const path = "get login code_by phone number";
    //validate input data
    const { error, value } = this.validator.validate({
      email,
    });
    if (error)
      return {
        error: {
          error_code: 123,
          message: error,
          path,
        },
      };
    //check existence of user
    const user = await this.customer_repository.find_one(
      { email: value.email },
      { email: true }
    );
    if (!user)
      return {
        error: {
          error_code: 123,
          message: "User not found",
          path,
        },
      };
    // generate new  code
    const code = this.code_generator.generate();
    //sms code to client
    await this.email_service.sender(user.email, code);
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
    //save new code to database
    const new_code: Code = {
      code,
      target: "password less login",
      email,
      phone_number: "",
    };
    await this.code_repository.add_new(new_code);
    //send result to client
    return { result: "code emailed to client", error: null };
  }
}

export default Get_login_code_by_email;

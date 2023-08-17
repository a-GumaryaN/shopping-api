import result from "src/domain/common/result";
import customer_repository from "src/domain/repository/customer_repository";
import { send_validation_code } from "src/domain/services/code.sender";

import code_generator from "src/domain/services/code_generator";
import code_repository from "src/domain/repository/code_repository";
import phone_number_validator from "src/domain/validators/Auth/phone_number";
import Code from "src/domain/model/Code";

class Get_login_code_by_phone_number {
  constructor(
    private customer_repository: customer_repository,
    private code_repository: code_repository,
    private validator: phone_number_validator,
    private SMS_service: send_validation_code,
    private code_generator: code_generator
  ) {}

  /**
   * sms code to user with phone number for password-less login
   * @param phone_number
   * @returns result
   * @returns error object
   */
  async action(phone_number: string): Promise<result> {
    const path = "get login code_by phone number";
    //validate input data
    const { error, value } = this.validator.validate({
      phone_number,
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
      { phone_number: value.phone_number },
      { phone_number: true }
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
    await this.SMS_service.sender(user.phone_number, code);
    //check if code save for this phone number
    const last_code = await this.code_repository.find_one(
      {
        phone_number: value.phone_number,
      },
      { code }
    );
    //if code exist delete code
    if (last_code)
      await this.code_repository.delete_one({
        phone_number: value.phone_number,
      });
    //save new code to database
    const new_code: Code = {
      code,
      target: "password less login",
      phone_number,
      email: "",
    };
    await this.code_repository.add_new(new_code);
    //send result to client
    return { result: "code sms to client"+code, error: null };
  }
}

export default Get_login_code_by_phone_number;

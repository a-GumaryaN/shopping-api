import customer_repository from "src/domain/repository/customer_repository";
import { send_validation_code } from "src/domain/services/code.sender";
import code_generator from "src/domain/services/code_generator";
import code_repository from "src/domain/repository/code_repository";
import phone_number_validator from "src/domain/validators/Auth/phone_number";
import Code from "src/domain/model/Code";

class Get_reset_code_by_phone_number {
  constructor(
    private customer_repository: customer_repository,
    private code_repository: code_repository,
    private validator: phone_number_validator,
    private email_service: send_validation_code,
    private code_generator: code_generator
  ) {}

  /**
   * send code to user email for resetting password
   * @param phone_number
   * @returns result
   * @returns error object
   */
  async action(phone_number: string) {
    //validate phone_number
    const { error, value } = this.validator.validate({ phone_number });
    if (error)
      return {
        result: null,
        error: {
          error_code: 123,
          message: error,
          path: "get reset code by phone number",
        },
      };
    //check existing email
    const user = await this.customer_repository.find_one(
      { phone_number: value.phone_number },
      { phone_number: true }
    );
    if (!user)
      return {
        result: null,
        error: {
          error_code: 123,
          message: "user not found",
          path: "get reset code by phone number",
        },
      };
    //generate new code
    const code: string = this.code_generator.generate();
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
    //save generated code to database
    const new_code: Code = {
      target: "reset password",
      phone_number: value.phone_number,
      email: "",
      code,
    };
    await this.code_repository.add_new(new_code);
    //send code to user email
    await this.email_service.sender(value.email, code);
    //return result
    return { result: "code sms to phone_number"+code, error: null };
  }
}

export default Get_reset_code_by_phone_number;

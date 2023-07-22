import result from "src/domain/common/result";
import Code from "src/domain/model/Code";
import code_repository from "src/domain/repository/code_repository";
import { send_validation_code } from "src/domain/services/code.sender";
import code_generator from "src/domain/services/code_generator";
import email_validator from "src/domain/validators/Auth/email_validator";

class Get_register_code_by_email_usecase {
  constructor(
    private Code_repository: code_repository,
    private Code_generator: code_generator,
    private Emailer_service: send_validation_code,
    private Email_validator: email_validator
  ) {}
  async action({ email }: { email: string }): Promise<result> {
    //validate input email
    const { error: validation_error } = this.Email_validator.validate({
      email,
    });
    if (validation_error)
      return {
        result: null,
        error: {
          error_code: 123,
          message: validation_error,
          path: "get register code by email",
        },
      };
    //generate new code
    const new_code = this.Code_generator.generate();
    //check existence of code
    const registered_code = this.Code_repository.find_one({ email }, {});
    //if code registered then delete it for save new one
    if (registered_code) this.Code_repository.delete_one({ email });
    //save new code to repository
    const new_code_object: Code = {
      code: new_code,
      email,
      target: "registration",
      phone_number: "",
    };
    await this.Code_repository.add_new(new_code_object);
    //email generated code
    await this.Emailer_service.sender(email, new_code);
    //return response
    return {
      result: "code emailed successfully",
      error: null,
    };
  }
}

export default Get_register_code_by_email_usecase;

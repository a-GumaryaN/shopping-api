import result from "src/domain/common/result";
import Code from "src/domain/model/Code";
import code_repository from "src/domain/repository/code_repository";
import { send_validation_code } from "src/domain/services/code.sender";
import code_generator from "src/domain/services/code_generator";
import phone_number_validator from "src/domain/validators/Auth/phone_number";

class Get_register_code_by_phone_number {
  constructor(
    private Code_repository: code_repository,
    private Code_generator: code_generator,
    private SMS_service: send_validation_code,
    private Phone_number_validator: phone_number_validator
  ) {}
  async action({ phone_number }: { phone_number: string }): Promise<result> {
    //validate input phone number
    const { error: validation_error } = this.Phone_number_validator.validate({
      phone_number,
    });
    if (validation_error)
      return {
        result: null,
        error: {
          error_code: 123,
          message: validation_error,
          path: "get register code by phone number",
        },
      };
    //generate new code
    const new_code = this.Code_generator.generate();
    //check existence of code
    const registered_code = this.Code_repository.find_one({ phone_number }, {});
    //if code registered then delete it for save new one
    if (registered_code) this.Code_repository.delete_one({ phone_number });
    //save new code to repository
    const new_code_object: Code = {
      code: new_code,
      phone_number,
      target: "registration",
      email: "",
    };
    await this.Code_repository.add_new(new_code_object);
    //SMS generated code
    await this.SMS_service.sender(phone_number, new_code);
    //return response
    return {
      result: "code sended successfully",
      error: null,
    };
  }
}

export default Get_register_code_by_phone_number;

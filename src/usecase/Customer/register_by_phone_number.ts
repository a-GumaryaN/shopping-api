import { login_schema } from "src/domain/common/auth";
import { Customer } from "src/domain/model";
import code_repository from "src/domain/repository/code_repository";
import customer_repository from "src/domain/repository/customer_repository";
import { hash_service } from "src/domain/services/hash_service";
import { jwt_service } from "src/domain/services/jwt.interface";
import uuid_generator from "src/domain/services/uuid_generator";
import register_by_phone_number_validator from "src/domain/validators/Customer/register_by_phone_number_validator";

class Register_by_phone_number {
  constructor(
    private Customer_repository: customer_repository,
    private Code_repository: code_repository,
    private Uuid_generator: uuid_generator,
    private Hash_service: hash_service,
    private Token_service: jwt_service,
    private Register_by_phone_number_validator: register_by_phone_number_validator
  ) {}
  async action({
    code,
    new_customer,
  }: {
    code: string;
    new_customer: Pick<
      Customer,
      "phone_number" | "first_name" | "last_name" | "password"
    >;
  }): Promise<login_schema> {
    //validate input data
    const { error: validation_error, value } =
      this.Register_by_phone_number_validator.validate({ code, new_customer });
    if (validation_error)
      return {
        error: {
          error_code: 123,
          message: validation_error,
          path: "register by phone number",
        },
        user: null,
        token: null,
      };
    //check existence and validity of code
    const register_code = await this.Code_repository.find_one(
      { phone_number: new_customer.phone_number, target: "registration" },
      { code: true }
    );
    //check existence of code
    if (!register_code)
      return {
        error: {
          error_code: 123,
          message: "code not set for this email",
          path: "register by phone number",
        },
        user: null,
        token: null,
      };
    //check validity of code
    if (register_code.code !== code)
      return {
        error: {
          error_code: 123,
          message: "code not valid",
          path: "register by phone number",
        },
        user: null,
        token: null,
      };
    //check existence of user
    const registered_user = await this.Customer_repository.find_one(
      { phone_number: new_customer.phone_number },
      { phone_number: true }
    );
    if (!registered_user)
      return {
        error: {
          error_code: 123,
          message: "user registered",
          path: "register by phone number",
        },
        user: null,
        token: null,
      };
    //generate new uuid
    const uuid = this.Uuid_generator.generate();
    //hash password
    const hashed_password = await this.Hash_service.hash(new_customer.password);
    //save user
    await this.Customer_repository.add_new({
      ...value,
      uuid,
      password: hashed_password,
    });
    //generate new token
    const token = this.Token_service.generate_token({
      uuid,
      role: "customer",
      first_name: new_customer.first_name,
      last_name: new_customer.last_name,
      phone_number: new_customer.phone_number,
      profile_image: "",
      email: "",
    });
    //return result
    return {
      token,
      user: new_customer,
      error: null,
    };
  }
}

export default Register_by_phone_number;

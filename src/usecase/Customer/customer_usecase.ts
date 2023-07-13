import { hash_service } from 'src/domain/services/hash_service';
import { jwt_service } from 'src/domain/services/jwt.interface';
import { login_schema } from 'src/domain/common/auth';
import customer_repository from 'src/domain/repository/customer_repository';

class Customer_register {
  constructor(
    private customer_repository: customer_repository,
    private Hash_service: hash_service,
    private Token_service: jwt_service,
  ) {}

  /**
   * register by email and validation code
   * @param email
   * @param code
   * @return error message
   * @return token
   */
  async register_by_email(email: string, code: string): Promise<login_schema> {
    //validate input data
    //check existence of user
    //generate token
    //return token
    return {
      token: 'token',
      user: null,
      error: null,
    };
  }

  /**
   * register by email and validation code
   * @param phone_number
   * @param code
   * @return error message
   * @return token
   */
  async register_by_phone_number(
    phone_number: string,
    code: string,
  ): Promise<login_schema> {
    //validate input data
    //check existence of user
    //generate token
    //return token
    return {
      token: 'token',
      user: null,
      error: null,
    };
  }
}

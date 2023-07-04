import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { Customer_schema } from './model/customer.model';
import {
  Get_register_code_by_email,
  Get_register_code_by_phone_number,
  Register_by_email,
  Register_by_phone_number,
} from './dto/customer.dto';
import { Result } from '../common/model/result';

@Resolver((of) => Customer_schema)
class Customer_resolver {
  constructor() {}
  /**
   * login resolver with phone number
   * @param pho_number
   * @param password
   * @returns token
   * @returns user
   * @returns error
   */
  @Mutation(() => Result)
  async get_register_code_by_email(
    @Args() { email }: Get_register_code_by_email,
  ): Promise<Result> {
    return {
      result: '',
      error: null,
    };
  }

  /**
   * login resolver with phone number
   * @param pho_number
   * @param password
   * @returns token
   * @returns user
   * @returns error
   */
  @Mutation(() => Result)
  async get_register_code_by_phone_number(
    @Args() { phone_number }: Get_register_code_by_phone_number,
  ): Promise<Result> {
    return {
      result: '',
      error: null,
    };
  }

  /**
   * login resolver with phone number
   * @param email
   * @param password
   * @returns token
   * @returns error
   */
  @Mutation(() => Result)
  async register_by_email(
    @Args() { email }: Register_by_email,
  ): Promise<Result> {
    return {
      result: '',
      error: null,
    };
  }

  /**
   * login resolver with phone number
   * @param phone_number
   * @param password
   * @returns token
   * @returns user
   * @returns error
   */
  @Mutation(() => Result)
  async register_by_phone_number(
    @Args() { phone_number, }: Register_by_phone_number,
  ): Promise<Result> {
    return {
      result: '',
      error: null,
    };
  }
}

export default Customer_resolver;

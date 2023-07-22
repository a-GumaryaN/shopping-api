import { Args, Query, Mutation, Resolver } from "@nestjs/graphql";
import { Customer_schema } from "./model/customer.model";
import {
  Get_register_code_by_email_args,
  Get_register_code_by_phone_number_args,
  Register_by_email_args,
  Register_by_phone_number_args,
  Update_customer_args,
} from "./dto/customer.args";
import { Result } from "../common/model/result";
import { Inject, UseGuards } from "@nestjs/common";
import Usecase_proxy_module from "src/adapters/usecase-proxy/customer/customer_usecase_proxy.module";
import Get_register_code_by_email from "src/usecase/Customer/get_register_code_by_email";
import Get_register_code_by_phone_number from "src/usecase/Customer/get_register_code_by_phone_number";
import Register_by_email from "src/usecase/Customer/register_by_email";
import Register_by_phone_number from "src/usecase/Customer/register_by_phone_number";
import { Customer } from "src/domain/model";
import Graphql_auth_guard from "src/adapters/common/guard/jwt/jwt.graphql.guard";
import Jwt_auth_guard from "src/adapters/common/guard/jwt_local.guard";

@Resolver((of) => Customer_schema)
class Customer_resolver {
  constructor(
    @Inject(Usecase_proxy_module.Get_register_code_by_email)
    private Get_register_code_by_email: Get_register_code_by_email,
    @Inject(Usecase_proxy_module.Get_register_code_by_phone_number)
    private Get_register_code_by_phone_number: Get_register_code_by_phone_number,
    @Inject(Usecase_proxy_module.Register_by_email)
    private Register_by_email: Register_by_email,
    @Inject(Usecase_proxy_module.Register_by_phone_number)
    private Register_by_phone_number: Register_by_phone_number
  ) {}
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
    @Args() { email }: Get_register_code_by_email_args
  ): Promise<Result> {
    return await this.Get_register_code_by_email.action({ email });
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
    @Args() { phone_number }: Get_register_code_by_phone_number_args
  ): Promise<Result> {
    return await this.Get_register_code_by_phone_number.action({
      phone_number,
    });
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
    @Args() { code, new_customer }: Register_by_email_args
  ): Promise<Result> {
    return await this.Register_by_email.action({ code, new_customer });
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
    @Args() { code, new_customer }: Register_by_phone_number_args
  ): Promise<Result> {
    return await this.Register_by_phone_number.action({ code, new_customer });
  }

  /**
   * //update customer
   * @param updated_customer
   * @returns result object
   */
  @Mutation(() => Result)
  @UseGuards(Jwt_auth_guard)
  async update_customer(
    @Args() { updated_customer }: Update_customer_args
  ): Promise<Result> {
    return {
      result: null,
      error: null,
    };
  }

  /**
   * //return customer
   * @param updated_customer
   * @returns result object
   */
  @Query(() => Customer_schema)
  @UseGuards(Graphql_auth_guard)
  async customer(): Promise<Partial<Customer>> {
    return {
      first_name:"john",
      last_name:"doe",
    };
  }
}

export default Customer_resolver;

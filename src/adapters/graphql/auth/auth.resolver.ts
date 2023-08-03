import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Login_schema } from "./model/auth.model";
import {
  Get_login_code_by_phone_number,
  Get_reset_code_by_email,
  Get_reset_code_by_phone_number,
  Login_by_email,
  Login_by_phone_number,
  Password_less_login_by_email,
  Password_less_login_by_phone_number,
  Reset_password_by_email,
  Reset_password_by_phone_number,
} from "src/usecase/auth";

import {
  Get_email_args,
  Get_phone_number_args,
  Login_by_email_args,
  Login_by_phone_number_args,
  Password_less_login_by_email_args,
  Password_less_login_by_phone_number_args,
  Reset_password_by_email_args,
  Reset_password_by_phone_number_args,
} from "src/adapters/graphql/auth/dto/auth.args";
import { Result } from "../common/model/result";
import { Inject } from "@nestjs/common";
import result from "src/domain/common/result";
import Usecase_proxy_module from "src/adapters/usecase-proxy/auth/usercase-proxy.module";
import Get_login_code_by_email from "src/usecase/auth/get_login_code_by_email-usecase";
import { login_schema } from "src/domain/common/auth";

@Resolver((of) => Login_schema)
class Auth_resolver {
  constructor(
    @Inject(Usecase_proxy_module.Get_login_code_by_phone_number)
    private Get_login_code_by_phone_number: Get_login_code_by_phone_number,
    @Inject(Usecase_proxy_module.Get_login_code_by_email)
    private Get_login_code_by_email: Get_login_code_by_email,
    @Inject(Usecase_proxy_module.Get_reset_code_by_email)
    private Get_reset_code_by_email: Get_reset_code_by_email,
    @Inject(Usecase_proxy_module.Get_reset_code_by_phone_number)
    private Get_reset_code_by_phone_number: Get_reset_code_by_phone_number,
    @Inject(Usecase_proxy_module.Login_by_email)
    private Login_by_email: Login_by_email,
    @Inject(Usecase_proxy_module.Login_by_phone_number)
    private Login_by_phone_number: Login_by_phone_number,
    @Inject(Usecase_proxy_module.Password_less_login_by_email)
    private Password_less_login_by_email: Password_less_login_by_email,
    @Inject(Usecase_proxy_module.Password_less_login_by_phone_number)
    private Password_less_login_by_phone_number: Password_less_login_by_phone_number,
    @Inject(Usecase_proxy_module.Reset_password_by_email)
    private Reset_password_by_email: Reset_password_by_email,
    @Inject(Usecase_proxy_module.Reset_password_by_phone_number)
    private Reset_password_by_phone_number: Reset_password_by_phone_number
  ) {}

  /**
   * login with email and password
   * @param email
   * @param password
   * @returns token
   * @returns user
   * @returns error
   */
  @Mutation(() => Result)
  async get_login_code_by_email(
    @Args() { email }: Get_email_args
  ): Promise<result> {
    return await this.Get_login_code_by_email.action(email);
  }

  /**
   * route for ask code for password less system
   * @param phone_number
   * @param password
   * @returns token
   * @returns user
   * @returns error
   */
  @Mutation(() => Result)
  async get_login_code_by_phone_number(
    @Args() { phone_number }: Get_phone_number_args
  ): Promise<Result> {
    return await this.Get_login_code_by_phone_number.action(phone_number);
  }

  /**
   * get code by email for reset password
   * @param email
   * @param password
   * @returns token
   * @returns result
   * @returns error
   */
  @Mutation(() => Result)
  async get_reset_code_by_email(
    @Args() { email }: Get_email_args
  ): Promise<Result> {
    return await this.Get_reset_code_by_email.action(email);
  }

  /**
   * get code by phone number for reset password
   * @param phone_number
   * @param password
   * @returns result
   * @returns error
   */
  @Mutation(() => Result)
  async get_reset_code_by_phone_number(
    @Args() { phone_number }: Get_phone_number_args
  ): Promise<Result> {
    return await this.Get_reset_code_by_phone_number.action(phone_number);
  }

  /**
   * login with email
   * @param email
   * @param password
   * @returns token
   * @returns user
   * @returns error
   */
  @Query(() => Login_schema)
  async login_by_email(
    @Args() { email, password }: Login_by_email_args
  ): Promise<Login_schema> {
    return await this.Login_by_email.action({ email, password });
  }

  /**
   * login resolver with phone number
   * @param phone_number
   * @param password
   * @returns token
   * @returns user
   * @returns error
   */
  @Query(() => Login_schema)
  async login_by_phone_number(
    @Args() { password, phone_number }: Login_by_phone_number_args
  ): Promise<Login_schema> {
    return await this.Login_by_phone_number.action({
      password,
      phone_number,
    });
  }

  /**
   * route for login with password less pattern
   * @param email
   * @param code
   * @returns token
   * @returns user
   * @returns error
   */
  @Query(() => Login_schema)
  async password_less_login_by_email(
    @Args() { email, code }: Password_less_login_by_email_args
  ): Promise<login_schema> {
    return await this.Password_less_login_by_email.action(email, code);
  }

  /**
   * route for login with password less pattern
   * @param phone_number
   * @param code
   * @returns token
   * @returns user
   * @returns error
   */
  @Query(() => Login_schema)
  async password_less_login_by_phone_number(
    @Args() { phone_number, code }: Password_less_login_by_phone_number_args
  ): Promise<login_schema> {
    return await this.Password_less_login_by_phone_number.action(
      phone_number,
      code
    );
  }

  /**
   * reset password by email and given code
   * @param email
   * @param given code
   * @param new_password
   * @returns token
   * @returns user
   * @returns error
   */
  @Mutation(() => Login_schema)
  async reset_password_by_email(
    @Args() { email, new_password, code }: Reset_password_by_email_args
  ): Promise<login_schema> {
    return this.Reset_password_by_email.action(email, code, new_password);
  }

  /**
   * route for ask code for password less system
   * @param phone_number
   * @param given code
   * @param new_password
   * @returns token
   * @returns user
   * @returns error
   */
  @Mutation(() => Login_schema)
  async reset_password_by_phone_number(
    @Args()
    { phone_number, new_password, code }: Reset_password_by_phone_number_args
  ): Promise<login_schema> {
    return this.Reset_password_by_phone_number.action(
      phone_number,
      code,
      new_password
    );
  }
}

export default Auth_resolver;

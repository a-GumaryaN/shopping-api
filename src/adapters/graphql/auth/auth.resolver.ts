import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Login_schema } from './model/auth.model';
import {
  Get_login_code_by_email,
  Get_login_code_by_phone_number,
  Login_by_email,
  Login_by_phone_number,
  Password_less_login_by_email,
  Password_less_login_by_phone_number,
  Reset_password_by_email,
  Reset_password_by_phone_number,
} from './dto/auth.args';
import Auth_use_case from 'src/use-cases/auth/auth.usecase';
import { Result } from '../common/model/result';
import { Inject } from '@nestjs/common';
import Usecase_proxy_module from 'src/adapters/usecase-proxy/usercase-proxy.module';
import result from 'src/domain/common/result';

@Resolver((of) => Login_schema)
class Auth_resolver {
  constructor(
    @Inject(Usecase_proxy_module.Auth_use_case_proxy)
    private auth_use_case: Auth_use_case,
  ) {}
  /**
   * login resolver with email
   * @param email
   * @param password
   * @returns token
   * @returns user
   * @returns error
   */
  @Query(() => Login_schema)
  async login_by_email(
    @Args() { email, password }: Login_by_email,
  ): Promise<Login_schema> {
    // return await this.auth_service.login_by_email(email, password);
    return await this.auth_use_case.login_with_email(email, password);
  }

  /**
   * login resolver with phone number
   * @param pho_number
   * @param password
   * @returns token
   * @returns user
   * @returns error
   */
  @Query(() => Login_schema)
  async login_by_phone_number(
    @Args() { password, phone_number }: Login_by_phone_number,
  ): Promise<Login_schema> {
    return await this.auth_use_case.login_with_phone_number(
      password,
      phone_number,
    );
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
  async get_login_code_by_email(
    @Args() { email }: Get_login_code_by_email,
  ): Promise<result> {
    return await this.auth_use_case.get_reset_code_by_email(email);
  }

  /**
   * login resolver with phone number
   * @param pho_number
   * @param password
   * @param new_password
   * @returns token
   * @returns user
   * @returns error
   */
  @Mutation(() => Result)
  async reset_password_by_email(
    @Args() { email, new_password, code }: Reset_password_by_email,
  ): Promise<Result> {
    return this.auth_use_case.reset_password_by_phone_number(
      email,
      code,
      new_password,
    );
  }

  /**
   * route for ask code for password less system
   * @param email
   * @param password
   * @param new_password
   * @returns token
   * @returns user
   * @returns error
   */
  @Mutation(() => Result)
  async reset_password_by_phone_number(
    @Args()
    { phone_number, new_password, code }: Reset_password_by_phone_number,
  ): Promise<result> {
    return this.auth_use_case.reset_password_by_phone_number(
      phone_number,
      code,
      new_password,
    );
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
    @Args() { phone_number }: Get_login_code_by_phone_number,
  ): Promise<Result> {
    return await this.auth_use_case.get_login_code_by_phone_number(
      phone_number,
    );
  }

  /**
   * route for login with password less pattern
   * @param email
   * @param code
   * @returns token
   * @returns user
   * @returns error
   */
  @Query(() => Result)
  async password_less_login_by_email(
    @Args() { email, code }: Password_less_login_by_email,
  ): Promise<result> {
    return await this.auth_use_case.password_less_login_by_email(email, code);
  }

  /**
   * route for login with password less pattern
   * @param phone_number
   * @param code
   * @returns token
   * @returns user
   * @returns error
   */
  @Query(() => Result)
  async password_less_login_by_phone_number(
    @Args() { phone_number, code }: Password_less_login_by_phone_number,
  ): Promise<result> {
    return await this.auth_use_case.password_less_login_by_phone_number(
      phone_number,
      code,
    );
  }
}

export default Auth_resolver;

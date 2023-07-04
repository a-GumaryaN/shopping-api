import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Login_schema } from './model/auth.model';
import {
  Get_login_code_by_email,
  Get_login_code_by_phone_number,
  Login_by_email,
  Login_by_phone_number,
  Password_less_login_by_phone_number,
  Reset_password_by_email,
  Reset_password_by_phone_number,
} from './dto/auth.args';
import Auth_use_case from 'src/use-cases/auth/auth.usecase';
import { Result } from '../common/model/result';
import { Inject } from '@nestjs/common';
import Usecase_proxy_module from 'src/adapters/usecase-proxy/usercase-proxy.module';

@Resolver((of) => Login_schema)
class Auth_resolver {
  constructor(
    @Inject(Usecase_proxy_module.Auth_use_case_proxy)
    private auth_use_case: Auth_use_case
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
    // this.auth_use_case.login_with_email(email, password);
    return { token: 'token', user: null, error: null };
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
    return { token: 'token', user: null, error: null };
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
  ): Promise<Result> {
    return { result: null, error: null };
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
  async reset_password_args_by_email(
    @Args() { email, new_password, code }: Reset_password_by_email,
  ): Promise<Result> {
    return { result: null, error: null };
  }

  /**
   * route for ask code for password less system
   * @param email
   * @param password
   * @returns token
   * @returns user
   * @returns error
   */
  @Mutation(() => Result)
  async reset_password_by_phone_number(
    @Args()
    { phone_number, new_password, code }: Reset_password_by_phone_number,
  ): Promise<Result> {
    return { result: null, error: null };
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
    return { result: null, error: null };
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
    @Args() { email }: Get_login_code_by_email,
  ): Promise<Result> {
    return { result: null, error: null };
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
  ): Promise<Result> {
    return { result: null, error: null };
  }
}

export default Auth_resolver;

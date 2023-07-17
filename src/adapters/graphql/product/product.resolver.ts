import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Product_schema } from "./model/product.model";
import { Inject } from "@nestjs/common";
import Get_product from "src/usecase/Product/get_product-usecase";
import Usecase_proxy_module from "src/adapters/usecase-proxy/product/usercase-proxy.module";
import {
  Add_product_args,
  Get_product_by_category_args,
} from "./dto/product.args";
import { Product } from "src/domain/model";
import Get_product_by_category from "src/usecase/Product/get_products_by_categories";
import { Result } from "../common/model/result";

@Resolver((of) => Product_schema)
class Product_resolver {
  constructor(
    @Inject(Usecase_proxy_module.Get_product)
    private Get_product: Get_product,
    @Inject(Usecase_proxy_module.Get_product_by_category)
    private Get_product_by_category: Get_product_by_category
  ) {}

  /**
   * login resolver with email
   * @param email
   * @param password
   * @returns token
   * @returns user
   * @returns error
   */
  @Query(() => [Product_schema])
  async get_products_by_category(
    @Args() { category }: Get_product_by_category_args
  ): Promise<[Partial<Product>]> {
    // return await this.auth_service.login_by_email(email, password);
    return await this.Get_product_by_category.action(category);
  }
}

export default Product_resolver;

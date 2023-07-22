import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Product_schema } from "./model/product.model";
import { Inject } from "@nestjs/common";
import Usecase_proxy_module from "src/adapters/usecase-proxy/product/usercase-proxy.module";
import {
  Add_product_args,
  Delete_product_args,
  Get_product_by_category_args,
  Get_product_by_uuid_args,
  Update_product_args,
} from "./dto/product.args";
import { Product } from "src/domain/model";
import {
  Add_product_usecase,
  Delete_product_usecase,
  Get_product_usecase,
  Get_product_by_category_usecase,
  Update_product_usecase,
} from "src/usecase/Product";
import { Result } from "../common/model/result";

@Resolver(() => Product_schema)
class Product_resolver {
  constructor(
    @Inject(Usecase_proxy_module.Get_product)
    private Get_product: Get_product_usecase,
    @Inject(Usecase_proxy_module.Get_product_by_category)
    private Get_product_by_category: Get_product_by_category_usecase,
    @Inject(Usecase_proxy_module.Add_product)
    private Add_product: Add_product_usecase,
    @Inject(Usecase_proxy_module.Delete_product)
    private Delete_product: Delete_product_usecase,
    @Inject(Usecase_proxy_module.Delete_product)
    private Update_product: Update_product_usecase
  ) {}

  /**
   * get product uuid and return product
   * @param product_uuid
   * @returns product
   */
  @Query(() => [Product_schema])
  async get_products_by_uuid(
    @Args() { product_uuid }: Get_product_by_uuid_args
  ): Promise<Partial<Product>> {
    return await this.Get_product.action(product_uuid);
  }

  /**
   * get products category and return products
   * @param category
   * @returns product
   */
  @Query(() => [Product_schema])
  async get_products_by_category(
    @Args() { category }: Get_product_by_category_args
  ): Promise<[Partial<Product>]> {
    return await this.Get_product_by_category.action(category);
  }

  /**
   * add new product
   * @param price
   * @param product_name
   * @returns result
   */
  @Mutation(() => [Product_schema])
  async add_product(
    @Args() { price, product_name }: Add_product_args
  ): Promise<Result> {
    return await this.Add_product.action({ price, product_name });
  }

  /**
   * delete product
   * @param uuid
   * @returns result
   */
  @Mutation(() => [Product_schema])
  async delete_product(@Args() { uuid }: Delete_product_args): Promise<Result> {
    return await this.Delete_product.action({ uuid });
  }

  /**
   * update product
   * @param uuid
   * @returns result
   */
  @Mutation(() => [Product_schema])
  async update_product(
    @Args() { uuid, updated_product }: Update_product_args
  ): Promise<Result> {
    return await this.Update_product.action({ uuid, updated_product });
  }
}

export default Product_resolver;

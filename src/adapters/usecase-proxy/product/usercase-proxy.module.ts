import { DynamicModule, Module } from "@nestjs/common";
import Product_repository from "src/adapters/repository/product.repository";
import Get_product from "src/usecase/Product/get_product-usecase";
import Get_product_by_category from "src/usecase/Product/get_products_by_categories";

@Module({
  imports: [],
})
class Usecase_proxy_module {
  static Get_product = "Get_product";
  static Get_product_by_category = "Get_product_by_category";
  static register(): DynamicModule {
    return {
      module: Usecase_proxy_module,
      providers: [
        {
          inject: [],
          provide: Usecase_proxy_module.Get_product,
          useFactory: () => {
            const product_repository = new Product_repository();

            return new Get_product(product_repository);
          },
        },
        {
          inject: [],
          provide: Usecase_proxy_module.Get_product_by_category,
          useFactory: () => {
            const product_repository = new Product_repository();

            return new Get_product_by_category(product_repository);
          },
        },
      ],
      exports: [
        Usecase_proxy_module.Get_product,
        Usecase_proxy_module.Get_product_by_category,
      ],
    };
  }
}

export default Usecase_proxy_module;

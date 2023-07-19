import { DynamicModule, Module } from "@nestjs/common";
import Product_repository from "src/adapters/repository/product.repository";
import Uuid_generator_service from "src/adapters/services/uuid/uuid_sender.service";
import {
  Add_product_validator,
  Delete_product_validator,
  Update_product_validator,
} from "src/adapters/validators/Product";
import {
  Add_product_usecase,
  Delete_product_usecase,
  Get_product_usecase,
  Get_product_by_category_usecase,
  Update_product_usecase,
} from "src/usecase/Product";
@Module({
  imports: [],
})
class Usecase_proxy_module {
  static Get_product = "Get_product";
  static Get_product_by_category = "Get_product_by_category";
  static Add_product = "Add_product";
  static Delete_product = "Delete_product";
  static Update_product = "Update_product";
  static register(): DynamicModule {
    return {
      module: Usecase_proxy_module,
      providers: [
        {
          inject: [],
          provide: Usecase_proxy_module.Get_product,
          useFactory: () => {
            const product_repository = new Product_repository();

            return new Get_product_usecase(product_repository);
          },
        },
        {
          inject: [],
          provide: Usecase_proxy_module.Get_product_by_category,
          useFactory: () => {
            const product_repository = new Product_repository();

            return new Get_product_by_category_usecase(product_repository);
          },
        },
        {
          inject: [],
          provide: Usecase_proxy_module.Add_product,
          useFactory: () => {
            const product_repository = new Product_repository(),
              uuid_service = new Uuid_generator_service(),
              validator = new Add_product_validator();

            return new Add_product_usecase(
              product_repository,
              uuid_service,
              validator
            );
          },
        },
        {
          inject: [],
          provide: Usecase_proxy_module.Delete_product,
          useFactory: () => {
            const product_repository = new Product_repository(),
              validator = new Delete_product_validator();

            return new Delete_product_usecase(product_repository, validator);
          },
        },
        {
          inject: [],
          provide: Usecase_proxy_module.Update_product,
          useFactory: () => {
            const product_repository = new Product_repository(),
              validator = new Update_product_validator();

            return new Update_product_usecase(product_repository, validator);
          },
        },
      ],
      exports: [
        Usecase_proxy_module.Get_product,
        Usecase_proxy_module.Get_product_by_category,
        Usecase_proxy_module.Add_product,
        Usecase_proxy_module.Delete_product,
        Usecase_proxy_module.Update_product,
      ],
    };
  }
}

export default Usecase_proxy_module;

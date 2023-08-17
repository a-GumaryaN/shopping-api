import { DynamicModule, Module } from "@nestjs/common";
import Product_repository from "src/adapters/repository/product.repository";
import Repositories_module from "src/adapters/repository/repositories.module";
import Uuid_service_module from "src/adapters/services/uuid/uuid_sender.module";
import Uuid_generator_service from "src/adapters/services/uuid/uuid_sender.service";
import {
  Add_product_validator,
  Delete_product_validator,
  Update_product_validator,
} from "src/adapters/validators/Product";
import Auth_validator_module from "src/adapters/validators/Product/product.module";
import {
  Add_product_usecase,
  Delete_product_usecase,
  Get_product_by_category_usecase,
  Update_product_usecase,
} from "src/usecase/Product";
import Get_product from "src/usecase/Product/get_product-usecase";
import Get_product_by_uuid from "src/usecase/Product/get_product_by_uuid-usecase";

@Module({
  imports: [Repositories_module, Uuid_service_module, Auth_validator_module],
})
class Usecase_proxy_module {
  static Get_product = "Get_product";
  static Get_product_by_category = "Get_product_by_category";
  static Get_product_by_uuid = "Get_product_by_uuid";
  static Add_product = "Add_product";
  static Delete_product = "Delete_product";
  static Update_product = "Update_product";
  static register(): DynamicModule {
    return {
      module: Usecase_proxy_module,
      providers: [
        {
          inject: [Product_repository],
          provide: Usecase_proxy_module.Get_product,
          useFactory: (repository: Product_repository) =>
            new Get_product(repository),
        },
        {
          inject: [Product_repository, Update_product_validator],
          provide: Usecase_proxy_module.Get_product_by_uuid,
          useFactory: (repository: Product_repository) =>
            new Get_product_by_uuid(repository),
        },
        {
          inject: [Product_repository],
          provide: Usecase_proxy_module.Get_product_by_category,
          useFactory: (repository: Product_repository) =>
            new Get_product_by_category_usecase(repository),
        },
        {
          inject: [
            Product_repository,
            Uuid_generator_service,
            Add_product_validator,
          ],
          provide: Usecase_proxy_module.Add_product,
          useFactory: (
            repository: Product_repository,
            Uuid_generator_service: Uuid_generator_service,
            validator: Add_product_validator
          ) =>
            new Add_product_usecase(
              repository,
              Uuid_generator_service,
              validator
            ),
        },
        {
          inject: [Product_repository, Delete_product_validator],
          provide: Usecase_proxy_module.Delete_product,
          useFactory: (
            repository: Product_repository,
            validator: Delete_product_validator
          ) => new Delete_product_usecase(repository, validator),
        },
        {
          inject: [Product_repository, Update_product_validator],
          provide: Usecase_proxy_module.Update_product,
          useFactory: (
            repository: Product_repository,
            validator: Update_product_validator
          ) => new Update_product_usecase(repository, validator),
        },
      ],
      exports: [
        Usecase_proxy_module.Get_product,
        Usecase_proxy_module.Get_product_by_uuid,
        Usecase_proxy_module.Get_product_by_category,
        Usecase_proxy_module.Add_product,
        Usecase_proxy_module.Delete_product,
        Usecase_proxy_module.Update_product,
      ],
    };
  }
}

export default Usecase_proxy_module;

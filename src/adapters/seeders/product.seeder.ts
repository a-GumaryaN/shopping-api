import { Command, Positional } from "nestjs-command";
import { Injectable } from "@nestjs/common";
import Uuid_generator_service from "../services/uuid/uuid_sender.service";
import { Hash_service } from "../services/bcrype/hash.service";
import Product_repository from "../repository/product.repository";
import { Product } from "src/domain/model";

@Injectable()
export class Product_seeder {
  constructor(
    private readonly product_repository: Product_repository,
    private readonly hash_service: Hash_service,
    private readonly uuid_service: Uuid_generator_service
  ) {}

  @Command({ command: "create:product", describe: "seed customer collection" })
  async create() {
    const hashed_password = await this.hash_service.hash("123456789");
    const products: Product[] = [
      {
        uuid: this.uuid_service.generate(),
        product_name: "Xiaomi Redmi Note 12 4G",
        price: 7699000,
        images: [
          "file/product/348e17f0fe855cb25127298fd5003460b3d29297_1682344501.jpg",
          "file/product/5e82f3890264fcd7ba6f17d7a2f0b89dedd61d54_1682344481.jpg",
          "file/product/759aea927b5d7ceb6da67f59594a207d7e50d327_1682344480.jpg",
          "file/product/afbe5401672322e4177d47decabfd4040bf9db04_1682344483.jpg",
          "file/product/f1ac7f5da7a71d0c1bb7fe33e4162ad25b68d620_1682344498.jpg",
        ],
        comments: [
            {
                author_uuid:"dcdsvfdv",
                comment:"خیلی عالیه",
                rate:4.5,
                reply:[]
            },
            {
                author_uuid:"dcdsvfdv",
                comment:"توصیه میکنم",
                rate:3.7,
                reply:[]
            },
            {
                author_uuid:"dcdsvfdv",
                comment:"واقعا عالیه",
                rate:4.1,
                reply:[]
            }
        ],
        rate: 4.4,
      },
    ];
    const user = await this.product_repository.add_many(products);
    console.log(user);
  }

  @Command({
    command: "destroy:customer",
    describe: "destrot all customer collection",
  })
  async destroy() {
    const result = await this.product_repository.delete_many({});
    console.log(result);
  }
}

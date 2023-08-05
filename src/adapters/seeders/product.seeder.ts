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
    const products: Product[] = [
      {
        uuid: "0f8f149b-09c3-4769-829e-36daff00d920",
        product_name: "Xiaomi Redmi Note 12 4G",
        price: 7699000,
        images: [
          `file/product/0f8f149b-09c3-4769-829e-36daff00d920/348e17f0fe855cb25127298fd5003460b3d29297_1682344501.jpg`,
          `file/product/0f8f149b-09c3-4769-829e-36daff00d920/5e82f3890264fcd7ba6f17d7a2f0b89dedd61d54_1682344481.jpg`,
          `file/product/0f8f149b-09c3-4769-829e-36daff00d920/759aea927b5d7ceb6da67f59594a207d7e50d327_1682344480.jpg`,
          `file/product/0f8f149b-09c3-4769-829e-36daff00d920/afbe5401672322e4177d47decabfd4040bf9db04_1682344483.jpg`,
          `file/product/0f8f149b-09c3-4769-829e-36daff00d920/f1ac7f5da7a71d0c1bb7fe33e4162ad25b68d620_1682344498.jpg`,
        ],
        comments: [
          {
            author_uuid: "29e27f51-c6f1-42b8-a463-a3975f6131f6",
            comment: "so good",
            rate: 4.5,
            reply: [],
          },
          {
            author_uuid: "16a3ed71-ef9b-4ccf-9c72-f33748bb07bb",
            comment: "i recommend it",
            rate: 3.7,
            reply: [],
          },
          {
            author_uuid: "c356740e-d99c-47e4-9782-52b4b476b171",
            comment: "thats great",
            rate: 4.1,
            reply: [],
          },
        ],
        rate: 4.4,
        discount: null,
        category: ["electronics", "smart phone"],
        description: {
          brand: "Xiaomi",
          colors: [
            {
              color_name: "black",
              color_code: "#211f1e",
            },
            {
              color_name: "red",
              color_code: "#ff5500",
            },
            {
              color_name: "sky blue",
              color_code: "#00d5ff",
            },
          ],
          display_technology: "OLED",
          display_size: 6.45,
          OS: "android",
        },
      },
      {
        uuid: "f03ee161-e03e-46c2-9fb3-a62a6336e56b",
        product_name: "Nothing Phone 1 Dual SIM 128GB And 8GB RAM Mobile Phone",
        price: 16199000,
        images: [
          `file/product/f03ee161-e03e-46c2-9fb3-a62a6336e56b/1.jpg`,
          `file/product/f03ee161-e03e-46c2-9fb3-a62a6336e56b/2.jpg`,
          `file/product/f03ee161-e03e-46c2-9fb3-a62a6336e56b/3.jpg`,
          `file/product/f03ee161-e03e-46c2-9fb3-a62a6336e56b/4.jpg`,
          `file/product/f03ee161-e03e-46c2-9fb3-a62a6336e56b/5.jpg`,
        ],
        comments: [
          {
            author_uuid: "29e27f51-c6f1-42b8-a463-a3975f6131f6",
            comment: "so good",
            rate: 4.5,
            reply: [],
          },
          {
            author_uuid: "16a3ed71-ef9b-4ccf-9c72-f33748bb07bb",
            comment: "i recommend it",
            rate: 3.7,
            reply: [],
          },
          {
            author_uuid: "c356740e-d99c-47e4-9782-52b4b476b171",
            comment: "thats great",
            rate: 4.1,
            reply: [],
          },
        ],
        rate: 4.4,
        discount: null,
        category: ["electronics", "smart phone"],
        description: {
          brand: "Xiaomi",
          colors: [
            {
              color_name: "black",
              color_code: "#211f1e",
            },
            {
              color_name: "red",
              color_code: "#ff5500",
            },
            {
              color_name: "sky blue",
              color_code: "#00d5ff",
            },
          ],
          display_technology: "OLED",
          display_size: 6.45,
          OS: "android",
        },
      },
      {
        uuid: "a8cb9267-6b82-4e53-b3b0-fc70174a26b7",
        product_name: "Samsung Galaxy S23 Ultra Dual SIM 256GB And 12GB RAM Mobile Phone",
        price: 16199000,
        images: [
          `file/product/a8cb9267-6b82-4e53-b3b0-fc70174a26b7/1.jpg`,
          `file/product/a8cb9267-6b82-4e53-b3b0-fc70174a26b7/2.jpg`,
          `file/product/a8cb9267-6b82-4e53-b3b0-fc70174a26b7/3.jpg`,
          `file/product/a8cb9267-6b82-4e53-b3b0-fc70174a26b7/4.jpg`,
          `file/product/a8cb9267-6b82-4e53-b3b0-fc70174a26b7/5.jpg`,
        ],
        comments: [
          {
            author_uuid: "29e27f51-c6f1-42b8-a463-a3975f6131f6",
            comment: "so good",
            rate: 4.5,
            reply: [],
          },
          {
            author_uuid: "16a3ed71-ef9b-4ccf-9c72-f33748bb07bb",
            comment: "i recommend it",
            rate: 3.7,
            reply: [],
          },
          {
            author_uuid: "c356740e-d99c-47e4-9782-52b4b476b171",
            comment: "thats great",
            rate: 4.1,
            reply: [],
          },
        ],
        rate: 4.4,
        discount: null,
        category: ["electronics", "smart phone"],
        description: {
          brand: "Xiaomi",
          colors: [
            {
              color_name: "black",
              color_code: "#211f1e",
            },
            {
              color_name: "red",
              color_code: "#ff5500",
            },
            {
              color_name: "sky blue",
              color_code: "#00d5ff",
            },
          ],
          display_technology: "OLED",
          display_size: 6.45,
          OS: "android",
        },
      },
    ];
    await this.product_repository.add_many(products);
    console.log("seed products created successfully");
  }

  @Command({
    command: "destroy:product",
    describe: "destroy all product collection",
  })
  async destroy() {
    await this.product_repository.delete_many({});
    console.log("seed products deleted successfully");
  }
}

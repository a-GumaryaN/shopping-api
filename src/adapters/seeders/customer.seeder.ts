import { Command, Positional } from "nestjs-command";
import { Injectable } from "@nestjs/common";
import Customer_repository from "../repository/customer.repository";
import { Hash_service } from "../services/bcrype/hash.service";
import { Customer } from "src/domain/model";

@Injectable()
export class Customer_seeder {
  constructor(
    private readonly customer_repository: Customer_repository,
    private readonly hash_service: Hash_service,
  ) {}

  @Command({ command: "create:customer", describe: "seed customer collection" })
  async create() {
    const hashed_password = await this.hash_service.hash("123456789");
    const customers :Customer[] = [
      {
        first_name: "alireza",
        last_name: "rezaee",
        phone_number: "09123456789",
        email: "rezaee1234@test.com",
        address: "tehran,pasdaran",
        password: hashed_password,
        uuid: "29e27f51-c6f1-42b8-a463-a3975f6131f6",
        orders: [],
        profile_image: "file/customer/download.jpeg",
      },
      {
        first_name: "arash",
        last_name: "aslani",
        phone_number: "09923456781",
        email: "aslani1234@test.com",
        address: "tehran,jurdan",
        password: hashed_password,
        uuid: "c356740e-d99c-47e4-9782-52b4b476b171",
        orders: [],
        profile_image: "file/customer/download(1).jpeg",
      },
      {
        first_name: "amir",
        last_name: "soltani",
        phone_number: "09891234567",
        email: "soltani1234@test.com",
        address: "shiraz",
        password: hashed_password,
        uuid:"16a3ed71-ef9b-4ccf-9c72-f33748bb07bb",
        orders: [],
        profile_image: "file/customer/download(2).jpeg",
      },
      {
        first_name: "amir",
        last_name: "mozhgani",
        phone_number: "09789123456",
        email: "mozhgani1234@test.com",
        address: "shiraz",
        password: hashed_password,
        uuid: "0df24e8b-bc66-4cbc-88b2-c3ce001daccd",
        orders: [],
        profile_image: "file/customer/person1.jpg",
      },
    ];
    const user = await this.customer_repository.add_many(customers);
    console.log(user);
  }

  @Command({
    command: "destroy:customer",
    describe: "destrot all customer collection",
  })
  async destroy() {
    const result = await this.customer_repository.delete_many({});
    console.log(result);
  }
}

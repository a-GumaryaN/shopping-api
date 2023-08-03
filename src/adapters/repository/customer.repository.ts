import { Model } from "mongoose";
import repository from "./base_repository";

type entity_parameters = keyof Customer;
type selectable_model_value = Partial<Record<entity_parameters, boolean>>;
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "src/domain/model";
import { customer } from "../entities/customer.entity";
import customer_repository from "src/domain/repository/customer_repository";

class Customer_repository
  extends repository<customer, selectable_model_value>
  implements customer_repository
{
  constructor(
    @InjectModel(customer.name)
    private readonly code_model: Model<customer>
  ) {
    super(code_model);
  }
  async find_by_uuid(
    uuid: string,
    projection?: any
  ): Promise<Partial<Customer>> {
    return {};
  }
}

export default Customer_repository;

// import { Customer } from 'src/domain/model';
// import customer_repository from 'src/domain/repository/customer_repository';
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { customer } from '../entities/customer.entity';

// type customer_parameters = keyof Customer;
// type selectable_model_value = Partial<Record<customer_parameters, boolean>>;

// @Injectable()
// class Customer_repository implements customer_repository {
//   constructor(
//     @InjectModel(customer.name)
//     private readonly Customer_model: Model<customer>
//   ) {}

//   async add_new(new_object: Customer) {
//     await this.Customer_model.create(new_object);
//     return true;
//   }

//   async add_many(new_objects: Customer[]) {
//     await this.Customer_model.create(new_objects);
//     return true;
//   }

//   async find_many({
//     identifire,
//     projection,
//     pagination,
//   }: {
//     identifire: Partial<Customer>;
//     projection: selectable_model_value;
//     pagination: { skip: number; take: number };
//   }): Promise<Partial<Customer>[]> {
//     return await this.Customer_model.find(identifire, projection);
//   }

//   async find_one(
//     identifire: Partial<Customer>,
//     projection: selectable_model_value
//   ): Promise<Partial<Customer>> {
//     return await this.Customer_model.findOne(identifire, projection);
//   }

//   async delete_one(identifire: Partial<Customer>) {
//     await this.Customer_model.deleteOne(identifire);
//     return true;
//   }

//   async delete_many(identifire: Partial<Customer>) {
//     await this.Customer_model.deleteMany(identifire);
//     return true;
//   }

//   async update_one(identifire: Partial<Customer>, new_object: Partial<Customer>) {
//     await this.Customer_model.updateOne(identifire, new_object);
//     return true;
//   }

//   async find_by_uuid(
//     uuid: string,
//     projection?: any
//   ): Promise<Partial<Customer>>{
//     return {}
//   }
// }

// export default Customer_repository;

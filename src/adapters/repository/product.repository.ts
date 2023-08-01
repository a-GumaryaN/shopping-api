import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "src/domain/model";
import { product } from "../entities/product.entity";
import { Model } from "mongoose";
import product_repository from "src/domain/repository/product.repository";

type Product_parameters = keyof Product;
type selectable_model_value = Partial<Record<Product_parameters, boolean>>;

@Injectable()
class Product_repository implements product_repository {
  constructor(
    @InjectModel(product.name)
    private readonly Product_model: Model<product>
  ) {}

  async add_new(new_object: Product) {
    await this.Product_model.create(new_object);
    return true;
  }

  async find_many({
    identifire,
    projection,
    pagination,
  }: {
    identifire: Partial<Product>;
    projection: selectable_model_value;
    pagination: { skip: number; take: number };
  }): Promise<Partial<Product>[]> {
    return await this.Product_model.find(identifire, projection);
  }

  async find_one(
    identifire: Partial<Product>,
    projection: selectable_model_value
  ): Promise<Partial<Product>> {
    return await this.Product_model.findOne(identifire, projection);
  }

  async delete_one(identifire: Partial<Product>) {
    await this.Product_model.deleteOne(identifire);
    return true;
  }

  async update_one(identifire: Partial<Product>, new_object: Partial<Product>) {
    await this.Product_model.updateOne(identifire, new_object);
    return true;
  }

  async find_by_uuid(
    uuid: string,
    projection?: any
  ): Promise<Partial<Product>> {
    return {};
  }

  async find_by_category(
    category: string,
    projection?: any
  ): Promise<[Partial<Product>]> {
    return [{}];
  }
}

export default Product_repository;

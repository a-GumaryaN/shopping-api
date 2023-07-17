import { PrismaClient } from "@prisma/client";
import { Product } from "src/domain/model";
import product_repository from "src/domain/repository/product.repository";

const prisma_client = new PrismaClient();
const Product_model = prisma_client["Product"];

type Product_parameters = keyof Product;
type selectable_model_value = Partial<Record<Product_parameters, boolean>>;

const pagination_null_object: Record<Product_parameters, boolean> = {
  uuid: false,
  product_name: false,
  price: false,
  images: false,
  comments: false,
  rate: false,
};

class Product_repository implements product_repository {
  async add_new(new_object: Product) {
    await Product_model.create({ data: new_object });
    await prisma_client.$disconnect();
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
    const object = await Product_model.findMany({
      where: identifire,
      select: { ...pagination_null_object, ...projection },
      ...pagination,
    });
    await prisma_client.$disconnect();
    return object;
  }

  async find_one(
    identifire: Partial<Product>,
    projection: selectable_model_value
  ): Promise<Partial<Product>> {
    const object = await Product_model.findFirst({
      where: identifire,
      select: { ...pagination_null_object, ...projection },
    });
    await prisma_client.$disconnect();
    return object;
  }

  async delete_one(new_object: Product) {
    await Product_model.create({ data: new_object });
    await prisma_client.$disconnect();
    return true;
  }

  async update_one(identifire: Partial<Product>, new_object: Partial<Product>) {
    await Product_model.update({ where: {}, data: new_object });
    await prisma_client.$disconnect();
    return true;
  }

  async find_by_uuid(
    uuid: string,
    projection?: selectable_model_value
  ): Promise<Partial<Product>> {
    return await Product_model.findFirst({
      where: { uuid },
      include: { _id: false, ...projection },
    });
  }

  async find_by_category(
    category: string,
    projection?: selectable_model_value
  ): Promise<[Partial<Product>]> {
    return await Product_model.findMany({
      where: { category },
      include: { _id: false, ...projection },
    });
  }
}

export default Product_repository;

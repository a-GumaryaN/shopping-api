import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import Code from "src/domain/model/Code";
import code_repository from "src/domain/repository/code_repository";

const prisma_client = new PrismaClient();
const Code_model = prisma_client["Code"];

type Code_parameters = keyof Code;
type selectable_model_value = Partial<Record<Code_parameters, boolean>>;

const pagination_null_object: Record<Code_parameters, boolean> = {
  email: false,
  phone_number: false,
  code: false,
  target: false,
};

@Injectable()
class Code_repository implements code_repository {
  async add_new(new_object: Code) {
    await Code_model.create({ data: new_object });
    await prisma_client.$disconnect();
    return true;
  }

  async find_many({
    identifire,
    projection,
    pagination,
  }: {
    identifire: Partial<Code>;
    projection: selectable_model_value;
    pagination: { skip: number; take: number };
  }): Promise<Partial<Code>[]> {
    const object = await Code_model.findMany({
      where: identifire,
      select: { ...pagination_null_object, ...projection },
      ...pagination,
    });
    await prisma_client.$disconnect();
    return object;
  }

  async find_one(
    identifire: Partial<Code>,
    projection: selectable_model_value
  ): Promise<Partial<Code>> {
    const object = await Code_model.findFirst({
      where: identifire,
      select: { ...pagination_null_object, ...projection },
    });
    await prisma_client.$disconnect();
    return object;
  }

  async delete_one(new_object: Code) {
    await Code_model.create({ data: new_object });
    await prisma_client.$disconnect();
    return true;
  }

  async update_one(identifire: Partial<Code>, new_object: Partial<Code>) {
    await Code_model.update({ where: {}, data: new_object });
    await prisma_client.$disconnect();
    return true;
  }
}

export default Code_repository;

import { Prisma, PrismaClient } from '@prisma/client';
import base_repository from 'src/domain/repository/base_repository';

class repository<Model> implements base_repository<Model> {
  public Model;
  private readonly prisma_model_name: string;
  private Prisma_client;

  constructor(Prisma_client: string) {
    this.Prisma_client = Prisma_client;
    this.Prisma_client = new PrismaClient();
    this.Model = Prisma_client[this.prisma_model_name];
  }


  async add_new(new_object: Partial<Model>) {
    const object = await this.Model.customer.create(new_object);
    await this.Prisma_client.$disconnect();
    return object;
  }

  async find_many({
    identifire,
    projection,
    pagination,
  }: {
    identifire: any;
    projection: any;
    pagination?: { skip: number; take: number };
  }) {
    const object = await this.Model.findMany({
      where: identifire,
      options: { projection },
      ...pagination,
    });
    await this.Prisma_client.$disconnect();
    return object;
  }

  async find_one(identifire: Partial<Model>, projection: any) {
    const object = await this.Model.findFirst(
      { where: identifire },
      projection,
    );
    await this.Prisma_client.$disconnect();
    return object;
  }

  async delete_one(new_object: Model) {
    await this.Model.create(new_object);
    await this.Prisma_client.$disconnect();
    return true;
  }

  async update_one(identifire: Partial<Model>, new_object: Partial<Model>) {
    await this.Model.update({
      where: identifire,
      new_object,
    });
    await this.Prisma_client.$disconnect();
    return true;
  }
}

export default repository;

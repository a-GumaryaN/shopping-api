import { __Schema } from 'graphql';
import { Base_repository } from '.';
import { Customer } from 'src/domain/model';
import customer_repository from 'src/domain/repository/customer_repository';
import { PrismaClient} from '@prisma/client';


const prisma_client = new PrismaClient();
const customer_model = prisma_client['customer'];

type customer_parameters = keyof Customer;
type selectable_model_value = Partial<Record<customer_parameters, boolean>>;

const pagination_null_object: Record<customer_parameters, boolean> = {
  first_name: false,
  last_name: false,
  address: false,
  password: false,
  phone_number: false,
  email: false,
  orders: false,
  profile_image: false,
  uuid: false,
};

class Customer_repository implements customer_repository {
  async add_new(new_object: Customer) {
    await customer_model.create({ data: new_object});
    await prisma_client.$disconnect();
    return true;
  }

  async find_many({
    identifire,
    projection,
    pagination,
  }: {
    identifire: Partial<Customer>;
    projection: selectable_model_value;
    pagination: { skip: number; take: number };
  }): Promise<Partial<Customer>[]> {
    const object = await customer_model.findMany({
      where: identifire,
      select: { ...pagination_null_object, ...projection },
      ...pagination,
    });
    await prisma_client.$disconnect();
    return object;
  }

  async find_one(
    identifire: Partial<Customer>,
    projection: selectable_model_value,
  ): Promise<Partial<Customer>> {
    const object = await customer_model.findFirst({
      where: identifire,
      select: { ...pagination_null_object, ...projection },
    });
    await prisma_client.$disconnect();
    return object;
  }

  async delete_one(new_object: Customer) {
    await customer_model.create({ data: new_object });
    await prisma_client.$disconnect();
    return true;
  }

  async update_one(
    identifire: Partial<Customer>,
    new_object: Partial<Customer>,
  ) {
    await customer_model.update({ where: identifire, data: new_object });
    await prisma_client.$disconnect();
    return true;
  }

  async find_by_uuid(
    uuid: string,
    projection?: any,
  ): Promise<Partial<Customer>> {
    const object = await customer_model.findFirst({
      where: { uuid },
      include: { _id: false, ...projection },
    });
    return object;
  }
}

const _ = new Base_repository('customer');

export default Customer_repository;

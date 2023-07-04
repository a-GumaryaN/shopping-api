import { Base_repository } from '.';
import { Customer } from 'src/domain/model';

class Customer_repository extends Base_repository<Customer> {
  constructor() {
    super('customer');
  }

  async find_by_uuid(
    uuid: string,
    projection?: any,
    pagination?: any,
  ): Promise<Customer> {
    const object = await this.Model.finOne({
      where: { uuid },
      options: { projection },
      ...pagination,
    });
    return object;
  }
}

export default Customer_repository;

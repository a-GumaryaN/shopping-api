import { Base_repository } from '.';
import { Customer } from 'src/domain/model';
import code_repository from 'src/domain/repository/code_repository';
import customer_repository from 'src/domain/repository/customer_repository';

class Code_repository
  extends Base_repository<Customer>
  implements code_repository
{
  constructor() {
    super('code');
  }
}

export default Code_repository;
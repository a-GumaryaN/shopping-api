import base_repository from "./base_repository"
import Customer from "../model/Customer"
interface customer_repository extends base_repository<Customer> {
  find_by_uuid(
    uuid: string,
    projection?: any,
    pagination?: any,
  ): Promise<Customer>;
}

export default customer_repository;

import { Base_repository } from '.';
import { Order } from 'src/domain/model';

const order_repository = new Base_repository<Order>('order');

export default order_repository;

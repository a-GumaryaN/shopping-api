import { Order } from './Order';
import { Pure_user } from './Pure_user.model';

interface Customer extends Pure_user {
  orders: Order[];
}

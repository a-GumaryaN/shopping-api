import { Product } from 'src/domain/model';

type set_discount_for_product = (
  product_uuid: string,
  discount_rate: number,
) => Promise<{}>;

export default set_discount_for_product;

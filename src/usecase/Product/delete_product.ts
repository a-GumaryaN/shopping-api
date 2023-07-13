import { Product } from 'src/domain/model';

type delete_product = (new_product: Product) => Promise<{}>;

export default delete_product;

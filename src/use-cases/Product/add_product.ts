import { Product } from 'src/domain/model';

type add_product = (new_product: Product) => Promise<Product>;

export default add_product;

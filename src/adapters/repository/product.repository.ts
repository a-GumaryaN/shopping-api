import { Base_repository } from '.';
import { Product } from 'src/domain/model';

const product_repository = new Base_repository<Product>('product');

export default product_repository;

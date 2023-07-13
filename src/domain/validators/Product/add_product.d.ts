import { Product } from 'src/domain/model';
import validator_proxy from '../validator.proxy';

interface auth_validator {
  add_product_validator: validator_proxy<Product>;
}

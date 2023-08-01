import { Product } from "src/domain/model";
import validator_proxy from "../validator.proxy";

interface product_images_upload_validator {
  validate: validator_proxy<{
    product_uuid: string;
  }>;
}

export default product_images_upload_validator;

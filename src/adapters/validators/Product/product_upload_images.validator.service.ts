import product_images_upload_validator from "src/domain/validators/Product/upload_images";

const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  product_uuid: { type: "string", max: 80 },
};

class Product_upload_images implements product_images_upload_validator {
  private checker;
  constructor() {
    this.checker = v.compile(schema);
  }

  validate({ product_uuid }:{product_uuid:string}) {
    const error = this.checker({ product_uuid });

    const result =
      error !== true
        ? {
            error: error[0].message,
            value: null,
          }
        : {
            error: null,
            value: { product_uuid },
          };
    return result;
  }
}

export default Product_upload_images;

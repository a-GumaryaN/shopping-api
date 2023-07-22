import update_product_validator from "src/domain/validators/Product/update_product";

const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  uuid: { type: "string", max: 80 },
  product_name: { type: "string", max: 80 },
  price: { type: "number" },
};

class Update_product_validator implements update_product_validator {
  private checker;
  constructor() {
    this.checker = v.compile(schema);
  }

  validate({ uuid, updated_product }) {
    const error = this.checker({ uuid, updated_product });

    const result =
      error !== true
        ? {
            error: error[0].message,
            value: null,
          }
        : {
            error: null,
            value: { uuid, updated_product },
          };
    return result;
  }
}

export default Update_product_validator;

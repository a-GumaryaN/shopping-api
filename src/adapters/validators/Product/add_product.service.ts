import add_product_validator from "src/domain/validators/Product/add_product";

const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  product_name: { type: "string", max: 40 },
  price: { type: "number" },
};

class Add_product_validator implements add_product_validator {
  private checker;
  constructor() {
    this.checker = v.compile(schema);
  }

  validate({ product_name, price }) {
    const error = this.checker({ product_name, price });

    const result =
      error !== true
        ? {
            error: error[0].message,
            value: null,
          }
        : {
            error: null,
            value: { product_name, price },
          };
    return result;
  }
}

export default Add_product_validator;

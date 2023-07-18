import delete_product_validator from "src/domain/validators/Product/delete_product";

const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  uuid: { type: "string", max: 80 },
};

class Delete_product_validator implements delete_product_validator {
  private checker;
  constructor() {
    this.checker = v.compile(schema);
  }

  validate({ uuid }) {
    const error = this.checker({ uuid });

    const result =
      error !== true
        ? {
            error: error[0].message,
            value: null,
          }
        : {
            error: null,
            value: { uuid },
          };
    return result;
  }
}

export default Delete_product_validator;

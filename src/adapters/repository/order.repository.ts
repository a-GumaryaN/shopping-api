import { Model } from "mongoose";
import repository from "./base_repository";

type entity_parameters = keyof Order;
type selectable_model_value = Partial<Record<entity_parameters, boolean>>;
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "src/domain/model";
import { order } from "../entities/order.entity";

class Order_repository
  extends repository<order, selectable_model_value>
  implements Order_repository
{
  constructor(
    @InjectModel(order.name)
    private readonly code_model: Model<order>
  ) {
    super(code_model);
  }
}

export default Order_repository;
import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Customer, Order, Order_product } from "src/domain/model";

@Schema()
export class order_product  implements Order_product {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'customer' })
  product_id: string;

  @Prop(String)
  number: number;
}

@Schema()
export class order implements Order {
  @Prop(raw([order_product]))
  order_products: Order_product[];

  @Prop(String)
  description: string;

  @Prop(String)
  total_amount: number;

  @Prop(String)
  order_uuid: string;
}

export const Order_schema =
  SchemaFactory.createForClass(order);

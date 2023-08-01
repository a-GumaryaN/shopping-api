import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Customer } from "src/domain/model";
import { order } from "./order.entity";

@Schema()
export class customer implements Customer {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop()
  phone_number: string;

  @Prop()
  password: string;

  @Prop()
  address: string;

  @Prop()
  profile_image: string;

  @Prop()
  uuid: string;

  @Prop(raw([order]))
  orders: order[];
}

export const Customer_schema = SchemaFactory.createForClass(customer);

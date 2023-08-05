import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Comment, Product } from "src/domain/model";
import { comment } from "./comment.entity";
import {
  color,
  discount,
  phone_description,
} from "src/domain/model/Product.model";

@Schema()
export class Color implements color {
  @Prop(String)
  color_name: string;
  @Prop(String)
  color_code: string;
}

@Schema()
export class Discount implements discount {
  @Prop(Number)
  expire_time: number;
  @Prop(Number)
  amount: number;
}

@Schema()
export class Phone_description implements phone_description {
  @Prop(String)
  brand: string;

  @Prop([Color])
  colors: color[];

  @Prop(String)
  display_technology: string;

  @Prop(Number)
  display_size: number;

  @Prop(String)
  OS: string;
}

@Schema()
export class product implements Product {
  @Prop(String)
  uuid: string;

  @Prop(String)
  product_name: string;

  @Prop(Number)
  price: number;

  @Prop([String])
  images: string[];

  @Prop(raw([comment]))
  comments: Comment[];

  @Prop(Number)
  rate: number;

  @Prop({ type: Discount })
  discount: discount;

  @Prop([String])
  category: string[];

  @Prop({ type: Phone_description })
  description: phone_description | null;
}

export const Product_schema = SchemaFactory.createForClass(product);

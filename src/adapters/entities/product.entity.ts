import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Comment, Product } from "src/domain/model";
import { comment } from "./comment.entity";


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
  
}

export const Product_schema = SchemaFactory.createForClass(product);

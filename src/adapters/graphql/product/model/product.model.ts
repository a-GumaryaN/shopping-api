import { Field, ObjectType } from "@nestjs/graphql";
import { Comment, Product } from "src/domain/model";
import { Comment_schema } from "../../comment/model/comment.schema";
import {
  color,
  discount,
  phone_description,
} from "src/domain/model/Product.model";

@ObjectType({ description: "discount" })
class Discount_schema implements discount {
  @Field()
  expire_time: number;
  @Field()
  amount: number;
}

@ObjectType({ description: "color" })
class Color implements color {
  @Field()
  color_name: string;
  @Field()
  color_code: string;
}

@ObjectType({ description: "phone_description" })
class Phone_description implements phone_description {
  @Field()
  brand: string;

  @Field(() => [Color])
  colors: color[];

  @Field()
  display_technology: string;

  @Field()
  display_size: number;

  @Field()
  OS: string;
}

@ObjectType({ description: "product " })
export class Product_schema implements Product {
  @Field()
  uuid: string;
  @Field()
  product_name: string;
  @Field()
  price: number;

  @Field(() => [String])
  images: string[];

  @Field(() => [Comment_schema])
  comments: Comment[];

  @Field()
  rate: number;

  @Field(() => Discount_schema || null)
  discount: discount | null;

  @Field(() => [String])
  category: string[];

  @Field(() => Phone_description || null)
  description: phone_description | any;
}

import { Field, ObjectType } from "@nestjs/graphql";
import { Comment, Product } from "src/domain/model";
import { Comment_schema } from "../../comment/model/comment.schema";

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
}

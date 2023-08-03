import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import Customer from "../../../../domain/model/Customer";
import { Order } from "src/domain/model";
import { Order_schema } from "../../order/model/order.model";

@ObjectType({ description: "customer " })
export class Customer_schema implements Partial<Customer> {
  @Field({ nullable: true })
  first_name: string;
  @Field({ nullable: true })
  last_name: string;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  phone_number: string;
  @Field({ nullable: true })
  address: string;
  @Field({ nullable: true })
  profile_image: string;
  @Field({ nullable: true })
  uuid: string;
  @Field(() => [Order_schema])
  orders: Order[];
}

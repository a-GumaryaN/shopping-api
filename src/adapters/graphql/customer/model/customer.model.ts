import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import Customer from '../../../../domain/model/Customer';
import { Order } from 'src/domain/model';
import { Order_schema } from '../../order/model/order.model';

@ObjectType({ description: 'customer ' })
export class Customer_schema implements Customer {
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field()
  email: string;
  @Field()
  phone_number: string;
  @Field()
  password: string;
  @Field()
  address: string;
  @Field()
  profile_image: string;
  @Field()
  uuid: string;
  @Field(() => [Order_schema])
  orders: Order[];
}

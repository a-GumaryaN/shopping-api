import { Field, ObjectType } from '@nestjs/graphql';
import { Order, Order_product } from 'src/domain/model';

@ObjectType({ description: 'order ' })
export class Order_product_schema implements Order_product {
  @Field()
  product_id: string;
  @Field()
  number: number;
}

@ObjectType({ description: 'recipe ' })
export class Order_schema implements Order {
  @Field(() => [Order_product_schema])
  order_products: Order_product[];
  @Field()
  description: string;
  @Field()
  total_amount: number;
  @Field()
  order_uuid: string;
}

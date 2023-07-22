import { MaxLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Product } from 'src/domain/model';

@InputType()
export class Updated_product implements Pick<Product, 'product_name' | 'price'> {
  @Field()
  @MaxLength(40)
  product_name: string;
  @Field()
  price: number;
}

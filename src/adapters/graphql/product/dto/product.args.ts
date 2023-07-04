import { MinLength, MaxLength } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class Add_product_args {
  @Field({ nullable: false })
  @MaxLength(255)
  product_name: string;

  @Field({ nullable: false })
  @MaxLength(40)
  price: number;
}

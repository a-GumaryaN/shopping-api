import { MinLength, MaxLength } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';
import { Updated_product } from './product.dto';

@ArgsType()
export class Add_product_args {
  @Field({ nullable: false })
  @MaxLength(255)
  product_name: string;

  @Field({ nullable: false })
  @MaxLength(40)
  price: number;
}

@ArgsType()
export class Update_product_args {
  @Field({ nullable: false })
  @MaxLength(80)
  uuid: string;

  @Field({ nullable: false })
  updated_product: Updated_product;
}

@ArgsType()
export class Delete_product_args {
  @Field({ nullable: false })
  @MaxLength(80)
  uuid: string;
}

@ArgsType()
export class Get_product_by_uuid_args {
  @Field({ nullable: false })
  @MaxLength(30)
  product_uuid: string;
}


@ArgsType()
export class Get_product_by_category_args {
  @Field({ nullable: false })
  @MaxLength(30)
  category: string;
}

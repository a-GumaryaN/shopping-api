import { MaxLength } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";
import { Customer, Product } from "src/domain/model";

@InputType()
export class new_customer_by_email
  implements Pick<Customer, "email" | "first_name" | "last_name" | "password">
{
  @Field()
  @MaxLength(255)
  email: string;

  @Field()
  @MaxLength(20)
  first_name: string;

  @Field()
  @MaxLength(20)
  last_name: string;

  @Field()
  @MaxLength(40)
  password: string;
}

@InputType()
export class new_customer_by_phone_number
  implements
    Pick<Customer, "phone_number" | "first_name" | "last_name" | "password">
{
  @Field()
  @MaxLength(20)
  phone_number: string;

  @Field()
  @MaxLength(20)
  first_name: string;

  @Field()
  @MaxLength(20)
  last_name: string;

  @Field()
  @MaxLength(40)
  password: string;
}

@InputType()
export class Updated_customer
  implements
    Pick<
      Customer,
      | "address"
      | "email"
      | "phone_number"
      | "first_name"
      | "last_name"
      | "password"
    >
{
  @Field({nullable:true})
  @MaxLength(300)
  address: string;

  @Field({nullable:true})
  @MaxLength(255)
  email: string;

  @Field({nullable:true})
  @MaxLength(20)
  phone_number: string;

  @Field({nullable:true})
  @MaxLength(20)
  first_name: string;

  @Field({nullable:true})
  @MaxLength(20)
  last_name: string;

  @Field({nullable:true})
  @MaxLength(40)
  password: string;
}

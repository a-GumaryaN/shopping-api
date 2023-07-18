import { Field, InputType, ArgsType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";
import { Order } from "src/domain/model";
import Customer from "src/domain/model/Customer";

@ArgsType()
export class Get_register_code_by_email implements Pick<Customer, "email"> {
  @Field()
  @MaxLength(255)
  email: string;
}

@ArgsType()
export class Get_register_code_by_phone_number
  implements Pick<Customer, "phone_number">
{
  @Field()
  @MaxLength(20)
  phone_number: string;
}
type register_by_email_omit_props =
  | "email"
  | "first_name"
  | "last_name"
  | "password";

@ArgsType()
export class Register_by_email
  implements Pick<Customer, register_by_email_omit_props>
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

type register_by_phone_number_omit_props =
  | "phone_number"
  | "first_name"
  | "last_name"
  | "password";

@ArgsType()
export class Register_by_phone_number
  implements Pick<Customer, register_by_phone_number_omit_props>
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

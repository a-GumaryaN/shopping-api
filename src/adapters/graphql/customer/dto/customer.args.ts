import { Field, InputType, ArgsType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";
import Customer from "src/domain/model/Customer";
import {
  new_customer_by_email,
  new_customer_by_phone_number,
} from "./customer.dto";

@ArgsType()
export class Get_register_code_by_email_args
  implements Pick<Customer, "email">
{
  @Field()
  @MaxLength(255)
  email: string;
}

@ArgsType()
export class Get_register_code_by_phone_number_args
  implements Pick<Customer, "phone_number">
{
  @Field()
  @MaxLength(20)
  phone_number: string;
}
type register_by_email_pick_props =
  | "email"
  | "first_name"
  | "last_name"
  | "password";

type register_by_email_input_data = {
  code: string;
  new_customer: Pick<Customer, register_by_email_pick_props>;
};

@ArgsType()
export class Register_by_email_args implements register_by_email_input_data {
  @Field({ nullable: false })
  new_customer: new_customer_by_email;
  @Field({ nullable: false })
  code: string;
}

type register_by_phone_number_pick_props =
  | "phone_number"
  | "first_name"
  | "last_name"
  | "password";

type register_by_phone_number_input_data = {
  code: string;
  new_customer: Pick<Customer, register_by_phone_number_pick_props>;
};

@ArgsType()
export class Register_by_phone_number_args
  implements register_by_phone_number_input_data
{
  @Field({ nullable: false })
  new_customer: new_customer_by_phone_number;
  @Field({ nullable: false })
  code: string;
}

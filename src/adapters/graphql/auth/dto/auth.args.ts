import { MinLength, MaxLength } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class Login_by_email_args {
  @Field({ nullable: false })
  @MaxLength(255)
  email: string;

  @Field({ nullable: false })
  @MaxLength(40)
  password: string;
}


@ArgsType()
export class Login_by_phone_number_args {
  @Field({ nullable: false })
  @MaxLength(40)
  phone_number: string;

  @Field({ nullable: false })
  @MaxLength(40)
  password: string;
}

@ArgsType()
export class Reset_password_by_email_args {
  @Field()
  @MaxLength(255)
  email: string;

  @Field()
  @MaxLength(6)
  code: string;

  @Field()
  @MaxLength(40)
  new_password: string;
}

@ArgsType()
export class Reset_password_by_phone_number_args {
  @Field()
  @MaxLength(40)
  phone_number: string;

  @Field()
  @MaxLength(6)
  code: string;

  @Field()
  @MaxLength(40)
  new_password: string;
}


@ArgsType()
export class Get_email_args {
  @Field()
  @MaxLength(255)
  email: string;
}

@ArgsType()
export class Get_phone_number_args {
  @Field()
  @MaxLength(40)
  phone_number: string;
}

@ArgsType()
export class Password_less_login_by_email_args {
  @Field()
  @MaxLength(255)
  email: string;

  @Field()
  @MaxLength(40)
  code: string;
}

@ArgsType()
export class Password_less_login_by_phone_number_args {
  @Field()
  @MaxLength(20)
  phone_number: string;

  @Field()
  @MaxLength(40)
  code: string;
}
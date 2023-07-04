import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { login_with_email_dto, login_with_phone_number_dto } from './auth';

@InputType()
export class Login_with_email_dto implements login_with_email_dto {
  @Field()
  @MaxLength(255)
  email: string;

  @Field()
  @MaxLength(50)
  password: string;
}

@InputType()
export class Login_with_phone_number_dto
  implements login_with_phone_number_dto
{
  @Field()
  @MaxLength(255)
  phone_number: string;

  @Field()
  @MaxLength(50)
  password: string;
}

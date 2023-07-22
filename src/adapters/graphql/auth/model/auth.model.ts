import { Field, ObjectType } from '@nestjs/graphql';
import { login_schema } from '../../../../domain/common/auth';
import { Error } from '../../common/model/error';
import { Customer_schema } from '../../customer/model/customer.model';

@ObjectType({ description: 'recipe ' })
export class Login_schema implements login_schema {
  @Field({nullable:true})
  token: string;
  @Field({nullable:true})
  error: Error;
  @Field({nullable:true})
  user: Customer_schema;
}

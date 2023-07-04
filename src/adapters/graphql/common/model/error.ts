import { Field, ObjectType } from '@nestjs/graphql';
import { error } from 'src/domain/common/error';

@ObjectType({ description: 'recipe ' })
export class Error implements error {
  @Field()
  error_code?: number;
  @Field()
  message: string;
  @Field()
  path: string;
}

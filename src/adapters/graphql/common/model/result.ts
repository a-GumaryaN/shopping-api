import { Field, ObjectType } from '@nestjs/graphql';
import { Error } from './error';

@ObjectType({ description: 'recipe ' })
export class Result {
  @Field()
  result?: string;
  @Field()
  error?: Error;
}

import { Field, ObjectType } from '@nestjs/graphql';
import result from "src/domain/common/result"
import { Error } from './error';

@ObjectType({ description: 'result ' })
export class Result {
  @Field({nullable:true})
  result?: string;
  @Field({nullable:true})
  error?: Error;
}

import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Comment, Reply } from 'src/domain/model';

@ObjectType({ description: 'Reply ' })
export class Reply_schema implements Reply {
  @Field()
  author_uuid: string;

  @Field()
  rate: number;

  @Field()
  comment: string;

  @Field(() => [Reply_schema])
  reply: Reply[];
}

@ObjectType({ description: 'Comment ' })
export class Comment_schema implements Comment {
  @Field()
  author_uuid: string;
  @Field()
  rate: number;
  @Field()
  comment: string;
  @Field(() => [Reply_schema])
  reply: Reply[];
}

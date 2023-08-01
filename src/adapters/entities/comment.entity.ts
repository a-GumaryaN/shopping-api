import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Comment, Reply } from "src/domain/model";

@Schema()
export class reply implements Comment {
  @Prop(String)
  author_uuid: string;

  @Prop(Number)
  rate: number;

  @Prop(String)
  comment: string;

  @Prop(raw([reply]))
  reply: Reply[];
}

@Schema()
export class comment implements Comment {
  @Prop(String)
  author_uuid: string;

  @Prop(Number)
  rate: number;

  @Prop(String)
  comment: string;

  @Prop()
  reply: Reply[];
}

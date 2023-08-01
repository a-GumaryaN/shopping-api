import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import Code from "src/domain/model/Code";

@Schema()
export class code implements Code {
  @Prop()
  email: string;

  @Prop()
  phone_number: string;

  @Prop()
  code: string;

  @Prop()
  target: "reset password" | "registration" | "password less login";
}

export const Code_schema = SchemaFactory.createForClass(code);

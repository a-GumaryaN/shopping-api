import { Model } from "mongoose";
import repository from "./base_repository";
import { code } from "../entities/code.entity";
import Code from "src/domain/model/Code";

type entity_parameters = keyof Code;
type selectable_model_value = Partial<Record<entity_parameters, boolean>>;
import { InjectModel } from "@nestjs/mongoose";

class Code_repository extends repository<Code,selectable_model_value>{
  constructor(
    @InjectModel(code.name)
    private readonly code_model: Model<code>,
  ){
    super(code_model);
  }
}


export default Code_repository;


// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { Model } from "mongoose";
// import Code from "src/domain/model/Code";
// import code_repository from "src/domain/repository/code_repository";
// import { code } from "../entities/code.entity";

// type Code_parameters = keyof Code;
// type selectable_model_value = Partial<Record<Code_parameters, boolean>>;

// @Injectable()
// class Code_repository implements code_repository {
//   constructor(
//     @InjectModel(code.name)
//     private readonly code_model: Model<code>
//   ) {}

//   async add_new(new_object: Code) {
//     const _ =new this.code_model(new_object);
//     const __=await _.save()
//     console.log(__)
//     return true;
//   }

//   async find_many({
//     identifire,
//     projection,
//     pagination,
//   }: {
//     identifire: Partial<Code>;
//     projection: selectable_model_value;
//     pagination: { skip: number; take: number };
//   }): Promise<Partial<Code>[]> {
//     return await this.code_model.find(identifire, projection);
//   }

//   async find_one(
//     identifire: Partial<Code>,
//     projection: selectable_model_value
//   ): Promise<Partial<Code>> {
//     return await this.code_model.findOne(identifire, projection);
//   }

//   async delete_one(identifire: Partial<Code>) {
//     await this.code_model.deleteOne(identifire);
//     return true;
//   }

//   async update_one(identifire: Partial<Code>, new_object: Partial<Code>) {
//     await this.code_model.updateOne(identifire, new_object);
//     return true;
//   }
// }



// export default Code_repository;


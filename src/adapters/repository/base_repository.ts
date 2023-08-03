import { Injectable } from "@nestjs/common";

@Injectable()
class repository<entity,selectable_model_value> {
  constructor(
    private readonly entity_model
  ) {}

  async add_new(new_object: entity) {
    await this.entity_model.create(new_object);
    return true;
  }
  
  async add_many(new_objects: entity[]) {
    await this.entity_model.create(new_objects);
    return true;
  }

  async find_many({
    identifier={},
    projection,
    pagination,
  }: {
    identifier: Partial<entity>;
    projection: selectable_model_value;
    pagination: { skip: number; take: number };
  }): Promise<Partial<entity>[]> {
    return await this.entity_model.find(identifier, projection);
  }

  async find_one(
    identifier: Partial<entity>,
    projection: selectable_model_value
  ): Promise<Partial<entity>> {
    return await this.entity_model.findOne(identifier);
  }

  async delete_one(identifire: Partial<entity>) {
    await this.entity_model.deleteOne(identifire);
    return true;
  }
  
  async delete_many(identifire: Partial<entity>) {
    await this.entity_model.deleteMany(identifire);
    return true;
  }

  async update_one(identifire: Partial<entity>, new_object: Partial<entity>) {
    await this.entity_model.updateOne(identifire, new_object);
    return true;
  }
}

export default repository;
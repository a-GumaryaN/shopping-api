interface base_repository<Model> {
  find_one(identifire: Partial<Model>, options: any ): Promise<Model>;
  find_many(identifire: any, options: any): Promise<[Model]>;
  add_new(new_object: Partial<Model>): Promise<Model>;
  delete_one(identifire: any): Promise<boolean>;
  update_one(identifire: any, new_object: Partial<Model>): Promise<boolean>;
}

export default base_repository;

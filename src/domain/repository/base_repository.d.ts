interface base_repository<Model> {
  find_one(
    identifire: Partial<Model>,
    projection: Partial<Record<keyof Model, boolean>>,
  ): Promise<Partial<Model>>;
  find_many(
    identifire: any,
    projection: Partial<Record<keyof Model, boolean>>,
    pagination:{ skip: number; take: number }
  ): Promise<Partial<Model>[]>;
  add_new(new_object: Model): Promise<boolean>;
  delete_one(identifire: any): Promise<boolean>;
  update_one(identifire: any, new_object: Partial<Model>): Promise<boolean>;
}

export default base_repository;

export interface jwt_service {
  check_token(token: string): Promise<any>;
  generate_token(payload: jwt_payload, expiresIn?: string): string;
}

export type roles ='customer' | 'admin';

export interface jwt_payload {
  uuid: string;
  role: roles;
  first_name:string,
  last_name:string,
  email?:string,
  phone_number?:string,
  profile_image?:string,
}

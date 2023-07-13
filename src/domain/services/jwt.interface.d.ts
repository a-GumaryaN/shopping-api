export interface jwt_service {
  check_token(token: string): Promise<any>;
  generate_token(payload: jwt_payload, expiresIn: string): string;
}

export interface jwt_payload {
  uuid: string;
  role: 'customer' | 'admin';
}

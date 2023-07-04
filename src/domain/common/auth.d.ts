import { error } from "../../domain/common/error";

export interface login_schema {
  token: string | null;

  user: Customer | null;

  error: error| null;
}

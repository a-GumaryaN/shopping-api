import error from './error';

export interface login_schema {
  token: string | null;

  user: Customer | null;

  error: error | null;
}

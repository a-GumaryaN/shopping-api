import { Error } from 'src/adapters/graphql/common/model/error';

export interface send_validation_code {
  sender: (getter: string, code: string) => Promise<{ error?: Error }>;
}

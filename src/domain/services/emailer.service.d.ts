export interface emailer {
  send(hashString: string): Promise<string>;
}

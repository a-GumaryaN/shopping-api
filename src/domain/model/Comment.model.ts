export interface Reply {
  author_uuid: string;
  rate: number;
  comment: string;
  reply: Reply[];
}

export interface Comment {
  author_uuid: string;
  rate: number;
  comment: string;
  reply: Reply[];
}
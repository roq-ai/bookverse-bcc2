import { UserInterface } from 'interfaces/user';
import { BookInterface } from 'interfaces/book';
import { GetQueryInterface } from 'interfaces';

export interface DiscussionInterface {
  id?: string;
  topic: string;
  user_id: string;
  book_id: string;
  is_closed?: boolean;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  book?: BookInterface;
  _count?: {};
}

export interface DiscussionGetQueryInterface extends GetQueryInterface {
  id?: string;
  topic?: string;
  user_id?: string;
  book_id?: string;
}

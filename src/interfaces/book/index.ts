import { DiscussionInterface } from 'interfaces/discussion';
import { ReviewInterface } from 'interfaces/review';
import { PublisherInterface } from 'interfaces/publisher';
import { GetQueryInterface } from 'interfaces';

export interface BookInterface {
  id?: string;
  title: string;
  author: string;
  publisher_id: string;
  published_date: any;
  isbn: string;
  genre: string;
  created_at?: any;
  updated_at?: any;
  discussion?: DiscussionInterface[];
  review?: ReviewInterface[];
  publisher?: PublisherInterface;
  _count?: {
    discussion?: number;
    review?: number;
  };
}

export interface BookGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  author?: string;
  publisher_id?: string;
  isbn?: string;
  genre?: string;
}

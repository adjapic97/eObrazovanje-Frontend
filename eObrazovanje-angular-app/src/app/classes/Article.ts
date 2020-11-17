import { Lecturer } from './Lecturer';

export class Article {

  id: number;
  articleText: string;
  articleName: string;
  dateCreated: Date;
  important: boolean;
  lecturer: Lecturer;
}

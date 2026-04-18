
export interface Card {
  id?: string;
  user_id?: string;
  question: string;
  answer: string;
  page: number;
  title: string;
  subtitle?: string;
  collection_id?: string;
}

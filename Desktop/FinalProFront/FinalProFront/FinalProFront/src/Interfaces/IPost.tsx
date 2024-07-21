export interface IPost {
  _id: string;
  authorName?: string;
  title: string;
  content: string;
  imgUrl?: string;
  products?: string;
  comments?: Array<{
    comment: string;
    user: string;
  }>;
}

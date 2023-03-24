export type Book = {
  accessionNumber: string;
  author: string;
  bookType: string;
  callNumber: string;
  id?: string;
  imageUrl: string;
  keyword: string;
  publisher: string;
  returnDate: Date | string;
  status: string;
  title: string;
};

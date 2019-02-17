export type Author = {
  name: string,
};

export type Book = {
  isbn: string,
  title: string,
  authors: Author[],
  price: number,
};

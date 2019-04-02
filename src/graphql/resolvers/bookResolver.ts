import { GraphQLError } from "graphql";
import { IResolvers } from "graphql-tools";
import sampleData from "../../data/sampleData";
import { Book } from "../../data/types";
import GraphQLContext from "../type/GraphQLContext";

const bookResolver: IResolvers = {
  Query: {
    books: () => sampleData.books,
    getBookByISBN(source, args) {
      const isbn = args.isbn as string;
      return sampleData.books.find(book => book.isbn === isbn);
    },
    getBookByTitle: (source, args) => {
      const title = args.title as string;
      return sampleData.books.find(book => book.title === title);
    },
    getBooksByAuthor(source, args) {
      const authorName = args.authorName as string;
      return sampleData.books.map(book => {
        return book.authors.find(author => author.name == authorName);
      });
    },
  },
  Mutation: {
    addBook(source, args, context) {
      if (!(context as GraphQLContext).authorizationToken) {
        throw new GraphQLError("Authorization required");
      }
      const newBook = args.book;
      if (sampleData.books.find(book => book.isbn === newBook.isbn)) {
        throw new GraphQLError(`duplicate book ${newBook.title} already exists`);
      }
      sampleData.books.push(newBook);
    },
  },
}

export default bookResolver;

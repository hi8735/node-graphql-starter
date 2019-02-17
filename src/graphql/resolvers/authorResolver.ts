import { GraphQLError } from "graphql";
import { IResolvers } from "graphql-tools";
import GraphQLContext from "../GraphQLContext";
import sampleData from "../../data/sampleData";
import { Author } from "../../data/types";

const authorResolver: IResolvers = {
  Query: {
    authors: () => sampleData.authors,
    getAuthorByName: (source, args) => {
      const name = args.name as string;
      return sampleData.authors.find(author => author.name === name);
    },
  },
  Mutation: {
    addAuthor(source, args, context) {
      if (!(context as GraphQLContext).authorizationToken) {
        throw new GraphQLError("Authorization required");
      }
      const newAuthor: Author = args.author;
      if (sampleData.authors.find(author => author.name === newAuthor.name)) {
        throw new GraphQLError(`duplicate author ${newAuthor.name} already exists`);
      }
      sampleData.authors.push(newAuthor);
    },
  }
};

export default authorResolver;

import { IResolvers } from "graphql-tools";
import authorResolver from "./authorResolver";
import bookResolver from "./bookResolver";

const rootResolvers: IResolvers = {
  Query: {
    hello: () => "world",
  },
  Mutation: {
  },
};

export default rootResolvers;

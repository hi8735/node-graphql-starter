import { IResolvers } from "graphql-tools";
import { merge } from "lodash";
import authorResolver from "./authorResolver";
import bookResolver from "./bookResolver";

const rootResolver: IResolvers = {
  Query: {
    hello: () => "world",
  },
  Mutation: {
  },
};

export default merge(
  rootResolver,
  authorResolver,
  bookResolver,
);

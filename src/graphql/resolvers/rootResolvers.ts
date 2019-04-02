import { IResolvers } from "graphql-tools";
import customScalar from "../type/customScalar";

const rootResolvers: IResolvers = {
  Query: {
    hello: () => "world",
  },
  Mutation: {
  },
  ...customScalar,
};

export default rootResolvers;

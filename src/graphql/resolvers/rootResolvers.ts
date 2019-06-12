import { IResolvers } from "graphql-tools";
import { defaultResolvers } from "./defaultResolvers";
import { dateScalar } from "./customScalars";

export const rootResolvers: IResolvers = {
  Query: {
    ...defaultResolvers.query,
  },
  Mutation: {
    ...defaultResolvers.mutation,
  },
  Date: dateScalar,
};

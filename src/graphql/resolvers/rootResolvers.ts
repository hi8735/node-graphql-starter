import { IResolvers } from "graphql-tools";
import customScalar from "../type/customScalar";

namespace Resolvers {

  const serverTimezoneOffset = (): number => new Date().getTimezoneOffset() / 60 * -1;

  export const rootResolvers: IResolvers = {
    Query: {
      serverTimezoneOffset: serverTimezoneOffset,
    },
    Mutation: {
      test: (parent: any, args: { value: number }): number => args.value,
    },
    ...customScalar,
  };
}


export default Resolvers.rootResolvers;

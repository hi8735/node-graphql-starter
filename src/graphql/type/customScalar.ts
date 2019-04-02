import { GraphQLScalarType, Kind } from "graphql";

namespace CustomScalar {
  export const date = new GraphQLScalarType({
    name: "Date",
    description: "Date type",
    parseValue: (value: string): Date => new Date(value),
    serialize: (value: Date): string => value.toISOString(),
    parseLiteral: (ast): Date => ast.kind === Kind.INT ? new Date(ast.value) : null,
  });
}

export default {
  Date: CustomScalar.date,
};

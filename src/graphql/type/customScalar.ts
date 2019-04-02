import { GraphQLScalarType, Kind, ValueNode } from "graphql";

namespace CustomScalar {

  export const date = new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar",
    parseValue: (value: string): Date => new Date(value),
    serialize: (value: Date): string => value.getTime() && value.toISOString(),
    parseLiteral: (valueNode: ValueNode): Date => valueNode.kind === Kind.STRING ? new Date(valueNode.value) : null,
  });
}

export default {
  Date: CustomScalar.date,
};

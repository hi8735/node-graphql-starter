import {
  GraphQLScalarType,
  Kind,
  ValueNode,
 } from "graphql";

export const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar",
  parseLiteral: (valueNode: ValueNode): Date => valueNode.kind === Kind.STRING ? new Date(valueNode.value) : null,
  parseValue: (value: string): Date => new Date(value),
  serialize: (value: Date): string => value.getTime() && value.toISOString(),
});

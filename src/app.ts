import { ApolloServer, Config } from "apollo-server";
import chalk from "chalk";
import express = require("express");
import { DocumentNode } from "graphql";

import rootResolver from "./graphql/resolvers/rootResolver";
import { getTypeDefsAsync } from "./graphql/schemaReader";
import { timestampMessage } from "./util/consoleHelper";
import GraphQLContext from "./graphql/GraphQLContext";

let typeDefs: DocumentNode[];
getTypeDefsAsync().then((value) => {
  console.log(chalk.greenBright(timestampMessage('GraphQL schemas loaded.')));
  typeDefs = value;

  const apolloConfig: Config = {
    typeDefs: typeDefs,
    resolvers: rootResolver,
    context: ({ req }: { req: express.Request }): GraphQLContext => {
      const authoriationToken = req.headers.authorization;
      return { authorizationToken: authoriationToken };
    },
    debug: process.env.NODE_ENV !== 'production',
    formatError: (error: any) => error,
  };

  const app = () => {
    const apolloServer = new ApolloServer(apolloConfig);
    apolloServer.listen().then(({ url }) => {
      console.log(chalk.cyanBright(timestampMessage(`server is running @ ${chalk.underline(url)}`)));
      console.log(chalk.cyan(timestampMessage(`GraphQL Playground is available @ ${chalk.underline(`${url}graphql`)}`)));
    });
  };

  app();
}).catch((reason) => {
  console.log(chalk.red(timestampMessage(reason)));
});

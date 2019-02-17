import { ApolloServer, Config } from "apollo-server";
import chalk from "chalk";
import express = require("express");

import { timestampMessage } from "./util/consoleHelper";
import { getTypeDefsAsync } from "./graphql/schemaReader";
import { DocumentNode } from "graphql";

let typeDefs: DocumentNode[];
getTypeDefsAsync().then((value) => {
  typeDefs = value;
  
  const apolloConfig: Config = {
    typeDefs: typeDefs,
    resolvers: {},
    context: ({ req }: { req: express.Request }) => {
      const authoriationToken = req.headers.authoriation || '';
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

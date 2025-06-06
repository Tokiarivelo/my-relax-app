// apps/gateway/src/main.ts
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import {
  ApolloGateway,
  IntrospectAndCompose,
  RemoteGraphQLDataSource,
} from '@apollo/gateway';
import { ApolloServer } from '@apollo/server';
import { useServer } from 'graphql-ws/use/ws';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { json } from 'body-parser';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';

import { AppModule } from './app/app.module';
import { envConfig } from './config/env-config';
import { readFileSync } from 'fs';

async function createGateway() {
  let supergraphSdl;

  try {
    // Essaye l’introspection live
    const gatewayTemp = new ApolloGateway({
      supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
          { name: 'auth', url: 'http://localhost:4001/graphql' },
          // …
        ],
        // pas de polling ici
      }),
    });
    supergraphSdl = await gatewayTemp.load();
  } catch (e) {
    console.warn(
      '⚠️  Introspection failed, falling back to static supergraph :>>>',
      e
    );
    supergraphSdl = readFileSync('supergraph.graphql', 'utf8');

    console.log('supergraphSdl :>>> ', supergraphSdl);
  }

  return new ApolloGateway({ supergraphSdl });
}

async function bootstrap() {
  const expressApp = express();
  const httpServer = createServer(expressApp);

  // Démarre Nest sur expressApp
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp)
  );
  await app.init();

  // Configure WebSocket pour subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  // Crée le gateway
  const gateway = await createGateway();

  // Instancie Apollo v4
  const server = new ApolloServer({ gateway });
  await server.start();

  // Middleware Express
  expressApp.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    // @ts-ignore — conflit de types express v4/v5
    expressMiddleware(server, {
      context: async ({ req }) => ({ headers: req.headers }),
    })
  );

  // Subscriptions WS
  useServer(
    {
      execute: (args: any) => args.execute(args),
      subscribe: (args: any) => args.subscribe(args),
      onConnect: async (ctx) => {
        console.log('🔌 Client connected');
      },
      onDisconnect(ctx, code, reason) {
        console.log('❌ Client disconnected');
      },
    },
    wsServer
  );

  // 5) Démarre le serveur HTTP/WS
  const PORT = envConfig.PORT;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Gateway ready at http://localhost:${PORT}/graphql`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
}

bootstrap();

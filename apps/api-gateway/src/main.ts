// apps/gateway/src/main.ts
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServer } from '@apollo/server';
import { useServer } from 'graphql-ws/use/ws';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { json } from 'body-parser';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';

import { AppModule } from './app/app.module';
import { envConfig } from './config/env-config';

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
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'auth', url: envConfig.AUTH_URL },
        // …
      ],
      // tous les X ms, on ré-introspecte
      pollIntervalInMs: 60_000,
    }),
  });

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

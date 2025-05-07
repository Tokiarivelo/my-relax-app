import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
      },
      context: ({ req }: any) => ({ req }),
    }),
  ],
})
export class AppModule {}

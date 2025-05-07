import { ObjectType, Field, ID } from '@nestjs/graphql';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@ObjectType({ description: 'user' })
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  username!: string;

  @Field()
  firstName!: string;

  @Field(() => String, { nullable: true })
  lastName?: string | null;

  @Field(() => String, { nullable: true })
  phone?: string | null;

  @Field()
  email!: string;

  @Field(() => [Role])
  roles!: Role[];
}

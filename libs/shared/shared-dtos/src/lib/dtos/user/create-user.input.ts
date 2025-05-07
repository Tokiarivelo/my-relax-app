import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(8)
  password!: string;

  @Field()
  firstName!: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  username!: string;

  @Field({ nullable: true })
  phone?: string;
}

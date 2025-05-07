import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '../generated/prisma';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueUserOrThrowArgs {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
}

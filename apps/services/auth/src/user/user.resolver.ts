import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput, UsersArgs } from '@my-relax-app/shared-dtos';
import { UsersService } from './users.service';
import { User } from './user.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async getAll(
    @Args('usersArgs') usersArgs: UsersArgs
  ): Promise<User[] | null> {
    return this.usersService.findAll(usersArgs);
  }

  @Query(() => User, { name: 'user' })
  async getOne(@Args('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Mutation(() => User, { name: 'createUser' })
  async create(@Args('input') input: CreateUserInput): Promise<User> {
    return this.usersService.create(input);
  }
}

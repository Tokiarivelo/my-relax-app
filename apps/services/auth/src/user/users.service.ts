import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService, Prisma } from '@my-relax-app/shared-prisma';
import * as bcrypt from 'bcrypt';
import { User } from './user.model';
import { CreateUserInput } from '@my-relax-app/shared-dtos';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateUserInput): Promise<User> {
    const hash = await bcrypt.hash(input.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        firstName: input.firstName,
        username: input.username,
        lastName: input.lastName,
        phone: input.phone,
        password: hash,
        Role: {
          connect: { name: 'USER' },
        },
      },
    });
    return this.toModel(user);
  }

  async findAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    } = {}
  ): Promise<User[] | null> {
    const { skip, take, cursor, where, orderBy } = params;
    const users = await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    return users ? users.map((user) => this.toModel(user)) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { Role: true },
    });
    return user ? this.toModel(user) : null;
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { Role: true },
    });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return this.toModel(user);
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.delete({
      where,
    });

    if (!user) throw new NotFoundException(`User ${where} not found`);
    return this.toModel(user);
  }

  private toModel(u: any): User {
    return {
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      phone: u.phone,
      username: u.username,
      roles: u.roles.map((r: any) => r.name),
    };
  }
}

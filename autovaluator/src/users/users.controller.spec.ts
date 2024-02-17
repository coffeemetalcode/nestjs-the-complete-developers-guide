import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let mockAuthService: Partial<AuthService>;
  let mockUsersService: Partial<UsersService>;
  let controller: UsersController;

  const mockDefaultUser: Partial<User> = {
    id: 1,
    email: 'e@mail.com',
    password: 'pa$$w0rd',
  };

  const mockUpdatedUser: Partial<User> = {
    ...mockDefaultUser,
    email: 'g@mail.com',
  };

  beforeEach(async () => {
    mockAuthService = {
      authenticate: (email: string, password: string) => {
        return Promise.resolve({
          ...mockDefaultUser,
          email,
          password,
        } as User);
      },
      register: (email: string, password: string) => {
        return Promise.resolve({
          ...mockDefaultUser,
          email,
          password,
        } as User);
      },
    };

    mockUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          ...mockDefaultUser,
          id,
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([
          {
            ...mockDefaultUser,
            email,
          } as User,
        ]);
      },
      update: (id: number, attrs: Partial<User>) => {
        return Promise.resolve({
          ...mockDefaultUser,
          ...attrs,
        } as User);
      },
      remove: (id: number) => {
        return Promise.resolve({
          ...mockDefaultUser,
          id,
        } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('is defined', async () => {
    expect(controller).toBeDefined();
  });

  // ? spy on _repo methods?
  it('returns a list of users with a given email on GET /auth?email=', async () => {
    const users = await controller.findAllUsers('e@mail.com');

    expect(users.length).toEqual(1);
    expect(users[0].id).toEqual(1);
  });

  it('throws an exception when a user is not found on GET /auth/:id', async () => {
    mockUsersService.findOne = () => null;

    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('finds a single user on GET /auth/:id', async () => {
    const user = await controller.findUser('1');

    expect(user).toBeDefined();
    expect(user.email).toEqual(mockDefaultUser.email);
  });

  it('updates a user record on PATCH /auth/:id', async () => {
    const user = await controller.updateUser('1', {
      email: 'g@mail.com',
    } as UpdateUserDTO);

    expect(user.email).toEqual(mockUpdatedUser.email);
  });

  it('removes a user record on DELETE /auth/:id', async () => {
    const user = await controller.removeUser('1');

    expect(user).toEqual(mockDefaultUser);
  });

  it('registers a new user and creates a session on POST auth/signup', async () => {
    const session = { id: null };
    const user = await controller.createUser(
      { email: 'yabba@dabba.doo', password: 'securePass1' } as CreateUserDTO,
      session,
    );

    expect(user).toBeDefined();
    expect(session.id).toEqual(user.id);
  });

  it('updates session and returns user on POST auth/signin', async () => {
    const session = { id: null };
    const user = await controller.authenticate(
      { email: 'yabba@dabba.doo', password: 'securePass1' },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.id).toEqual(user.id);
  });

  it('updates session on POST auth/signout', () => {
    const session = { id: 1 };
    controller.signOut(session);

    expect(session.id).toEqual(null);
  });
});

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    mockUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string): User =>
        ({ id: 1, email, password }) as User,
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('creates an instance of AuthService', async () => {
    expect(service).toBeDefined();
  });

  it('registers a new user with hashed and salted password', async () => {
    const user = await service.register('e@mail.com', 'pa$$w0rd');
    const [salt, hash] = user.password.split('.');

    expect(user.password).not.toEqual('pa$$w0rd');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error when a user tries to register with email already in use', async () => {
    mockUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'e@mail.com', password: 'pa$$w0rd' } as User,
      ]);

    await expect(service.register('e@mail.com', 'pa$$w0rd')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws an error if a user tries to authenticate with an email not in use', async () => {
    await expect(
      service.authenticate('e@mail.com', 'pa$$w0rd'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws an error when a user tries to authenticate with incorrect password', async () => {
    mockUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'e@mail.com', password: 'pa$$w0rd' } as User,
      ]);

    await expect(
      service.authenticate('e@mail.com', 'password'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user authenticating with the correct password', async () => {
    // ! both the jest.spyOn and mockUserService.find approaches work here
    const mockUser = {
      id: 1,
      email: 'e@mail.com',
      password:
        'cb296f2a1a485f5d.ac74566366081c023ca3b4b70f5a924cf172a0768f3e90bf0fcdd0b0eba332a7',
    };

    jest
      .spyOn(mockUsersService, 'find')
      .mockReturnValue(Promise.resolve([mockUser as User]));

    /* mockUsersService.find = () =>
      Promise.resolve([
        {
          id: 1,
          email: 'e@mail.com',
          password:
            'cb296f2a1a485f5d.ac74566366081c023ca3b4b70f5a924cf172a0768f3e90bf0fcdd0b0eba332a7',
        } as User,
      ]); */

    const user = await service.authenticate('e@mail.com', 'pa$$w0rd');
    expect(user).toBeDefined();
  });
});

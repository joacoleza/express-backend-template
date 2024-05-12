import 'reflect-metadata';

import { UsersService } from './usersService';
import { IUsersRepository } from './interfaces/usersRepository';

describe('UsersService', () => {
  describe('get', () => {
    it('should get a user', async () => {
      const expectedUser = {
        id: 1,
        email: 'foo@foo.com',
        name: 'Foo',
        status: 'Happy',
        phoneNumbers: ['+1111111111']
      };
      const mockRepository: IUsersRepository = {
        get: jest.fn().mockReturnValue(expectedUser),
        create: jest.fn()
      };
      const service = new UsersService(mockRepository);
      const result = service.get(1);
      expect(result).toEqual(expectedUser);
      expect(mockRepository.get).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const mockRepository: IUsersRepository = {
        get: jest.fn(),
        create: jest.fn().mockImplementation((user) => user)
      };
      const service = new UsersService(mockRepository);
      const result = service.create({
        email: 'foo@foo.com',
        name: 'Foo',
        phoneNumbers: ['+333333333']
      });
      expect(result).toEqual({
        email: 'foo@foo.com',
        name: 'Foo',
        status: 'Happy',
        phoneNumbers: ['+333333333']
      });
      expect(mockRepository.create).toHaveBeenCalledWith({
        email: 'foo@foo.com',
        name: 'Foo',
        status: 'Happy',
        phoneNumbers: ['+333333333']
      });
    });
  });
});

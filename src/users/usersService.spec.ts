import 'reflect-metadata';

import { UsersService } from './usersService';

describe('UsersService', () => {
  describe('get', () => {
    it('should get a user', async () => {
      const service = new UsersService();
      const result = service.get(1);
      expect(result).toEqual({
        id: 1,
        email: 'foo@foo.com',
        name: 'Foo',
        status: 'Happy',
        phoneNumbers: ['+1111111111']
      });
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const service = new UsersService();
      const result = service.create({
        email: 'foo@foo.com',
        name: 'Foo',
        phoneNumbers: ['+333333333']
      });
      expect(result).toEqual({
        id: 3,
        email: 'foo@foo.com',
        name: 'Foo',
        status: 'Happy',
        phoneNumbers: ['+333333333']
      });
    });
  });
});

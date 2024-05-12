import { provideSingleton } from '../utils/provideSingleton';
import { User } from './interfaces/user';
import { IUsersRepository } from './interfaces/usersRepository';

@provideSingleton(UsersRepository)
export class UsersRepository implements IUsersRepository {
  private users: User[] = [
    {
      id: 1,
      email: 'foo@foo.com',
      name: 'Foo',
      status: 'Happy',
      phoneNumbers: ['+1111111111']
    },
    {
      id: 2,
      email: 'foo@foo.com',
      name: 'Foo',
      status: 'Sad',
      phoneNumbers: ['+2222222222']
    }
  ];

  public get(id: number): User | null {
    return this.users.find((u) => u.id === id) ?? null;
  }

  public create(user: Omit<User, 'id'>): User {
    const newUser: User = {
      ...user,
      id: this.users[this.users.length - 1].id + 1 // Attention! If 2 requests are processed concurrently this could add 2 users with the same id. Id generation should be handled by the DB in a real app.
    };
    this.users.push(newUser);
    return newUser;
  }
}

import { provideSingleton } from '../utils/provideSingleton';
import { User } from './interfaces/user';
import { UserCreationParams } from './interfaces/userCreationParams';

@provideSingleton(UsersService)
export class UsersService {
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

  public get(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  public create(user: UserCreationParams): User {
    const newUser: User = {
      ...user,
      id: this.users[this.users.length - 1].id + 1, // Attention! If 2 requests are processed concurrently this could add 2 users with the same id. Id generation should be handled by the DB in a real app.
      status: 'Happy'
    };
    this.users.push(newUser);
    return newUser;
  }
}

import { provideSingleton } from '../utils/provideSingleton';
import { User } from './user';

export type UserCreationParams = {
  email: string;
  name: string;
  phoneNumbers: string[];
};

@provideSingleton(UsersService)
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      email: 'foo@foo.com',
      name: 'Foo',
      status: 'Happy',
      phoneNumbers: []
    },
    {
      id: 2,
      email: 'foo@foo.com',
      name: 'Foo',
      status: 'Sad',
      phoneNumbers: []
    }
  ];

  public get(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  public create(userCreationParams: UserCreationParams): User {
    const user: User = {
      id: this.users[this.users.length - 1].id + 1, // Attention! If 2 requests are processed concurrently this could add 2 users with the same id. Id generation should be handled by the DB in a real app.
      status: 'Happy',
      ...userCreationParams
    };
    this.users.push(user);
    return user
  }
}

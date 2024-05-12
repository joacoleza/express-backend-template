import { User } from './user';

export type UserCreationParams = {
  email: string;
  name: string;
  phoneNumbers: string[];
};

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
    return {
      id: this.users[this.users.length - 1].id + 1,
      status: 'Happy',
      ...userCreationParams
    };
  }
}

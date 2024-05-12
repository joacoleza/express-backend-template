import { User } from './user';

export interface IUsersRepository {
  get(id: number): User | null;
  create(user: Omit<User, 'id'>): User;
}

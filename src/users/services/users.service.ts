import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { User } from '../models';

@Injectable()
export class UsersService {
  private readonly users: Record<string, User>;

  constructor() {
    this.users = {
      'nsasinovich': {
        name: 'nsasinovich',
        password: 'password',
        id: '191ed943-d596-48ca-aabc-febd40184bba'
      }
    }
  }

  findOne(name: string): User {
    return this.users[ name ];
  }

  createOne({ name, password }: User): User {
    const id = v4(v4());
    const newUser = { id, name, password };

    this.users[ name ] = newUser;

    return newUser;
  }
}

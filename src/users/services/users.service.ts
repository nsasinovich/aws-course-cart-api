import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { PG_CLIENT } from 'src/constants';

import { v4 } from 'uuid';

import { User } from '../models';

@Injectable()
export class UsersService {
  private readonly users: Record<string, User>;

  constructor(@Inject(PG_CLIENT) private pg: Client) {
    this.users = {
      'nsasinovich': {
        name: 'nsasinovich',
        password: 'password',
        id: '191ed943-d596-48ca-aabc-febd40184bba'
      }
    }
  }

  async findOne(name: string): Promise<User> {
    const response = await this.pg.query<User>(
      `SELECT
        id,
        name,
        email,
        password
      FROM
        users
      WHERE name=$1
      LIMIT 1`,
      [name]
    );

    if(response.rowCount === 0) {
      return null;
    }

    return response.rows[0];
  }

  async createOne({ name, password }: User): Promise<User> {
    const id = v4(v4());

    console.log('validateUser: createOne::', id, name, password);

    await this.pg.query(
      `INSERT INTO users (id, name, password) VALUES ($1, $2, $3)`,
      [id, name, password]
    );

    return { id, name, password };
  }
}

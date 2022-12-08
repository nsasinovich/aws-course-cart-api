import { Client } from 'pg';
import { Module } from '@nestjs/common';
import { PG_CLIENT } from 'src/constants';

const clientProvider = {
  provide: PG_CLIENT,
  useFactory: async () => {
    const dbClient = new Client({
      user: process.env.PG_USERNAME,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: Number(process.env.PG_PORT),
    })

    await dbClient.connect();

    return dbClient;
  },
};

@Module({
  providers: [clientProvider],
  exports: [PG_CLIENT],
})
export class PgModule {}

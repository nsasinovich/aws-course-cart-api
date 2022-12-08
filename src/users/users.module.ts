import { Module } from '@nestjs/common';
import { PgModule } from 'src/pg/pg.module';

import { UsersService } from './services';

@Module({
  imports: [ PgModule ],
  providers: [ UsersService ],
  exports: [ UsersService ],
})
export class UsersModule {}

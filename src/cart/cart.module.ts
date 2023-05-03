import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';
import { PgModule } from '../pg/pg.module';

import { CartController } from './cart.controller';
import { CartService } from './services';


@Module({
  imports: [ OrderModule, PgModule ],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}

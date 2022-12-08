import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';

import { v4 } from 'uuid';

import { Cart, CartItem } from '../models';

import { PG_CLIENT } from 'src/constants';

@Injectable()
export class CartService {
  constructor(@Inject(PG_CLIENT) private pg: Client) {}

  async findByUserId(userId: string): Promise<Cart | null> {
    const response = await this.pg.query<Cart & CartItem>(
     `SELECT
        id,
        product_id AS "productId",
        count
      FROM
        carts
      LEFT JOIN cart_items ON carts.id = cart_items.cart_id
      WHERE user_id=$1`,
     [userId]
     );

    if (response.rowCount === 0) {
      return null;
    }

    const items: CartItem[] = response.rows.reduce((acc, { productId, count }) => {
      if(productId) {
        acc.push({ productId, count });
      }

      return acc;
    }, []);

    return {
      items,
      id: response.rows[0].id,
    };
  }

  async createByUserId(userId: string) {
    const id = v4(v4());

    await this.pg.query(
      `INSERT INTO carts (id, user_id) VALUES ($1, $2)`,
      [id, userId]
    );

    return {
      id,
      items: [],
    };
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      console.log('findOrCreateByUserId: cart found!', userCart);

      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const { id: cartId } = await this.findOrCreateByUserId(userId);

    await this.pg.query(
      'DELETE FROM cart_items WHERE cart_id=$1',
      [cartId]
      );

    await this.pg.query(
     `INSERT INTO
        cart_items (product_id, cart_id, count)
      VALUES
        ${items.map(item => `('${item.productId}', '${cartId}', ${item.count})`)};
      `);

    return {
      id: cartId,
      items: [ ...items ],
    }
  }

  async removeByUserId(userId): Promise<void> {
    await this.pg.query('DELETE FROM carts WHERE user_id=$1', [userId]);
  }
}

import 'dotenv/config';
import { DataSource } from 'typeorm';

import Sellers from '@modules/sellers/infra/typeorm/entities/Seller';

import { CreateSellersTable1626204788583 } from './migrations/1626204788583-CreateSellersTable';

export const dataSource = new DataSource({
  type: 'postgres',
  host: "db",
  port: 5432,
  username: "postgres",
  password: "*(!PU8u123pidu2093id23i)",
  database: "apiunifacef",
  entities: [Sellers],
  migrations: [
    CreateSellersTable1626204788583,
  ],
});
import { container } from 'tsyringe';

import { ISellersRepository } from '@modules/sellers/domain/repositories/ISellersRepository';
import SellersRepository from '@modules/sellers/infra/typeorm/repositories/SellersRepository';

container.registerSingleton<ISellersRepository>(
  'SellersRepository',
  SellersRepository,
);

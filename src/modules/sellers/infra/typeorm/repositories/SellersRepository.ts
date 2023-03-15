import { ICreateSeller } from '@modules/sellers/domain/models/ICreateSeller';
import { IPaginateSeller } from '@modules/sellers/domain/models/IPaginateSeller';
import { ISellersRepository } from '@modules/sellers/domain/repositories/ISellersRepository';

import { Repository } from 'typeorm';
import { Seller } from '../entities/Seller';
import { dataSource } from '@shared/infra/typeorm';
import { ISeller } from '@modules/sellers/domain/models/ISeller';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

type SearchParamsUserID = {
  user_id: string;
  page: number;
  skip: number;
  take: number;
};

class SellersRepository implements ISellersRepository {
  private ormRepository: Repository<Seller>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Seller);
  }

  public async save(seller: ISeller): Promise<ISeller> {
    await this.ormRepository.save(seller);

    return seller;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateSeller): Promise<ISeller> {
    const seller = this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.ormRepository.save(seller);

    return seller;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateSeller> {
    const [activities, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      totalPage: Math.ceil(count / take),
      data: activities,
    };

    return result;
  }

  public async findByUserID({
    page,
    skip,
    take,
    user_id,
  }: SearchParamsUserID): Promise<IPaginateSeller> {
    const [activities, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .where('user_id = :user_id', { user_id })
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      totalPage: Math.ceil(count / take),
      data: activities,
    };

    return result;
  }

  public async findById(id: string): Promise<ISeller | null> {
    const activity = await this.ormRepository.findOneBy({ id });

    return activity;
  }

  public async findByEmail(email: string): Promise<ISeller | null> {
    const activity = await this.ormRepository.findOneBy({ email });

    return activity;
  }

}

export default SellersRepository;

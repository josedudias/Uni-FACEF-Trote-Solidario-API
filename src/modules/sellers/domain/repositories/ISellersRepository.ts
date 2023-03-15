import { ICreateSeller } from '../models/ICreateSeller';
import { ISeller } from '../models/ISeller';
import { IPaginateSeller } from '../models/IPaginateSeller';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

type SearchParamsSellerID = {
  user_id: string;
  page: number;
  skip: number;
  take: number;
};

export interface ISellersRepository {
  findAll({ page, skip, take }: SearchParams): Promise<IPaginateSeller>;
  findByUserID({
    page,
    skip,
    take,
    user_id,
  }: SearchParamsSellerID): Promise<IPaginateSeller | null>;
  findById(id: string): Promise<ISeller | null>;
  findByEmail(email: string): Promise<ISeller | null>;
  create(data: ICreateSeller): Promise<ISeller>;
  save(seller: ISeller): Promise<ISeller>;
}

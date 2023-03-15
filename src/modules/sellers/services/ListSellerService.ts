import { inject, injectable } from 'tsyringe';
import { IPaginateSeller } from '@sellersModels/IPaginateSeller';
import { ISellersRepository } from '@sellersRepositories/ISellersRepository';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListSellerService {
  constructor(
    @inject('SellersRepository')
    private sellersRepository: ISellersRepository,
  ) { }

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<IPaginateSeller> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const sellers = await this.sellersRepository.findAll({
      page,
      skip,
      take,
    });

    return sellers;
  }
}

export default ListSellerService;

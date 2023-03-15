import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { ISellersRepository } from '@sellersRepositories/ISellersRepository';
import { IPaginateSeller } from '@sellersModels/IPaginateSeller';

interface SearchParams {
  user_id: string;
  page: number;
  limit: number;
}

@injectable()
class ShowSellerService {
  constructor(
    @inject('SellersRepository')
    private sellersRepository: ISellersRepository,
  ) { }

  public async execute({
    page,
    limit,
    user_id,
  }: SearchParams): Promise<IPaginateSeller> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const sellers = await this.sellersRepository.findByUserID({
      page,
      skip,
      take,
      user_id,
    });

    if (!sellers) {
      throw new AppError('Vendedor não encontrado');
    }

    return sellers;
  }
}

export default ShowSellerService;

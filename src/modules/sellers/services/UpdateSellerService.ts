import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUpdateSeller } from '@sellersModels/IUpdateSeller';
import { ISeller } from '@sellersModels/ISeller';
import { ISellersRepository } from '@sellersRepositories/ISellersRepository';

@injectable()
class UpdateSellerService {
  constructor(
    @inject('SellersRepository')
    private sellersRepository: ISellersRepository,
  ) { }

  public async execute({
    id,
    name,
    email,
  }: IUpdateSeller): Promise<ISeller> {
    const seller = await this.sellersRepository.findById(id);

    if (!seller) {
      throw new AppError('Vendedor não encontrado');
    }

    await this.sellersRepository.save(seller);

    return seller;
  }
}

export default UpdateSellerService;

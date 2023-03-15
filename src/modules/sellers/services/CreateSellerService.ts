import { inject, injectable } from 'tsyringe';
import crypto from 'crypto';
import azure from 'azure-storage';
import AppError from '@shared/errors/AppError';
import { ICreateSeller } from '../domain/models/ICreateSeller';
import { ISeller } from '../domain/models/ISeller';
import { ISellersRepository } from '../domain/repositories/ISellersRepository';

@injectable()
class CreateSellerService {
  constructor(
    @inject('SellersRepository')
    private sellersRepository: ISellersRepository,
  ) { }

  public async execute({
    name,
    email,
    password,
  }: ICreateSeller): Promise<ISeller> {
    const checkSellerExists = await this.sellersRepository.findByEmail(email);

    if (checkSellerExists) {
      throw new AppError('Email address already used.');
    }

    const seller = await this.sellersRepository.create({
      name,
      email,
      password,
    });

    return seller;
  }
}

export default CreateSellerService;

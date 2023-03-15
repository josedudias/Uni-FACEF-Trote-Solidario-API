import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSellerService from '@modules/sellers/services/CreateSellerService';
import ListSellerService from '@modules/sellers/services/ListSellerService';
import ShowSellerService from '@modules/sellers/services/ShowSellerService';
import UpdateSellerService from '@modules/sellers/services/UpdateSellerService';
import { instanceToInstance } from 'class-transformer';
import config from '@config/authConfig';
import AppError from '@shared/errors/AppError';

export default class SellersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;
    const listSeller = container.resolve(ListSellerService);

    const sellers = await listSeller.execute({ page, limit });

    return response.json(instanceToInstance(sellers));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const showSeller = container.resolve(ShowSellerService);

    const seller = await showSeller.execute({ page, limit, user_id });

    return response.json(instanceToInstance(seller));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
    } = request.body;

    if (password.length < 6) {
      throw new AppError('Password must be at least 6 characters');
    }

    const createSeller = container.resolve(CreateSellerService);


    const seller = await createSeller.execute({
      name,
      email,
      password,
    });

    return response.json(instanceToInstance(seller));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, email, name } = request.body;

    const updateSeller = container.resolve(UpdateSellerService);

    const seller = await updateSeller.execute({
      id,
      email,
      name,
    });

    return response.json(instanceToInstance(seller));
  }
}

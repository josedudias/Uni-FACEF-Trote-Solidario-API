import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SellersController from '../controllers/SellersController';

const sellerRouter = Router();
const sellerController = new SellersController();

sellerRouter.get('/', sellerController.index);

sellerRouter.get(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().required(),
    },
  }),
  sellerController.show,
);

sellerRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sellerController.create,
);

sellerRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  sellerController.update,
);

export default sellerRouter;

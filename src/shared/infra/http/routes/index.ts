import { Router } from 'express';
import sellersRouter from '@modules/sellers/infra/http/routes/seller.routes';

const routes = Router();

routes.use('/', sellersRouter);

export default routes;

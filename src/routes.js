import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController'
import authMiddleare from './app/middlewares/auth'


const routes = new Router();


// Routes para acesso no navegador / [rota]
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.put('/users', authMiddleare, UserController.update);

routes.use(authMiddleare).Router;



export default routes;

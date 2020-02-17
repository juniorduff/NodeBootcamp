import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import authMiddleare from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Routes para acesso no navegador / [rota]
routes.post('/users', UserController.store);
routes.get('/providers', ProviderController.index);
routes.post('/sessions', SessionController.store);
routes.put('/users', authMiddleare, UserController.update);
routes.post('/files', upload.single('file'), FileController.store);
export default routes;

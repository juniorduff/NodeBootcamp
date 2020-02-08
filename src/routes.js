import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async(req, res) => {
    const user = await User.create({
        name: 'junior',
       email: 'junior_duff_sm@hotmail.com',
       password_hash: '123451231236',
    });
    return res.json(user);

});



export default routes;
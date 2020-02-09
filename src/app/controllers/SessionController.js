import jwt from 'jsonwebtoken';
import User from '../models/User'


class SessionController {
    async store(req, resp) {
        const { email, password } = req.body;
        // pega email e senha do usuario

        const user = await User.findOne({ where: { email } });
        // verifico se existe um usuario com este email

        if (!user) { 
          // verifico se usuario não existe
            return res.status(401).json({ error: 'User not found' });
            // se nao existir retorna erro 401
        }
      
        if (!(await user.checkPassword(password))) {
            // verifica se a senha nao é igual
            return res.status(401).json({ error: 'passwor does not match' });
        }
        const { id , name } = user;

        return res.json({
          user:{
            id,
            name,
            email,
          },
          token: jwt.sign({ id },'8538607221f2e42284acf599214cfa34',{
            expiresIn: '7d',
          }),
        });
    }
}


export default new SessionController();
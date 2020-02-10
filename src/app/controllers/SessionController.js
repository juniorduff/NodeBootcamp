import jwt from 'jsonwebtoken';
import User from '../models/User'
import authConfig from '../../config/auth'

class SessionController {
    async store(req, res) {
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
            return res.status(401).json({ error: 'password does not match' });
        }
        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}
export default new SessionController();

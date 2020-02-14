import * as Yup from 'yup';
import User from '../models/User';


class UserController {
    async store(req, res) {
        // verifica os campos required
        const schema = Yup.object().shape({
            name: Yup.string().required(), // verofica se n esta vazio
            email: Yup.string().email().required(), // verifica email
            password: Yup.string().required(), // verifica min 6 caract
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "validation fails" });
        }
        const UserExists = await User.findOne({ where: { email: req.body.email } });
        //VERIFICA SE EMAIL JA EXISTE
        if (UserExists) {
            return res.status(400).json({ error: "User already exists" })

        }
        const { id, name, email, provider } = await User.create(req.body)
            // RETORNA SOMENTE ID NOME EMAIL E PROVIDER
        return res.json({
            id,
            name,
            email,
            provider
        });
    }
    async update(req, res) {
        const { email, oldPassword } = req.body;
        const schema = Yup.object().shape({
            name: Yup.string(), // verofica se n esta vazio
            email: Yup.string().email(), // verifica email
            oldPassword: Yup.string().min(6), // verifica min 6 caract
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) =>
                oldPassword ? field.required() : field
            ),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "validation fails" });
        }

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "validation fails" });
        }


        const user = await User.findByPk(req.userId); // busca o usuario com ID

        if (email && email !== user.email) {
            const UserExists = await User.findOne({ where: { email } });
            //VERIFICA SE EMAIL JA EXISTE

            if (UserExists) {
                return res.status(400).json({ error: "User already exists" })
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            //VERIFICA SE A SENHA ANTIGA BATE COM A SENHA NOVA
            return res.status(401).json({ error: ' Password does not match' });
        }
        const { id, name, provider } = await user.update(req.body) // ATUALIZA O USUARIO

        return res.json({
            id,
            name,
            email,
            provider
        });
    }
}



export default new UserController();

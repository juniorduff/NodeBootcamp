import Sequeliza from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database'

const models = [User];

class Database{
  constructor(){
    this.init();

  }
  init(){
    this.connection = new Sequeliza(databaseConfig); // conexao com a base de dados

    models.map(model =>model.init(this.connection));
  }
}

export default new Database();
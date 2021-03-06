import Sequeliza from 'sequelize';

import mongoose from 'mongoose';

import User from '../app/models/User';

import File from '../app/models/File';

import databaseConfig from '../config/database';

import Appointments from '../app/models/Appointments';

const models = [User, File, Appointments];
class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequeliza(databaseConfig); // conexao com a base de dados

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();

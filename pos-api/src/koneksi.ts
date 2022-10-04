const { Sequelize } = require('sequelize');
import Config from "./config";
const sequelize = new Sequelize(Config.Mysql)
try {
  sequelize.authenticate();
  sequelize.sync({ alter: true })
  console.log('Connection mysql established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}



export default sequelize
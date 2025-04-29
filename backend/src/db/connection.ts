import { Sequelize } from "sequelize";


const sequelize = new Sequelize('bd_colegio', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});

export default sequelize;
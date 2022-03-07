import { Sequelize } from "sequelize";
import { User } from "../modules/user/models/User.model";

const sequelize = new Sequelize(
    {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        dialect: "mysql",
        port: 3306,
        logging: false,
        define: {
            timestamps: true,
            underscored: false,
            createdAt: true,
            updatedAt: true,
            freezeTableName: true,
            paranoid: true,
            deletedAt: "deletedAt",
        },
    },
);

User.initiate(sequelize);

module.exports = sequelize;

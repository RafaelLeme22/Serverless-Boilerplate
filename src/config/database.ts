module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    dialect: "mysql",
    port: 3306,
    define: {
        timestamps: true,
        underscored: false,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        freezeTableName: true,
        paranoid: true,
    },
};

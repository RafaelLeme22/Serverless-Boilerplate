import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { UserInterface } from "../interfaces/UserInterface";

type UserCreationAttributes = Optional<UserInterface, "id">

export class User extends Model<UserInterface, UserCreationAttributes> {
  public id!: number;
  public name!: string;
  public email!: string;

  public static initiate(connection: Sequelize): void {
    this.init({
      id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "O nome não pode ficar em branco." },
          notNull: { msg: "O nome não pode ficar em branco." },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "Insira um email válido." },
          notEmpty: { msg: "O email não pode ficar em branco." },
          notNull: { msg: "O email não pode ficar em branco." },
        },
      },
    }, {
      sequelize: connection,
      tableName: "user",
      modelName: "User",
    });
  }
}

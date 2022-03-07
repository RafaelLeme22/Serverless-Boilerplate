import { HTTPResponse } from "../../../utils/HTTPResponse";
import { User } from "../models/User.model";
import { Op, ValidationError } from "sequelize";
import { DeleteMultipleUsersInterface, UserInterface } from "../interfaces/UserInterface";
import { APIGatewayProxyEventMultiValueQueryStringParameters } from "aws-lambda";

export class UserService {
  public async create(data: UserInterface): Promise<HTTPResponse> {
    let result;
    try {
      result = await User.create({
        name: data.name,
        email: data.email,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return new HTTPResponse(error.errors[0].message, 200, true, {});
      } else {
        return new HTTPResponse("Aconteceu um erro ao tentar criar o usuário.", 200, true, {});
      }
    }

    // If the row wasnt created. Return an error message.
    if (!result) {
      return new HTTPResponse("Aconteceu um erro ao tentar criar o usuário.", 200, true, {});
    }

    // Rerturn the result JSON.
    return new HTTPResponse("O usuário foi criado com sucesso.", 200, false, result);
  }

  public async update(userId: number, data: UserInterface): Promise<HTTPResponse> {
    // Check if the id was sent.
    if (!userId) {
      return new HTTPResponse("O ID não foi enviado.", 200, true, {});
    }

    // Find the row in database.
    const user = await User.findOne({ where: { id: userId } });

    // If the user wasnt found return error message.
    if (!user) {
      return new HTTPResponse("O usuário não foi encontrado.", 200, true, {});
    }

    try {
      // Creates the user in the database.
      await user.update(
        {
          name: data.name ? data.name : user.name,
          email: data.email ? data.email : user.email,
        },
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        return new HTTPResponse(error.errors[0].message, 200, true, {});
      } else {
        return new HTTPResponse("Aconteceu um erro ao tentar atualizar o usuário.", 200, true, {});
      }
    }

    // Rerturn the result JSON.
    return new HTTPResponse("O usuário foi atualizado com sucesso.", 200, false, user);
  }

  public async delete(userId: number): Promise<HTTPResponse> {
    // Check if the id was sent.
    if (!userId) {
      return new HTTPResponse("O ID não foi enviado.", 200, true, {});
    }

    // Find the user in database.
    const user = await User.findOne({ where: { id: userId } });

    // If the user wasnt found return error message.
    if (!user) {
      return new HTTPResponse("O usuário não foi encontrado.", 200, true, {});
    }

    try {
      // Destroy the user according to the id sent.
      await user.destroy();
    } catch (error) {
      // If there was an error during the delete return the error message.
      if (error instanceof ValidationError) {
        return new HTTPResponse(error.errors[0].message, 200, true, {});
      } else {
        return new HTTPResponse("Aconteceu um erro ao tentar deletar o usuário.", 200, true, {});
      }
    }

    // Rerturn the result JSON.
    return new HTTPResponse("O usuário foi deletado com sucesso.", 200, false, user);
  }

  public async search(params: APIGatewayProxyEventMultiValueQueryStringParameters): Promise<HTTPResponse> {
    // Var with sequelize filtering format
    const sequelizeQuery = {
      where: {},
      order: [],
      limit: null,
      offset: null,
      include: [],
    };

    // Iterate through each query param
    for (const key in params) {
      // The param may came with the SQL comparison operator between brackets, like the following example 'id[like]'
      // The following code split the column name and comparison operator between two vars
      let [fieldName, queryOperator] = key.split("[");
      // If the param wasnt sent with a comparison operator this var will be undefined
      if (typeof queryOperator !== "undefined") {
        // At this moment this var will have a value like the following example 'like]', this code is responsible to remove the last character from the string
        queryOperator = queryOperator.slice(0, -1);
      }
      // Verify if the field name is valid in the model
      if (User.rawAttributes.hasOwnProperty(fieldName)) {
        // Verify if the comparison operator sent is valid
        if (Op.hasOwnProperty(queryOperator)) {
          // Use the comparison operator
          sequelizeQuery.where[fieldName] = {
            [Op[queryOperator]]: params[key][0],
          };
        } else {
          // Use the default comparison operator from sequelize
          sequelizeQuery.where[fieldName] = params[key][0];
        }
      // If the param isnt an attribute from the model it may be a SQL filter like 'limit' or 'offset'
      } else if (fieldName === "limit" || fieldName === "offset") {
        sequelizeQuery[fieldName] = parseInt(params[key][0]);
      } else if (fieldName === "order") {
        // Create a default order
        let order = "ASC";
        // If the param has a '-' as the first character it's order is DESCENDING
        if (params[key][0].charAt(0) === "-") {
          order = "DESC";
          // Remove the first character
          params[key][0] = params[key][0].substring(1);
        }
        sequelizeQuery[fieldName] = [[params[key][0], order]];
      }
    }

    // Find all rows in the database with the created filter
    const count = await User.count();
    const rows = await User.findAll(sequelizeQuery);
    return new HTTPResponse("Os usuários foram pesquisados com sucesso.", 200, false, { count: count, rows: rows });
  }

  public async deleteMultiple(usersIds: DeleteMultipleUsersInterface): Promise<HTTPResponse> {
    try {
      // Destroy the user according to the id sent.
      await User.destroy({
        where: {
          id: usersIds.ids,
        },
        individualHooks: true,
      });
    } catch (error) {
      // If there was an error during the delete return the error message.
      if (error instanceof ValidationError) {
        return new HTTPResponse(error.errors[0].message, 200, true, {});
      } else {
        return new HTTPResponse("Aconteceu um erro ao tentar deletar o usuário.", 200, true, {});
      }
    }

    // Rerturn the result JSON.
    return new HTTPResponse("Os usuários foram deletados com sucesso.", 200, false, {});
  }
}

import "./src/database";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { UserController } from "./src/modules/user/controller/UserController";
import { HTTPResponse } from "./src/utils/HTTPResponse";

const userController = new UserController();

export const createUser = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const response = await userController.create(event);
    return response.toResponse();
  } catch (err) {
    return new HTTPResponse(err.message, 500, true, {}).toResponse();
  }
};

export const updateUser = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const response = await userController.update(event);

    return response.toResponse();
  } catch (err) {
    return new HTTPResponse(err.message, 500, true, {}).toResponse();
  }
};

export const deleteUser = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const response = await userController.delete(event);

    return response.toResponse();
  } catch (err) {
    return new HTTPResponse(err.message, 500, true, {}).toResponse();
  }
};

export const searchUser = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const response = await userController.search(event);

    return response.toResponse();
  } catch (err) {
    return new HTTPResponse(err.message, 500, true, {}).toResponse();
  }
};

export const deleteMultipleUsers = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const response = await userController.deleteMultiple(event);

    return response.toResponse();
  } catch (err) {
    return new HTTPResponse(err.message, 500, true, {}).toResponse();
  }
};

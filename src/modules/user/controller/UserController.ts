import { APIGatewayEvent } from "aws-lambda";
import { HTTPResponse } from "../../../utils/HTTPResponse";
import { UserService } from "../services/UserService";
const userService = new UserService();

export class UserController {
    /**
     * create
     */
    public async create(event: APIGatewayEvent): Promise<HTTPResponse> {
        const response = await userService.create(JSON.parse(event.body));

        return response;
    }

    /**
     * create
     */
    public async update(event: APIGatewayEvent): Promise<HTTPResponse> {
        const response = await userService.update(parseInt(event.pathParameters.id), JSON.parse(event.body));

        return response;
    }

    /**
     * delete
     */
    async delete(event: APIGatewayEvent): Promise<HTTPResponse> {
        const response = await userService.delete(parseInt(event.pathParameters.id));

        return response;
    }

    /**
     * Method to get all rows from database.
     */
    async search(event: APIGatewayEvent): Promise<HTTPResponse> {
        const response = await userService.search(event.multiValueQueryStringParameters);

        return response;
    }

    /**
     * delete multiple users with only one request
     */
     async deleteMultiple(event: APIGatewayEvent): Promise<HTTPResponse> {
        const response = await userService.deleteMultiple(JSON.parse(event.body));

        return response;
    }
}

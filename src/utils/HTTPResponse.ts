import { APIGatewayProxyResult } from "aws-lambda";

export class HTTPResponse {
    public message
    public statusCode
    public error
    public data

    constructor(message:string, statusCode = 400, error = false, data = {}) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.data = data;
    }

    /**
     * * Funcion responsible to format the data according to the API Gateway specs
     */
    public toResponse(): APIGatewayProxyResult {
        return {
            statusCode: this.statusCode,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
                message: this.message,
                error: this.error,
                data: this.data,
            }),
        };
    }
}

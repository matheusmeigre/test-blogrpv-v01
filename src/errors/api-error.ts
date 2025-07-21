export class ApiError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}
export class NotFoundError extends ApiError {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
    }
}
export class BadRequestError extends ApiError {
    constructor(message: string = 'Bad request') {
        super(message, 400);
    }
}
export class UnauthorizedError extends ApiError {
    constructor(message: string = 'Unauthorized') {
        super(message, 401);
    }
}
export class InternalServerError extends ApiError {
    constructor(message: string = 'Internal server error') {
        super(message, 500);
    }
}
export class ServiceUnavailableError extends ApiError {
    constructor(message: string = 'Service unavailable') {
        super(message, 503);
    }
}
export class ForbiddenError extends ApiError {
    constructor(message: string = 'Forbidden') {
        super(message, 403);
    }
}
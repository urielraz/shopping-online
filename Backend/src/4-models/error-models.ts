export class ErrorModel {
    public constructor(public message: string, public status: number) { }
}

export class RouteNotFoundErrorModel extends ErrorModel {
    public constructor(route: string) {
        super(`Route ${route} Not Found!!!`, 404)
    }
}

export class ResourceNotFoundErrorModel extends ErrorModel {
    public constructor(id: number) {
        super(`ID ${id} Not exists!!!`, 404)
    }
}

export class ValidationErrorModel extends ErrorModel {
    public constructor(massage: string) {
        super(massage, 400)
    }
}

export class AuthErrorModel extends ErrorModel {
    public constructor(massage: string) {
        super(massage, 401)
    }
}
export class UnauthorizedError extends ErrorModel {
    public constructor(message: string) {
        super(message, 401);
    }
}
export class FileNotFoundErrorModel extends ErrorModel {
    public constructor(fileName: string) {
        super(`File ${fileName} Not Found!!!`, 404)
    }
}



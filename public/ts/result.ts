class Result<T = any> {
    success: boolean;
    message: string;
    value?: T;

    constructor(success: boolean, message: string, value?: T) {
        this.success = success;
        this.message = message;
        this.value = value;
    }

    static empty<T = any>(success: boolean, message: string): Result<T> {
        return new Result<T>(success, message);
    }

    static from<T = any>(tuple: [boolean, string, T]): Result<T> {
        return new Result<T>(tuple[0], tuple[1], tuple[2]);
    }
}


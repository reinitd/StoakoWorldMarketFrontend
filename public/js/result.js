class Result {
    constructor(success, message, value) {
        this.success = success;
        this.message = message;
        this.value = value;
    }
    static empty(success, message) {
        return new Result(success, message);
    }
    static from(tuple) {
        return new Result(tuple[0], tuple[1], tuple[2]);
    }
}

import type { ErrorType } from "../../types/types";

export class ValidationError extends Error {
    #errors: ErrorType[];
    constructor(errors: ErrorType[]){
        super("Validation failed, please check:")
        this.#errors = errors
    }
    get errors() { return this.#errors }
} 
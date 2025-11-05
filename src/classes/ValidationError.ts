import type { ErrorType } from "../types/types";

export class ValidationError extends Error {
    #errors: ErrorType[];
    constructor( message: string, errors: ErrorType[]){
        super(message)
        this.#errors = errors
    }
    get errors() { return this.#errors }
} 
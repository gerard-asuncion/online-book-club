import type { ErrorType } from "../types/types";

export const addTimeout = (callback: () => void, time: number): void => {
    setTimeout(callback, time);
};

export const validationErrorMessage = (errors: ErrorType[]): string => {
    let message = ""
    if(errors.length === 1){
        message = "Validation error:"
    }else if(errors.length > 1){
        message = "Validation errors:"
    }
    return message;
}
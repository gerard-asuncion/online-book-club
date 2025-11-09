function createCustomError(name: string) {

    return class CustomError extends Error {

        constructor(message: string){
            super(message);
            this.name = name;
        }
    }

}

export const RegisterNewUserError = createCustomError("RegisterNewUserError");
export const LoginWithEmailAndPasswordError = createCustomError("LoginWithEmailAndPasswordError");
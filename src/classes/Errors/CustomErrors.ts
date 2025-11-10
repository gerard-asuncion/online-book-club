const createCustomError = (name: string) => {

    return class CustomError extends Error {

        constructor(message: string){
            super(message);
            this.name = name;
        }
    }
}

export const RegisterNewUserError = createCustomError("RegisterNewUserError");
export const UserLoginError = createCustomError("UserLoginError")
export const UserCredentialError = createCustomError("UserCredentialError");
export const LoginWithEmailAndPasswordError = createCustomError("LoginWithEmailAndPasswordError");
export const ProfileDataError = createCustomError("ProfileDataError");
export const AutoUpdateUserDataError = createCustomError("AutoUpdateUserDataError");
export const ChatHistorialError = createCustomError("ChatHistorialError");
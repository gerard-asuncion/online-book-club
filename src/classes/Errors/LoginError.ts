export class LoginError extends Error {

    public readonly code: string;
    public readonly userMessage: string;

    public static fromFirebaseError(error: unknown): LoginError {
        let code: string = "unknown";
        if (error instanceof Error && 'code' in error) {
            code = (error as { code: string }).code;
        }
        return new LoginError(code);
    }

    constructor(errorCode: string) {
        super(`Login failed with code: ${errorCode}`);
        this.name = "LoginError";
        this.code = errorCode;

        switch (errorCode) {
            case "auth/invalid-credential":
            case "auth/invalid-email":
            case "auth/user-not-found":
            case "auth/wrong-password":
                this.userMessage = "Incorrect email or password. Please try again.";
                break;
            default:
                this.userMessage = "An unexpected error occurred. Please try again.";
        }
    }
}
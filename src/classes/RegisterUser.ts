import { serverTimestamp } from 'firebase/firestore';
import type { FieldValue } from 'firebase/firestore';

export class RegisterUser {
	#userUsername: string;
    #userEmail: string;
    #userPassword: string;
	#createdAt: FieldValue;
	#uid: string | null;

	static defaultBooks: string[] = ["3I_ODwAAQBAJ"];

	constructor(
		userUsername: string,
		userEmail: string,
		userPassword: string,
	) {
		this.#userUsername = userUsername;
        this.#userEmail = userEmail;
        this.#userPassword = userPassword;
		this.#createdAt = serverTimestamp();
		this.#uid = null;
    }

	get userUsername() { return this.#userUsername }
    get userEmail() { return this.#userEmail }
    get userPassword() { return this.#userPassword }
	get createdAt() { return this.#createdAt }

	toFirestoreObject() {
        return {
            uid: this.#uid,
            email: this.#userEmail,
            displayName: this.#userUsername,
            displayName_lowercase: this.#userUsername.toLowerCase(),
            storedBookIds: RegisterUser.defaultBooks,
			userChatHistorial: [],
            createdAt: this.#createdAt
        };
	}
}
import { serverTimestamp } from 'firebase/firestore';
import type { FieldValue } from 'firebase/firestore';

export class RegisterUser {
	#userUsername: string;
    #userEmail: string;
    #userPassword: string;
	#isPremiumUser: boolean;
	#createdAt: FieldValue;
	#uid: string | null;

	static defaultBooks: string[] = ["3I_ODwAAQBAJ"];

	constructor(
		userUsername: string,
		userEmail: string,
		userPassword: string,
		isPremiumUser: boolean = false
	) {
		this.#userUsername = userUsername;
        this.#userEmail = userEmail;
        this.#userPassword = userPassword;
		this.#isPremiumUser = isPremiumUser;
		this.#createdAt = serverTimestamp();
		this.#uid = null;
    }

	get userUsername() { return this.#userUsername }
	get userEmail() { return this.#userEmail }
	get userPassword() { return this.#userPassword }

	toFirestoreObject() {
        return {
            uid: this.#uid,
            email: this.#userEmail,
            displayName: this.#userUsername,
            displayName_lowercase: this.#userUsername.toLowerCase(),
            storedBookIds: RegisterUser.defaultBooks,
			userChatHistorial: [],
            createdAt: this.#createdAt,
			isPremiumUser: this.#isPremiumUser
        };
	}
}
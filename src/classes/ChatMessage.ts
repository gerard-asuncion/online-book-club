import { serverTimestamp } from 'firebase/firestore';
import type { FieldValue } from 'firebase/firestore';

export class ChatMessage {
    
    readonly #text: string;
    readonly #username: string | null | undefined;
    readonly #userUid: string | undefined;
    readonly #room: string |null;
    readonly #bookTitle: string | null;
    readonly #bookAuthors: string[];
    readonly #seenBy: (string | undefined)[];
    readonly #createdAt: FieldValue;

    constructor(
        messageText: string,
        username: string | null | undefined,
        userUid: string | undefined,
        bookId: string | null,
        bookTitle: string | null,
        bookAuthors: string[]
    ) {
        this.#text = messageText;
        this.#username = username ?? "unknown_user"
        this.#userUid = userUid;
        this.#room = bookId;
        this.#bookTitle = bookTitle;
        this.#bookAuthors = bookAuthors;
        this.#seenBy = [ this.#userUid ];
        this.#createdAt = serverTimestamp();
    }

    toFirestoreObject() {
        return {
            text: this.#text,
            createdAt: this.#createdAt,
            username: this.#username,
            userUid: this.#userUid,
            room: this.#room,
            bookTitle: this.#bookTitle,
            bookAuthors: this.#bookAuthors,
            seenBy: this.#seenBy
        }
    }
}
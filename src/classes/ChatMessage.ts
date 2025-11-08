import { serverTimestamp } from 'firebase/firestore';
import type { FieldValue } from 'firebase/firestore';

export class ChatMessage {
    
    #text: string;
    #username: string | null | undefined;
    #userUid: string | undefined;
    #room: string |null;
    #bookTitle: string | null;
    #bookAuthors: string[];
    #seenBy: (string | undefined)[];
    #createdAt: FieldValue;

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
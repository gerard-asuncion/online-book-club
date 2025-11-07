import { serverTimestamp } from 'firebase/firestore';
import type { FieldValue } from 'firebase/firestore';

export class ChatMessage {
    
    #text: string;
    #username: string | null;
    #userId: string | null;
    #room: string |null;
    #bookTitle: string | null;
    #bookAuthors: string[];
    #seenBy: (string | null)[];
    #createdAt: FieldValue;

    constructor(
        messageText: string,
        username: string | null,
        userId: string | null,
        bookId: string | null,
        bookTitle: string | null,
        bookAuthors: string[]
    ) {
        this.#text = messageText;
        this.#username = username ?? "unknown_user"
        this.#userId = userId;
        this.#room = bookId;
        this.#bookTitle = bookTitle;
        this.#bookAuthors = bookAuthors;
        this.#seenBy = [ this.#userId ];
        this.#createdAt = serverTimestamp();
    }

    toFirestoreObject() {
        return {
            text: this.#text,
            createdAt: this.#createdAt,
            username: this.#username,
            userId: this.#userId,
            room: this.#room,
            bookTitle: this.#bookTitle,
            bookAuthors: this.#bookAuthors,
            seenBy: this.#seenBy
        }
    }
}
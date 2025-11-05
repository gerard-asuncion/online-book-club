import type { Timestamp } from "firebase/firestore";

export interface Message {
    id: string,
    text: string,
    createdAt: Timestamp | Date,
    user: string,
    userId: string,
    room: string,
    bookTitle: string,
    bookAuthors: string[],
    seenBy: string[];
}

export interface CookieOptions {
    path: string,
    maxAge: number;
}
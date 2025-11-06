import type { Timestamp } from "firebase/firestore";

export interface UserProfile {
    uid: string,
    email: string,
    displayName: string,
    displayName_lowercase: string,
    storedBookIds: string[],
    userChatHistorial: string[],
    createdAt: Timestamp;
}

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

export type ErrorType = {
    input?: string,
    message: string 
}
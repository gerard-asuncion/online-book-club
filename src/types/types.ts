import type { Timestamp } from "firebase/firestore";
import type { FieldValue } from "firebase/firestore/lite";

export interface UserProfileType {
    uid: string | null,
    email: string,
    displayName: string,
    displayName_lowercase: string,
    storedBookIds: string[],
    userChatHistorial: string[],
    createdAt: FieldValue | Timestamp;
}

export interface CookieOptions {
    path: string,
    maxAge: number;
}

export type ErrorType = {
    input?: string,
    message: string 
}
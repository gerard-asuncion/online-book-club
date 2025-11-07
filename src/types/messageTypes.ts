import type { Timestamp, FieldValue } from "firebase/firestore";

export interface ChatMessageData {
    text: string,
    username: string | null,
    userId: string | null,  
    room: string | null,
    bookTitle: string | null,
    bookAuthors: string[]
}

export interface MessageToFirestore extends ChatMessageData {
    createdAt: FieldValue;
    seenBy: (string | null)[];
}

export interface SentMessage extends ChatMessageData {
    createdAt: Timestamp,
    id: string;
}
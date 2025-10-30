import type { Timestamp } from "firebase/firestore";

export interface Message {
    id: string,
    text: string,
    createdAt: Timestamp | Date,
    user: string,
    userId: string,
    room: string;
}
import type { FieldValue } from "firebase/firestore"

export interface Message {
    id: string,
    text: string,
    createdAt: FieldValue,
    user: string,
    userId: string,
    room: string
}
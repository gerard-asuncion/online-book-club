import { onAuthStateChanged, type Unsubscribe, type User } from "firebase/auth";
import { auth } from '../firebase-config';

export const getCurrentUser = ():  Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe: Unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                unsubscribe();
                resolve(user);
            },
            reject
        )
    })
}
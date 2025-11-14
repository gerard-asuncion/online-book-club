import { useEffect } from 'react';
import { doc, onSnapshot, DocumentReference, type DocumentData } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useAppSelector } from '../app/hooks';
import { selectUserProfileStoredBooks, selectUserProfilePremium } from '../features/userProfile/userProfileSelectors';
import useUserData from './useUserData';
import { compareArrayItems } from "../utils/utils";
import type { User } from 'firebase/auth';
import type { UserProfileType } from '../types/types';
import type { BookItem } from '../types/booksTypes';

const USERS_COLLECTION: string = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;

const useRealtimeProfileSync = () => {

    const user: User | null = auth.currentUser;
    const userUid: string | undefined = user?.uid;

    const userStoredBooks: BookItem[] = useAppSelector(selectUserProfileStoredBooks);
    const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);

    const { storeIsPremiumUser, storeBooksById } = useUserData();

    useEffect(() => {
        if (!userUid) return;

        const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, USERS_COLLECTION, userUid);
        
        const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
                const profileData: UserProfileType = docSnap.data() as UserProfileType;
                const userProfileBookIds: string[] = profileData.storedBookIds || [];
                const isPremiumUserDB: boolean = profileData.isPremiumUser || false;

                const storedBooksIds: string[] = userStoredBooks.map(book => book.id);

                const compareBookIds: boolean = compareArrayItems(userProfileBookIds, storedBooksIds);

                if(isPremiumUserDB && isPremiumUserDB !== isPremiumUser){
                    storeIsPremiumUser(isPremiumUserDB); 
                }    
                if(userProfileBookIds && !compareBookIds){
                    storeBooksById(profileData);   
                } 
            }
        });

        return () => unsubscribe(); 

    }, [userUid]);

    return { };
}

export default useRealtimeProfileSync;
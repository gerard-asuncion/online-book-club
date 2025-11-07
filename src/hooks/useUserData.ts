import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import type { User } from 'firebase/auth';
import type { UserProfileType } from '../types/types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
    setUserProfileUid, 
    setUserProfileUsername,
    fetchStoredBooks,
    clearUserProfile, 
    clearAllStoredBooks
} from '../features/userProfile/userProfileSlice';
import type { BookItem } from '../types/booksTypes';
import { selectUserProfileStoredBooks } from '../features/userProfile/userProfileSelectors';

const USERS_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;

const useUserData = () => {

    const dispatch = useAppDispatch();

    const userStoredBooks: BookItem[] = useAppSelector(selectUserProfileStoredBooks);

    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

    const storeBooksById = async (userId: string | undefined) => {
        
        try {
            if(!userId) throw new Error("User ID not found.");

            const userDocRef = doc(db, USERS_COLLECTION, userId);
            const docSnap = await getDoc(userDocRef);

            if(!docSnap.exists()) throw new Error("Unable to find user in database.");

            const profileData = docSnap.data() as UserProfileType;
            const bookIds = profileData.storedBookIds || [];

            bookIds.length > 0
            ? dispatch(fetchStoredBooks(bookIds))
            : dispatch(clearAllStoredBooks());

        } catch (error) {
            console.error("Error fetching user stored books:", error);
        }
    }

    const addBookToProfile = async (bookIdToAdd: string): Promise<void> => {
        
        const userId: string | undefined = auth.currentUser?.uid;

        if (!userId) {
            console.error("No user is logged in to perform this action.");
            return;
        }
        if(userStoredBooks.length >= 3) return alert("You can't store more than 3 books. Please, remove some. In 'settings' you can recover any chat where you have written.");

        try {
            const userDocRef = doc(db, USERS_COLLECTION, userId);
            await updateDoc(userDocRef, {
            storedBookIds: arrayUnion(bookIdToAdd)
            });
            storeBooksById(userId);  
        } catch (error) {
            console.error("Error adding book to profile:", error);
        }               
    }

    const removeBookFromProfile = async (bookIdToRemove: string): Promise<void> => {
        
        const userId: string | undefined = auth.currentUser?.uid;
        
        if (!userId) {
            console.error("No user is logged in to perform this action.");
            return;
        }

        try {
            const userDocRef = doc(db, USERS_COLLECTION, userId);
            await updateDoc(userDocRef, {
                storedBookIds: arrayRemove(bookIdToRemove) //
            });
            storeBooksById(userId);

        } catch (error) {
            console.error("Error removing book from profile:", error);
        }
    };

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
            
            setIsLoadingUser(true);

            if (user) {
                dispatch(setUserProfileUid({ userProfileUid: user.uid }));
                dispatch(setUserProfileUsername({ userProfileUsername: user.displayName }));
                storeBooksById(user.uid);
            } else {
                dispatch(clearUserProfile());
            }
            
            setIsLoadingUser(false);
        });

        return () => unsubscribe();
        
    }, [dispatch]);

    return { isLoadingUser, addBookToProfile, removeBookFromProfile };
};

export default useUserData;
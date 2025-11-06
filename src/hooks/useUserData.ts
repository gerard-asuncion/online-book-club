import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import type { User } from 'firebase/auth';
import type { UserProfile } from '../types/types';
import { useAppDispatch } from '../app/hooks';
import { 
    setUserProfileUid, 
    fetchStoredBooks,
    clearUserProfile 
} from '../features/userProfile/userProfileSlice';

const USERS_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;

const useUserData = () => {

    const dispatch = useAppDispatch();

    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

    const storeBooksById = async (userId: string | undefined) => {

        if(userId){

            const userDocRef = doc(db, USERS_COLLECTION, userId);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const profileData = docSnap.data() as UserProfile;
                const bookIds = profileData.storedBookIds || [];

                if (bookIds.length > 0) {
                    dispatch(fetchStoredBooks(bookIds));
                }
                console.log("Stored books actualized by id from firebase");
            } else {

                console.log("This user doesn't exist in database.")
            }
        }
    }

    const removeBookFromProfile = async (bookIdToRemove: string): Promise<void> => {
        
        const userId: string | undefined = auth.currentUser?.uid;
        
        if (!userId) {
            console.error("No user is logged in to perform this action.");
            return;
        }

        try {

            console.log(`Attempting to remove book ${bookIdToRemove} from user ${userId}...`);
            
            const userDocRef = doc(db, USERS_COLLECTION, userId);

            await updateDoc(userDocRef, {
                storedBookIds: arrayRemove(bookIdToRemove) //
            });

            console.log("Book removed from Firestore successfully.");

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
                storeBooksById(user.uid);

            } else {
                dispatch(clearUserProfile());
            }
            
            setIsLoadingUser(false);
        });

        return () => unsubscribe();
        
    }, [dispatch]);

    return { isLoadingUser, removeBookFromProfile, storeBooksById };
};

export default useUserData;
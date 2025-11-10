import * as Sentry from "@sentry/react";
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion, DocumentReference, type DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import type { UserProfileType } from '../types/types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
    setUserProfileUid,
    setUserProfileUsername,
    setUserProfilePremium,
    fetchStoredBooks,
    clearAllStoredBooks
} from '../features/userProfile/userProfileSlice';
import type { BookItem } from '../types/booksTypes';
import { 
    selectUserProfileStoredBooks, 
    selectUserProfilePremium 
} from '../features/userProfile/userProfileSelectors';
import { useCallback } from 'react';
import { ProfileDataError, AutoUpdateUserDataError } from '../classes/Errors/CustomErrors';

const USERS_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;

const useUserData = () => {

    const dispatch = useAppDispatch();

    const userProfileUid: string | undefined = auth.currentUser?.uid

    const userStoredBooks: BookItem[] = useAppSelector(selectUserProfileStoredBooks);
    const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);

    const getProfileData = async (): Promise<UserProfileType | null> => {
        try {
            if(!userProfileUid) throw new ProfileDataError("User ID not provided by Firebase Auth.");

            const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, USERS_COLLECTION, userProfileUid);
            const docSnap: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(userDocRef);

            if(!docSnap.exists()) throw new ProfileDataError("Unable to find user in database.");

            const profileData: UserProfileType = docSnap.data() as UserProfileType;

            return profileData;

        } catch (error) {
            Sentry.captureException(error);
            if(import.meta.env.DEV) console.error("Error fetching profile data:", error);
            return null;
        }
    }

    const storeUidUser = async (userUid: string | null): Promise<void> => { 
        try {
            if(!userUid) throw new ProfileDataError(`User Uid is ${userUid}. It wasn't found in ProfileData (user's document in DB). If there are more errors about user's Uid, consider auth.currentUser or redux as the source of the problem.`);
            dispatch(setUserProfileUid({ userProfileUid: userUid }));

        } catch (error) {
            Sentry.captureException(error);
            if(import.meta.env.DEV) console.error("Error dispatching user uid info from db:", error);
        }
    };

    const storeBooksById = async (profileData: UserProfileType | null): Promise<void> => {    
        try {
            if(!profileData) throw new ProfileDataError("Profile data could not be retrieved in storeBooksById.");
            const bookIds: string[] = profileData.storedBookIds || [];
            if (bookIds.length > 0) {
                dispatch(fetchStoredBooks(bookIds));
            } else {
                dispatch(clearAllStoredBooks());
            }
        } catch (error) {
            Sentry.captureException(error);
            if(import.meta.env.DEV) console.error("Error fetching user stored books:", error);
        }
    }

    const storeUsernameUser = async (userUsername: string | null): Promise<void> => { 
        try {
            if(!userUsername) throw new ProfileDataError("Error fetching username from DB.");
            dispatch(setUserProfileUsername({ userProfileUsername: userUsername }));

        } catch (error) {
            Sentry.captureException(error);
            if(import.meta.env.DEV) console.error("Error dispatching user username info from db:", error);
        }
    }

    const storeIsPremiumUser = async (isPremiumUserDB: boolean): Promise<void> => { 
        try {
            if(!isPremiumUserDB) throw new ProfileDataError("Error fetching premium user boolean from DB.");
            dispatch(setUserProfilePremium({ userProfilePremium: isPremiumUserDB }));

        } catch (error) {
            Sentry.captureException(error);
            if(import.meta.env.DEV) console.error("Error dispatching premium info from db:", error);
        }
    }

    const addBookToProfile = async (bookIdToAdd: string): Promise<void> => {     
        if (!userProfileUid) throw new ProfileDataError("No user is logged in to perform this action.");
        if(userStoredBooks.length >= 3) return alert("You can't store more than 3 books. Please, remove some. In 'settings' you can recover any chat where you have written.");
        if(!isPremiumUser) return alert("Only premium users can store books. Please, upgrade your account.");
        try {
            const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, USERS_COLLECTION, userProfileUid);
            await updateDoc(userDocRef, {
                storedBookIds: arrayUnion(bookIdToAdd)
            });
            const profileData: UserProfileType | null = await getProfileData();
            storeBooksById(profileData);
        } catch (error) {
            Sentry.captureException(error);
            if(import.meta.env.DEV) console.error("Error adding book to profile:", error);
        }
    }

    const removeBookFromProfile = async (bookIdToRemove: string, isPremiumUser: boolean): Promise<void> => {           
        if (!userProfileUid) {
            console.error("No user is logged in to perform this action.");
            return;
        }
        if(!isPremiumUser) return;
        try {
            const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, USERS_COLLECTION, userProfileUid);
            await updateDoc(userDocRef, {
                storedBookIds: arrayRemove(bookIdToRemove)
            });
            const profileData: UserProfileType | null = await getProfileData();
            storeBooksById(profileData);

        } catch (error) {
            Sentry.captureException(error);
            if(import.meta.env.DEV) console.error("Error removing book from profile:", error);
        }
    };

    const activatePremiumMode = async (): Promise<void> => {
        if(isPremiumUser) return;
        if(userProfileUid){
            const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, USERS_COLLECTION, userProfileUid);
            await updateDoc(userDocRef, {
                isPremiumUser: true
            });
        }
        dispatch(setUserProfilePremium({ userProfilePremium: true }));
        alert("Premium mode activated.");
    }

    const disablePremiumMode = async (): Promise<void> => {
        if(!isPremiumUser) return;
        if(userProfileUid){
            const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, USERS_COLLECTION, userProfileUid);
            await updateDoc(userDocRef, {
                isPremiumUser: false
            });
        }  
        dispatch(setUserProfilePremium({ userProfilePremium: false }));
        alert("Premium mode deactivated.");
    }

    const autoUpdateUserData = useCallback(async (): Promise<void> => {
        try {
            const profileData: UserProfileType | null = await getProfileData();
            
            if(!profileData) throw new AutoUpdateUserDataError("Failed automatic profile data fetch at first app loading.");

            const userProfileDataUid: string | null = profileData.uid;
            const userProfileDataUsername: string | null = profileData.displayName;
            const isPremiumUserDB: boolean = profileData.isPremiumUser || false;

            storeUidUser(userProfileDataUid);
            storeUsernameUser(userProfileDataUsername);
            storeIsPremiumUser(isPremiumUserDB);
            storeBooksById(profileData);

        }catch(error){
            Sentry.captureException(error);
            if(import.meta.env.DEV) console.error("Error in autoUpdateUserData:", error);
        }
    }, []);

    return { 
        addBookToProfile, 
        removeBookFromProfile,
        getProfileData,
        storeBooksById, 
        storeIsPremiumUser,
        activatePremiumMode,
        disablePremiumMode,
        autoUpdateUserData
    };
};

export default useUserData;
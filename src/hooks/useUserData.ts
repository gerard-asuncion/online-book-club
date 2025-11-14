import * as Sentry from "@sentry/react";
import usePageNavigation from "./usePageNavigation";
import { 
    doc, 
    getDoc, 
    updateDoc, 
    arrayRemove, 
    arrayUnion, 
    DocumentReference, 
    type DocumentData, DocumentSnapshot 
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import type { UserProfileType } from '../types/types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
    setUserProfilePremium,
    fetchStoredBooks,
    clearAllStoredBooks
} from '../features/userProfile/userProfileSlice';
import type { BookItem } from '../types/booksTypes';
import { 
    selectUserProfileStoredBooks, 
    selectUserProfilePremium 
} from '../features/userProfile/userProfileSelectors';
import { ProfileDataError } from '../classes/CustomErrors';

const USERS_COLLECTION: string = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;

const useUserData = () => {

    const { navigateToUserDataError } = usePageNavigation();

    const dispatch = useAppDispatch();

    const userAuthUid: string | undefined = auth.currentUser?.uid

    const userStoredBooks: BookItem[] = useAppSelector(selectUserProfileStoredBooks);
    const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);

    const getProfileData = async (): Promise<UserProfileType | null> => {
        if(!userAuthUid) return null;
        try {
            const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, USERS_COLLECTION, userAuthUid);
            const docSnap: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(userDocRef);

            if(!docSnap.exists()){
                navigateToUserDataError();
                throw new ProfileDataError(`User with uid: ${userAuthUid} is not in database, please check in Firebase.`);
            }

            const profileData: UserProfileType = docSnap.data() as UserProfileType;

            return profileData;

        } catch (error) {
            Sentry.captureException(error);
            if(import.meta.env.DEV) console.error("Error fetching profile data:", error);
            return null;
        }
    }

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
        if (!userAuthUid) throw new ProfileDataError("No user is logged in to perform this action.");
        if(userStoredBooks.length >= 5) return alert("You can't store more than 5 books. Please, remove some. In 'settings' you can recover any chat where you have written.");
        if(!isPremiumUser) return alert("Only premium users can store books. Please, upgrade your account.");
        try {
            const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, USERS_COLLECTION, userAuthUid);
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
        if (!userAuthUid) {
            console.error("No user is logged in to perform this action.");
            return;
        }
        if(!isPremiumUser) return;
        try {
            const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, USERS_COLLECTION, userAuthUid);
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
        if(userAuthUid){
            const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, USERS_COLLECTION, userAuthUid);
            await updateDoc(userDocRef, {
                isPremiumUser: true
            });
        }
        dispatch(setUserProfilePremium({ userProfilePremium: true }));
        alert("Premium mode activated.");
    }

    const disablePremiumMode = async (): Promise<void> => {
        if(!isPremiumUser) return;
        if(userAuthUid){
            const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, USERS_COLLECTION, userAuthUid);
            await updateDoc(userDocRef, {
                isPremiumUser: false
            });
        }  
        dispatch(setUserProfilePremium({ userProfilePremium: false }));
        alert("Premium mode deactivated.");
    }

    const markDeletedProfile = async (): Promise<boolean> => {
        let status = false;
        try {
            if(userAuthUid){
                const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, USERS_COLLECTION, userAuthUid);
                const docSnap: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(userDocRef);
                if(!docSnap.exists()) throw new ProfileDataError("Unable to find user in database in order to mark it as deleted.");
                await updateDoc(userDocRef, {
                    isDeleted: true
                });
                const docSnapConfirm: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(userDocRef);
                const profileData: UserProfileType = docSnapConfirm.data() as UserProfileType;
                if(profileData.isDeleted){
                    status = true;
                }
            }   
            if(status) alert("Deleted.");
        } catch(error){
            Sentry.captureException(error);
            if(import.meta.env.DEV) console.error("Error actualizing user's profile to mark it as deleted:", error);     
        } finally {
            console.log("markdeletedprofile")
        }    
        return status;
    }

    return { 
        addBookToProfile, 
        removeBookFromProfile,
        getProfileData,
        storeBooksById, 
        storeIsPremiumUser,
        activatePremiumMode,
        disablePremiumMode,
        markDeletedProfile
    };
};

export default useUserData;
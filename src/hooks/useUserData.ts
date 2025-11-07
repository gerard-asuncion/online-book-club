import { doc, getDoc, updateDoc, arrayRemove, arrayUnion, DocumentReference, type DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import type { UserProfileType } from '../types/types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
    setUserProfilePremium,
    fetchStoredBooks,
    clearAllStoredBooks
} from '../features/userProfile/userProfileSlice';
import type { BookItem } from '../types/booksTypes';
import { selectUserProfileStoredBooks, selectUserProfilePremium } from '../features/userProfile/userProfileSelectors';

const USERS_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;

const useUserData = () => {

    const dispatch = useAppDispatch();

    const userUid: string | undefined = auth.currentUser?.uid;
    const userStoredBooks: BookItem[] = useAppSelector(selectUserProfileStoredBooks);
    const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);

    const getProfileData = async (): Promise<UserProfileType | null> => {
        try {
            if(!userUid) throw new Error("User ID not found.");

            const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, USERS_COLLECTION, userUid);
            const docSnap: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(userDocRef);

            if(!docSnap.exists()) throw new Error("Unable to find user in database.");

            const profileData: UserProfileType = docSnap.data() as UserProfileType;

            return profileData;

        } catch (error) {
            console.error("Error fetching profile data:", error);
            return null;
        }
    }

    const storeBooksById = async (profileData: UserProfileType | null): Promise<void> => {    
        try {
            if(!profileData) throw new Error("Profile data could not be retrieved.");

            const bookIds: string[] = profileData.storedBookIds || [];

            bookIds.length > 0
            ? dispatch(fetchStoredBooks(bookIds))
            : dispatch(clearAllStoredBooks());

        } catch (error) {
            console.error("Error fetching user stored books:", error);
        }
    }

    const storeIsPremiumUser = async (profileData: UserProfileType | null): Promise<void> => { 
        try {
            if(!profileData) throw new Error("Profile data could not be retrieved.");
            const isPremiumUserDB: boolean = profileData.isPremiumUser || false;
            dispatch(setUserProfilePremium({ userProfilePremium: isPremiumUserDB }));

        } catch (error) {
            console.error("Error dispatching premium info from db:", error);
        }
    }

    const addBookToProfile = async (bookIdToAdd: string): Promise<void> => {
        
        if (!userUid) return console.error("No user is logged in to perform this action.");
        if(userStoredBooks.length >= 3) return alert("You can't store more than 3 books. Please, remove some. In 'settings' you can recover any chat where you have written.");
        if(!isPremiumUser) return alert("Only premium users can store books. Please, upgrade your account.");
        try {
            const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, USERS_COLLECTION, userUid);
            await updateDoc(userDocRef, {
                storedBookIds: arrayUnion(bookIdToAdd)
            });
            const profileData: UserProfileType | null = await getProfileData();
            storeBooksById(profileData);
        } catch (error) {
            console.error("Error adding book to profile:", error);
        }               
    }

    const removeBookFromProfile = async (bookIdToRemove: string, isPremiumUser: boolean): Promise<void> => {
        
        const userUid: string | undefined = auth.currentUser?.uid;
        
        if (!userUid) {
            console.error("No user is logged in to perform this action.");
            return;
        }
        if(!isPremiumUser) return;

        try {
            const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, USERS_COLLECTION, userUid);
            await updateDoc(userDocRef, {
                storedBookIds: arrayRemove(bookIdToRemove) //
            });
            const profileData: UserProfileType | null = await getProfileData();
            storeBooksById(profileData);

        } catch (error) {
            console.error("Error removing book from profile:", error);
        }
    };

    const activatePremiumMode = async (): Promise<void> => {
        if(isPremiumUser) return;
        if(userUid){
            const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, USERS_COLLECTION, userUid);
            await updateDoc(userDocRef, {
                isPremiumUser: true
            });
        }
        dispatch(setUserProfilePremium({ userProfilePremium: true }));
        alert("Premium mode activated.");
    }

    const disablePremiumMode = async (): Promise<void> => {
        if(!isPremiumUser) return;
        if(userUid){
            const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, USERS_COLLECTION, userUid);
            await updateDoc(userDocRef, {
                isPremiumUser: false
            });
        }  
        dispatch(setUserProfilePremium({ userProfilePremium: false }));
        alert("Premium mode deactivated.");
    }

    const autoUpdateUserData = async (): Promise<void> => {
        const profileData: UserProfileType | null = await getProfileData();
        storeIsPremiumUser(profileData);
        storeBooksById(profileData);
    }

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
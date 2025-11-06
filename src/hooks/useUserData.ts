import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import type { User } from 'firebase/auth';
import type { UserProfile } from '../types/types';
import { useAppDispatch } from '../app/hooks';

// Importa TOTES les accions que necessitaràs
import { 
    setUserProfileUid, 
    setUserProfileStoredBookIds, 
    fetchStoredBooks,
    clearUserProfile 
} from '../features/userProfile/userProfileSlice';

// El nom de la teva col·lecció (assegura't que coincideixi amb la imatge, ex: 'obc-users-db')
const USERS_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;

/**
 * Hook observador que s'executa un cop a l'arrel de l'app.
 * Sincronitza l'estat d'autenticació de Firebase (Auth i Firestore) amb Redux.
 */
const useUserData = () => {

    const dispatch = useAppDispatch();
    
    // Encara mantenim 'isLoadingUser' com un estat local,
    // ja que és útil per a la UI principal.
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

    useEffect(() => {

        // Aquesta és la funció 'unsubscribe' que esmentaves.
        // S'executa quan l'aplicació es tanca o el component es desmunta.
        const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
            
            setIsLoadingUser(true);

            if (user) {
                // --- 1. Usuari ha iniciat sessió ---
                
                // (Ja ho fas a 'useAuth', però ho reforcem aquí)
                dispatch(setUserProfileUid({ userProfileUid: user.uid }));

                // --- 2. Busca el document a Firestore ---
                const userDocRef = doc(db, USERS_COLLECTION, user.uid);
                const docSnap = await getDoc(userDocRef);

                if (docSnap.exists()) {
                    // --- 3. El document existeix ---
                    const profileData = docSnap.data() as UserProfile;
                    const bookIds = profileData.storedBookIds || [];

                    if (bookIds.length > 0) {
                        dispatch(fetchStoredBooks(bookIds));
                    }
                    console.log("User profile loaded from Firestore.");

                } else {
                    console.warn("User is authenticated but no Firestore document was found.");
                    dispatch(clearUserProfile());
                }

            } else {
                // --- 6. Usuari ha tancat sessió ---
                // 'useAuth' ja ho gestiona al 'logout', 
                // però això captura expiracions de sessió.
                dispatch(clearUserProfile());
            }
            
            setIsLoadingUser(false);
        });

        // Retorna la funció 'unsubscribe' perquè s'executi en desmuntar
        return () => unsubscribe();
        
    }, [dispatch]); // El 'dependency array' només necessita 'dispatch'

    // Retorna l'estat de càrrega perquè la teva App pugui mostrar un 'spinner'
    return { isLoadingUser };
};

export default useUserData;
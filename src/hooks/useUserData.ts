import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import type { User } from 'firebase/auth';
import type { UserProfile } from '../types/types';

const USERS_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;

const useUserData = () => {

    const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
    
    // 4. AFEGEIX UN NOU ESTAT PER AL PERFIL DE FIRESTORE
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

    useEffect(() => {
        
        // 5. Converteix la funció 'onAuthStateChanged' en 'async'
        const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
            
            setIsLoadingUser(true); // Activem la càrrega

            if (user) {
                // --- Usuari ha iniciat sessió ---
                setCurrentUser(user); // Guarda l'usuari d'Auth

                // 6. BUSCA EL DOCUMENT A FIRESTORE
                // Crea la referència al document
                const userDocRef = doc(db, USERS_COLLECTION, user.uid);
                
                // Demana el document
                const docSnap = await getDoc(userDocRef);

                if (docSnap.exists()) {
                    // 7. Si existeix, guarda les dades del perfil
                    setUserProfile(docSnap.data() as UserProfile);
                    console.log("User profile loaded from Firestore.");
                } else {
                    // Això no hauria de passar si el registre va bé,
                    // però és bo controlar-ho
                    console.warn("User is authenticated but no Firestore document was found.");
                    setUserProfile(null);
                }
            } else {
                // --- Usuari ha tancat sessió ---
                setCurrentUser(null);
                setUserProfile(null); // Neteja el perfil
            }
            
            setIsLoadingUser(false);
        });

        return () => unsubscribe();
        
    }, []);


    return { currentUser, userProfile, isLoadingUser };
};

export default useUserData;
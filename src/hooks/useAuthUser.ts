// hooks/useAuthUser.ts
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config'; // La teva configuració
import type { User } from 'firebase/auth';

const useAuthUser = () => {
    // Un estat per desar l'usuari
    const [user, setUser] = useState<User | null>(auth.currentUser);
    // Un estat per saber si la comprovació inicial ha acabat
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Aquest listener s'actualitzarà si l'usuari fa login/logout
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsLoading(false);
        });

        // Neteja la subscripció quan el component es desmunta
        return () => unsubscribe();
    }, []);

    return { user, isLoading };
};

export default useAuthUser;
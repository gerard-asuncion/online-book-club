import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';
import type { User } from 'firebase/auth';

const useAuthUser = () => {

    const [user, setUser] = useState<User | null>(auth.currentUser);

    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            setUser(user);
            setIsLoadingUser(false);
        });

        return () => unsubscribe();
        
    }, []);

    return { user, isLoadingUser };
};

export default useAuthUser;
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import '../firebase';



const AuthContext = React.createContext();


export function useAuth() {
    return useContext(AuthContext);

}

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const auth = getAuth();
        const unsubrscibe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false)
        })

        return unsubrscibe;
    }, [])

    // signup function
    async function signup(email, password, username) {
        const Auth = getAuth();
        await createUserWithEmailAndPassword(Auth, email, password);
        console.log(username)
        // updade profile
        await updateProfile(Auth.currentUser, {
            displayName: username

        })

        const user = Auth.currentUser;
        setCurrentUser({ ...user })
        console.log(currentUser.displayName)


    }
    // login function 
    async function login(email, password) {
        const auth = getAuth();
        return await signInWithEmailAndPassword(auth, email, password);

    }
    // logout function 
    function logout() {
        const auth = getAuth();
        return signOut(auth);
    }

    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
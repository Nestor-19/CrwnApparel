
import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocument } from "../utils/firebase/firebase";

// object you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider =  ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    // value is an object that holds the current state (currentUser) and the function to update it (setCurrentUser). 
    // This object is what will be passed down the component tree.
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocument(user);
            }
            console.log(user);
            setCurrentUser(user);
        })
        
        // Cleanup subscription on unmount
        return unsubscribe;
    }, [])
    // ^^ [] represents the dependency array
    // the empty array tells React that the effect should only run once, after the component is mounted.
    // This effect runs after the component is first rendered on the screen

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

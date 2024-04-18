import { initializeApp } from 'firebase/app';
import {getAuth, 
        signInWithRedirect, 
        GoogleAuthProvider, 
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged
      } from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    promt: "select_account"
  })

  export const auth = getAuth();

  export const signInWithGoogleRedirect = ()  => signInWithRedirect(auth, googleProvider);
  
  export const db = getFirestore();

  export const createUserDocument = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) {return;}
    
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    
    if (!userSnapshot.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInfo
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userDocRef;
  }

  export const createUserWithEmailAndPass = async (email, password) => {
    if (!email || !password) {return;}

    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInWithEmailAndPass = async (email, password) => {
    if (!email || !password) {return;}

    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

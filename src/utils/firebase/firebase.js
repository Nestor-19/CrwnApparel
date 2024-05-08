import { initializeApp } from 'firebase/app';
import {
        getAuth, 
        GoogleAuthProvider, 
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
        signInWithPopup
      } from 'firebase/auth';

import {
        getFirestore, 
        doc, 
        getDoc, 
        setDoc,
        collection,
        writeBatch,
        query,
        getDocs
      } from 'firebase/firestore';

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

  export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider);
  
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

    return userSnapshot;
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

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    })

    await batch.commit();
  }

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const {title, items} = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})

    return categoryMap;
  }

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
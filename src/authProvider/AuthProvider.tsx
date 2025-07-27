import React, { createContext, useEffect, useState, ReactNode } from "react";
import {
  GoogleAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";

// 👉 Define what the context will hold
interface AuthContextType {
  user: User | null;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  googleLogin: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
  updateUserProfile: (name: string, photo: string) => Promise<void>;
}

// 👉 Create context with default `null` (we’ll handle it via Provider)
export const MyContext = createContext<AuthContextType | null>(null);
const googleProvider = new GoogleAuthProvider();

// 👉 Props for the Provider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // user can be null or a firebase User
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name: string, photo: string) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    }
    return Promise.reject("No user is currently signed in");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo: AuthContextType = {
    createUser,
    signIn,
    googleLogin,
    logOut,
    updateUserProfile,
    loading,
    user,
  };

  return <MyContext.Provider value={authInfo}>{children}</MyContext.Provider>;
};

export default AuthProvider;

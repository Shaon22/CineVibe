import { createContext, useEffect } from "react";
import { useState } from "react";
import {GoogleAuthProvider,createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth"
import auth from "../Firebase/Firebase.config";
export const MyContext=createContext(null)
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user,setUser]=useState([])
    const [loading,setLoading]=useState(true)

    const createUser=(email,password)=>{
        setLoading(false)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn=(email,password)=>{
        setLoading(false)
        return signInWithEmailAndPassword(auth,email,password,)
    }

    const googleLogin=()=>{
        setLoading(false)
        return signInWithPopup(auth,googleProvider)
    }

    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile=(name,photo)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photo
        })
    }
    

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
            return
        })
        return ()=>{
           unsubscribe() 
        } 
    },[])

    const authInfo={
        createUser,
        signIn,
        googleLogin,
        logOut,
        updateUserProfile,
        loading,
        user
    }
    return (
       <MyContext.Provider value={authInfo}>
        {children}
       </MyContext.Provider>
    );
};

export default AuthProvider;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState,useRef } from "react";

export const AuthContext = createContext({
    token:"",
    username:"",
    UID:"",
    setUser:(user)=>{},
    signedHandler:(token) =>{},
    isLoggedIn:false,
    logout:()=>{},

})

export default function AuthContextProvider ({children}){

    const [idToken,setTokensId] = useState("")
    const [name,setName] = useState("")
    const [UID,setUID] = useState("")


    async function userSetter (user) {
        setName(user.displayName)
        const token =  await user.getIdToken();
        setTokensId(token)
        setUID(user.uid)
        AsyncStorage.setItem("token",token)
        AsyncStorage.setItem("uid",user.uid)
        AsyncStorage.setItem("username",user.displayName)
    }

    async function reLogSetter (token,uid,username) {
        setTokensId(token)
        setName(username)
        setUID(uid)
        AsyncStorage.setItem("token",token)
        AsyncStorage.setItem("uid",uid)
        AsyncStorage.setItem("username",username)
    }

    function logoutHandler(){
        setTokensId(null)
        setName(null)
        setUID(null)
        AsyncStorage.removeItem("token")
        AsyncStorage.removeItem("uid")
        AsyncStorage.removeItem("username")
    }

    const values = {
        token:idToken,
        username:name,
        UID,
        signedHandler:reLogSetter,
        setUser:userSetter,
        isLoggedIn:!!idToken,
        logout:logoutHandler,

    }

    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )


}
import { useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import Cookies from "js-cookie"
import { verifyToken } from "../utils/auth/auth.api"
const AuthProvider = ({children})=>{
    const [userData, setUserData]=useState(null)
    const [loading,setLoading]= useState(true)

    console.log(userData)

    useEffect(()=>{
        checkLogin(setLoading, setUserData)
    },[])

    return <AuthContext.Provider value={{ userData, setUserData, loading}}>{children}</AuthContext.Provider>
}

const checkLogin =async (setLoading,setUserData)=>{
    const cookies = Cookies.get()
    if(!cookies.token){
        setLoading(false)
        return
    }

    try {
        const data = await verifyToken()
        if(!data){
            setLoading(false)
            return
        }
        console.log(data)
        setUserData(data)
        setLoading(false)

    } catch (error) {
        console.error('Error verifying token:', error);
    }
    
}


export default AuthProvider
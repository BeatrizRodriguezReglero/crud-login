import Cookies from "js-cookie"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

const Logout=()=>{
    const {setUserData}=useContext(AuthContext)
    const navigate=useNavigate()
    
    return <button onClick={()=>logout(setUserData,navigate)}>Logout</button>
}
const logout=(setUserData,navigate)=>{

    Cookies.remove('token')
    setUserData(null)
    navigate('/')
    

}
export default Logout
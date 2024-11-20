import { useContext } from "react"
import Menu from "../menu/Menu"
import { AuthContext } from "../../contexts/AuthContext"
import Logout from "../logout/Logout"

const Header=()=>{ 
    const{userData,loading}=useContext(AuthContext)
   
    return (
        <header>
            <Menu/>
            
            {!loading && !userData && <h1>No user</h1>}
            {!loading && userData &&(
                <>
                    <h1>Hola {userData.username}</h1>
                    <Logout/>
                </>
               
            )
            }
        </header>
    
    )
}
export default Header
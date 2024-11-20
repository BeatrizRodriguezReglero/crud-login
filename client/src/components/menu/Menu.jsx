import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

const Menu=()=>{
    const {userData,loading}=useContext(AuthContext)
    return (<nav>
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            { userData&&!loading &&(
                    <li>
                        <Link to='/profile'>Profile</Link>
                    </li>
                )
            }
            {!userData && !loading &&(
                <>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                 </li>
                </>

            )}
            
        </ul>
    </nav>
    )
}
export default Menu
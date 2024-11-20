import { useContext, useEffect, useState } from "react";
import { loginRequest } from "../utils/auth/auth.api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Login=()=>{
    const{userData, setUserData,loading}=useContext(AuthContext)
    console.log(userData)
	const navigate = useNavigate()

	useEffect(()=>{
		if(!userData) return
		navigate('/profile')
	},[userData])
	if(loading)return <h1>Loading...</h1>
    return(
        <>
        <h1>LOGIN</h1>
            <form onSubmit={(event)=>handleSubmit(event, setUserData)}>
				<div>
					<label htmlFor='username'>Email</label>
					<input type='text' name='email' id='email' />
				</div>
				<div>
					<label htmlFor='username'>Password</label>
					<input type='text' name='password' id='password' />
				</div>
				<input type='submit' value='Login' />
			</form>
			<button onClick={()=>navigate('/')}>Go Back</button>
        </>
    )
}
const handleSubmit = async (event,setUserData)=> {
	event.preventDefault();
	const { email, password } = event.target;
    if(!email.value || !password.value) return
	const loginData = {
		
		email: email.value,
		password: password.value
	};
    const serverMessage = await loginRequest(loginData,setUserData)
    console.log(serverMessage)
   
    
}

export default Login
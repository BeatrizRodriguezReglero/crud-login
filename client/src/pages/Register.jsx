import { useNavigate } from "react-router-dom";
import { registerRequest } from "../utils/auth/auth.api";
import { useState } from "react";


const Register=()=>{
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()
    
    
	
    return(
        <>
            <form onSubmit={event => handleSubmit(event, navigate,setErrorMessage)}>
				<div>
					<label htmlFor='username'>Username</label>
					<input type='text' name='username' id='username' />
				</div>
				<div>
					<label htmlFor='username'>Email</label>
					<input type='text' name='email' id='email' />
				</div>
				<div>
					<label htmlFor='username'>Password</label>
					<input type='text' name='password' id='password' />
				</div>
				<input type='submit' value='Register User' />
			</form>
            
			<button onClick={()=>navigate('/')}>Go Back </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </>
    )
}

const handleSubmit = async (event, navigate,setErrorMessage) => {
    
	event.preventDefault();
	const { username, email, password } = event.target;
    if(!username.value || !email.value || !password.value) return
	const newUser = {
		username: username.value,
		email: email.value,
		password: password.value
	};
    try {
        // Hacer la solicitud de registro
        const serverMessage = await registerRequest(newUser);
        console.log(serverMessage); // Ver la respuesta en la consola para depuración

        // Si el servidor devuelve un mensaje que indica que el usuario ya existe
        if (serverMessage && serverMessage.message === 'User already exists') {
            setErrorMessage('Ya existe ese usuario'); // Mostrar el mensaje de error
        } else if (serverMessage && serverMessage.message === 'User registered') {
            // Si el registro fue exitoso, redirigir al login
            navigate('/login');
        } else {
            // Si hay otro tipo de error
            setErrorMessage('Hubo un problema con el registro');
        }
    } catch (error) {
        console.error("Error en la solicitud de registro:", error);
        setErrorMessage('Ya existe el usuario');
    }
    
}

export default Register
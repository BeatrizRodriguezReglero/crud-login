import { useFetch } from "../../hooks/useFetch"

const Users=()=>{
    const {data,loading,error}=useFetch('https://jsonplaceholder.typicode.com/users')

    if(loading)return <h1>Loading...</h1>

    if(error)return <h1>Error</h1>
    
    return <>
        {
            data.map(user=> <h3 key={user.name}>{user.name}</h3>)
        }
    </>
}
export default Users
import { setError,setLoading,setUser } from "../state/auth.slice";
import { register } from "../services/auth.api";
import { useDispatch } from "react-redux";





export const useAuth = () =>{
    const dispatch = useDispatch()


    async function handleRegister({email,contact,password,name,isSeller = false}){
       const data = await register({email,contact,password,name,isSeller})
       dispatch(setUser(data.user))
    }
}
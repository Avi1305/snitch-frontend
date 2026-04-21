import axios from "axios";

const authApi = axios.create({
    baseURL:"/api/auth",
    withCredentials:true
})  

export async function register({email,contact,password,name,isSeller}){
    const response = await authApi.post("/register",{email,contact,password,name,isSeller})
    return response.data
}

export async function login({email,password}){
    const response = await authApi.post("/login",{email,password})
    return response.data
}
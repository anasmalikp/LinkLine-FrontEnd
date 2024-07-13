import axios from "axios"
import Cookies from "js-cookie";

export const RegisterUser = async(creds)=>{
    try{
        var response = await axios.post("https://localhost:7090/api/User",creds)
        return response.status;
    }
    catch(err){
        console.log(err);
    }
}

export const LoginUser = async(creds)=>{
    try{
        var response = await axios.post("https://localhost:7090/api/User/login",creds)
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export const GetAllUSers = async()=>{
    try{
        const response = await axios.get("https://localhost:7090/api/User",{
            headers:{
                "Authorization":`Bearer ${Cookies.get('token')}`
            }
        })
        return response.data
    }
    catch(err){
        console.log(err);
    }
}
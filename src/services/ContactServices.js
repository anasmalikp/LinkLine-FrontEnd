import axios from "axios"
import Cookies from "js-cookie"

export const GetAllContacts = async(type, page)=>{
    try{
        const response = await axios.get(`https://localhost:7090/api/Contact?type=${type}&page=${page}`,{
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

export const AddContact = async(contact)=>{
    try{
        const response = await axios.post(`https://localhost:7090/api/Contact?token=${Cookies.get('token')}`,contact,{
            headers:{
                "Authorization":`Bearer ${Cookies.get('token')}`
            }
        })
        return response.status
    }
    catch(err){
        console.log(err);
    }
}

export const switchSpam = async(id)=>{
    try{
        const response = await axios.put(`https://localhost:7090/api/Contact?contactId=${id}`,{},{
            headers:{
                "Authorization":`Bearer ${Cookies.get('token')}`
            }
        })
        return response.status;
    }
    catch(err){
        console.log(err);
    }
}
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LoginUser } from '../../../services/UserServices';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [creds, setCreds] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsLoading(true)
        const response = await LoginUser(creds);
        if(response!=null){
            Cookies.set('token', response)
            setIsLoading(false)
            navigate('/home')
        }else{
            setIsLoading(false)
            alert("Login Failed")
        }
    }
  return (
    <>
        <>
            <div className='reg_container'>
                <form className='reg_form' onSubmit={handleSubmit}>
                    <h1 className='heads' style={{textAlign:'center'}}>Log In</h1>
                    <TextField required id="outlined-basic" label="E-Mail" variant="outlined" onChange={e=> setCreds({...creds,email:e.target.value})} />
                    <br />
                    <TextField required id="outlined-basic" label="Password" type='password' variant="outlined" onChange={e=> setCreds({...creds,password:e.target.value})} />
                    <br />
                    {isLoading? <Button><CircularProgress /></Button>:<Button type='submit'>Sign In</Button>  }
                    <p onClick={()=> navigate('/register')} className='heads'style={{textAlign:'center', cursor:'pointer'}}>Doesn't have an Account?</p>
                </form>
            </div>
        </>
    </>
  )
}

export default SignIn
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Registration.css'
import { RegisterUser } from '../../services/UserServices';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Registration = () => {
    const [creds, setCreds] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsLoading(true)
        const response = await RegisterUser(creds)
        if(response == 200){
            navigate('/')
            setIsLoading(false)
        }
    }
    return (
        <>
            <div className='reg_container'>
                <form className='reg_form' onSubmit={handleSubmit}>
                    <h1 className='heads' style={{textAlign:'center'}}>Register</h1>
                    <TextField required id="outlined-basic" label="E-Mail" variant="outlined" onChange={e=> setCreds({...creds,email:e.target.value})} />
                    <br />
                    <TextField required id="outlined-basic" label="Password" type='password' variant="outlined" onChange={e=>setCreds({...creds,password:e.target.value})} />
                    <br />
                    {isLoading? <Button><CircularProgress /></Button>:<Button type='submit'>Sign Up</Button>  }
                    <p onClick={()=> navigate('/')} className='heads'style={{textAlign:'center', cursor:'pointer'}} >Already have an account</p>
                </form>
            </div>
        </>
    )
}

export default Registration
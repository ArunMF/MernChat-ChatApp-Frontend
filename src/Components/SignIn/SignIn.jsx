import React, { useContext, useState } from 'react'
import './SignIn.css'
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import axios from 'axios'
import { baseUrl } from '../baseurl';
import { useNavigate } from 'react-router-dom';
import { idContext } from '../../App';

function SignIn() {

  const navigate = useNavigate()

  const [id,setId] = useState('')
  const [password,setPassword] = useState('')

  const [userId,setUserId] = useState('')
  // console.log(userId);

  const handleSignin = async(e)=>{
    const body = {id,password}
    console.log(body);
    await axios.post(`${baseUrl}/users/user-login`,body).then((response)=>{
      alert(response.data.message);
      setUserId(id);
      navigate(`/MainPage/${id}`)
    })
    .catch((response)=>{
      alert(response.response.data.message)
      // window.location.reload();
    })
    
  }

  return (
    <div className='container d-flex justify-content-center py-4'>
      <form>
        <h3 className='text-center py-4'>Sign in to your account</h3>
      <MDBInput onChange={(e)=>setId(e.target.value)} className='mb-4' type='email' id='inputFld' label='Email address' />
      <MDBInput onChange={(e)=>setPassword(e.target.value)} className='mb-4' type='password' id='inputFld' label='Password' />


      <MDBBtn type='button' onClick={(e)=>handleSignin(e)} className='mb-4' block>
        <b>Sign in</b>
      </MDBBtn>
      <p className='text-center'>Not a member? <a href="/Signup" style={{textDecoration:"none"}}>Create an account</a></p>

    </form>
    </div>
  )
}

export default SignIn

import React, { useState } from 'react'
import './SignUp.css'
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {baseUrl} from '../baseurl'

function SignUp() {

  const navigate = useNavigate()

  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
  const [id,setId] = useState('')
  const [password,setPassword] = useState('')
  const [imageurl,setImageurl] = useState('')

  // console.log(firstname,lastname,id,password,imageurl);

  const handleSignUp = async (e)=>{
    const body = {id,firstname,lastname,password,imageurl}
    // console.log(body);
    await axios.post(`${baseUrl}/users/new-user`,body).then((response)=>{
      alert(response.data.message);
      navigate('/')
    })
    .catch((response)=>{
      alert(response.response.data.message)
      // window.location.reload();
    })
  }

  return (
    <div className='container d-flex justify-content-center py-4'>
    <form>
      <h3 className='text-center py-4'>Create an account</h3>
    <MDBRow className='mb-4'>
      <MDBCol>
        <MDBInput id='inputFld' type='text' onChange={(e)=>setFirstname(e.target.value)} label='First name' />
      </MDBCol>
      <MDBCol>
        <MDBInput id='inputFld' type='text' onChange={(e)=>setLastname(e.target.value)} label='Last name' />
      </MDBCol>
    </MDBRow>
    <MDBInput onChange={(e)=>setImageurl(e.target.value)} className='mb-1' type='text' id='inputFld' label='Image URL' />
    <p className='mb-3 text-center' style={{fontSize:"12px"}}>Click <a href="https://postimages.org/" target='_blank' style={{fontSize:"12px"}}>here</a> to create your image URL. Copy and Paste <span className='text-success' style={{fontSize:"12px"}}>Direct link</span> here.</p>
    <MDBInput onChange={(e)=>setId(e.target.value)} className='mb-4' type='email' id='inputFld' label='Email address' />
    <MDBInput onChange={(e)=>setPassword(e.target.value)} className='mb-4' type='password' id='inputFld' label='Password' />


    <MDBBtn type='button' onClick={(e)=>handleSignUp(e)} className='mb-4' block>
      <b>Sign up</b>
    </MDBBtn>
    <p className='text-center'>Already have an account? <a href="/" style={{textDecoration:"none"}}>Sign in</a></p>

  </form>
  </div>
  )
}

export default SignUp
import React,{useState} from 'react'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import { signup } from '../auth/helper'

const Signup = () => {

    const [values,setValues] =useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    })

const {name,email,password,error,success} =values;

const handleChange=e=>{
    const {name,value}=e.target
    setValues({
        ...values,
        error:false,
        [name]:value
    })
}

const submit=async e=>{
    e.preventDefault()
    setValues({...values,error:false})

    try {

        const data=await signup({name,email,password})
        
        if(data.error){
            setValues({...values,error:data.error,success:false})
        }else{
            setValues({...values,
            name:'',
        email:'',
    password:'',
    error:'',
    success:true})
        }
        
    } catch (error) {
        console.log(error)
    }
 
}

const successMessage=()=>{
   return (
   <div className='row'>
       <div className='col-md-6 m-auto'>
       <div className='alert alert-success' style={{display:success?'':'none'}}>
  User registered successfully. Please <Link to='/signin'>login here</Link>
    </div>
       </div>
   </div>
   )

}

const errorMessage=()=>{
    return (
    <div className='row'>
       <div className='col-md-6 m-auto'>
       <div className='alert alert-danger' style={{display:error?'':'none'}}>
         {error}
     </div>
       </div>
    </div>
    )
 
 }


    const signUpForm=()=>{
        return(
            <div className='row'>
    <div className='col-md-6 offset-sm-3 text-left'>
       <form onSubmit={submit}>
           <div className='form-group'>
    <label className='text-light'>Name</label>
    <input className='form-control' type='text' name='name' value={name} onChange={handleChange}/>
           </div>
    
           <div className='form-group'>
    <label className='text-light'>Email</label>
    <input className='form-control' type='email' name='email' value={email} onChange={handleChange}/>
           </div>
    
           <div className='form-group'>
    <label className='text-light'>Password</label>
    <input className='form-control' type='password' name='password' value={password} onChange={handleChange}/>
           </div>
    
           <button className='btn btn-success btn-block' type='submit'>Submit</button>
       </form>
    </div>
            </div>
        )
    }

  return (
    <Base title='Sign Up Page'
    description='A page for sign up'>
        {successMessage()}
        {errorMessage()}
       {signUpForm()}
    </Base>
    
  )
}

export default Signup

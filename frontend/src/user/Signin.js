import React,{useState} from 'react'
import Base from '../core/Base'
import {Link,Redirect} from 'react-router-dom'
import {signin,isAuthenticated,authenticate} from '../auth/helper'

const Signin = () => {

   const [values,setValues] =useState({
       email:'',
       password:'',
       error:'',
       loading:false,
       didRedirect:false
   })

const {email,password,error,loading,didRedirect} =values;
const {user}=isAuthenticated();

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
    setValues({...values,error:false,loading:true})

    try {

        const data=await signin({email,password})
        console.log(data)
        if(data.error){
            setValues({...values,error:data.error,loading:false})
        }else{

            authenticate(data,()=>{
                setValues({...values,
                    didRedirect:true})
            })

            
        }
        
    } catch (error) {
        console.log(error)
    }
 
}


const performRedirect=()=>{
    if(didRedirect){
        if(user && user.role ===1){
          return <Redirect to='/admin/dashboard'/>
        }else{
            return <Redirect to='/user/dashboard'/>
        }
    }

    if(isAuthenticated()){
        return <Redirect to='/' />
    }
}




const loadingMessage=()=>{
      return loading && (
        <div className='row'>
        <div className='col-md-6 m-auto'>
        <h2>Loading....</h2>
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


    const signInForm=()=>{
        return(
            <div className='row'>
    <div className='col-md-6 offset-sm-3 text-left'>
       <form onSubmit={submit}>
          
           <div className='form-group'>
    <label className='text-light'>Email</label>
    <input className='form-control' type='email' value={email} name='email' onChange={handleChange}/>
           </div>
    
           <div className='form-group'>
    <label className='text-light'>Password</label>
    <input className='form-control' type='password' value={password} name='password' onChange={handleChange}/>
           </div>
    
           <button className='btn btn-success btn-block' type='submit'>Submit</button>
       </form>
    </div>
            </div>
        )
    }
  return (
    <Base title='Sign In Page'
    description='A page for sign'>
    {loadingMessage()}
    {errorMessage()}
    {signInForm()}
    {performRedirect()}
    </Base>
  )
}

export default Signin

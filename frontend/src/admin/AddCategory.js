import React,{useState} from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'
import {Link} from 'react-router-dom'
import { createCategory } from './helper/adminapicall'

const AddCategory = () => {

    const [name,setName]=useState('')
    const [error,setError]=useState(false)
    const [success, setSuccess] = useState(false)

    const {user,token}=isAuthenticated()
    
    const submit=async e=>{
        e.preventDefault()
        setError('')
        setSuccess(false)
        //backend call
        try {

        const data=await createCategory(user._id,token,{name});
       
        if(data.error){
            setError(true) //or data.error
        }else{
            setError('')
            setSuccess(true)
            setName('')
        }


        } catch (error) {
            console.log(error)
        }
    }

    const successMessage=()=>{
       if(success){
          return <h4 className='text-success'>Category created successfully</h4>
          }
    }

    const errorMessage=()=>{
        if(error){
           return <h4 className='text-success'>Failed o create category</h4>
           }
    }

  const myCategoryForm=()=>{
    return  <form onSubmit={submit}>
          <div className="form-group">
              <p className="lead">Enter the category</p>
              <input type='text' className='form-control my-3'
              autoFocus
              required 
              placeholder='For ex. Summer'
              value={name}
              onChange={e=>setName(e.target.value)}/>
              <button className='btn btn-outline-info'>
               Create category
               </button>   

          </div>
      </form>
  }

  const goBack=()=>{
     return <div className="mt-5">
          <Link className='btn btn-sm btn-success mb-3' to='/admin/dashboard'>
              Admin home
          </Link>
      </div>
  }

  return (
    <Base title='Create a category'
    description='Add a new category for your product'
    className='container bg-info p-4'>

        <div className="row bg-white">
            <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
               {myCategoryForm()}
               {goBack()}
            </div>
        </div>

    </Base>
  )
}

export default AddCategory


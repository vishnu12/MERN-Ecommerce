import React,{useState,useEffect} from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'
import {Link} from 'react-router-dom'
import { createCategory, getACategory, updateCategory } from './helper/adminapicall'

const UpdateCategory = ({match}) => {

    const [name,setName]=useState('')
    const [error,setError]=useState(false)
    const [success, setSuccess] = useState(false)

    const {user,token}=isAuthenticated()

    const preload=async (categoryId)=>{
        const data=await getACategory(match.params.categoryId,user._id);
        
        if(data.error){
            setError(data.error)
        }else{
            setName(data.name)
    
            
        }
    }
    
    console.log(name)
    
    
    useEffect(() => {
        preload(match.params.categoryId)
       
    }, [])
    
    const submit=async e=>{
        e.preventDefault()
        setError('')
        setSuccess(false)
        //backend call
        try {

        const data=await updateCategory(match.params.categoryId,user._id,token,{name});
       console.log(data)
        if(data.error){
            setError(data.error) //or data.error
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
          return <h4 className='text-success'>Category updated successfully</h4>
          }
    }

    const errorMessage=()=>{
        if(error){
           return <h4 className='text-success'>{error}</h4>
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
               Update category
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
    <Base title='Update category'
    description='Update your existing category'
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

export default UpdateCategory


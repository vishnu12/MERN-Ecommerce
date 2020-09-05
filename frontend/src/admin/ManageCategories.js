import React,{useState,useEffect} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { getAllCategories, deleteCategory } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'


const ManageCategories = () => {


  const [categories, setCategories] = useState([])
  const {user,token}=isAuthenticated()
  
  const  preload=async ()=>{
      try {
        
        const data=await getAllCategories()
        if(data.error){
          console.log(data.error)
        }else{
          setCategories(data)
        } 
  
      } catch (error) {
          console.log(error)
      }
  }
  
  useEffect(()=>{
      preload();
  },[])


const deleteThisCategory=(categoryId)=>{
     deleteCategory(categoryId,user._id,token)
     .then(data=>{
       if(data.error){
         console.log(data.error)
       }else{
         preload()
       }
     })
     .catch(err=>console.log(err))
}

  return (
    <Base title={`Welcome ${user.name}`} description="Manage categories here">
      <h2 className="mb-4">All Categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {categories.length} categories</h2>

          {
            categories.map((cate,key)=>{
              return <div className="row text-center mb-2 " key={cate._id}>
              <div className="col-4">
                <h3 className="text-white text-left">{cate.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/category/update/${cate._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {deleteThisCategory(cate._id)}} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
            })
          }
        </div>
      </div>
    </Base>
  )
}

export default ManageCategories

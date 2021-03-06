import React,{useState,useEffect} from 'react'
import Base from '../core/Base'
import { Link, Redirect } from 'react-router-dom'
import { getAllCategories, getAProduct,updateProduct } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'


const UpdateProduct = ({match}) => {

const {user,token}=isAuthenticated();

const [values, setValues] = useState({
    name:'',
    description:'',
    price:'',
    stock:'',
    photo:'',
    category:'',
    categories:[],
    loading:false,
    error:'',
    createdProduct:'',
    getARedirect:false,
    formData:''
    
})

// const [photo,setPhoto]=useState('')

const {name,description,price,stock,categories,loading,category,
error,getARedirect,createdProduct,formData}=values


const preload=async (productId)=>{
    const data=await getAProduct(productId);
    
    if(data.error){
        setValues({
            ...values,
            error:data.error
        })
    }else{
        setValues({
            ...values,
           name:data.name,
           description:data.description,
           price:data.price,
           category:data.category._id,
           stock:data.stock,
           formData:new FormData()
        })

        preloadCategories();
    }
}


const preloadCategories=()=>{
    getAllCategories()
    .then(data=>{
        if(data.error){
            setValues({
                ...values,
                error:data.error
            })
        }else{
            setValues({
                categories:data,
                formData:new FormData()
            })
            
        }
    })
    .catch(err=>console.log(err))
}

useEffect(() => {
    preload(match.params.productId)
   
}, [])

    
    const handleChange=e=>{
    const {name}=e.target    
    const value=name==='photo' ? e.target.files[0]:e.target.value
     
      console.log(name,value)
      formData.set(name,value)
      setValues({
          ...values,
          [name]:value
      })
    }

    const submit=e=>{
        e.preventDefault()
        setValues({...values,
          error:'',  
          loading:true
      })
        
     updateProduct(match.params.productId,user._id,token,formData)
      .then(data=>{
          if(data.error){
            setValues({...values,error:data.error})
          }else{
             setValues({...values,
              name:'',
              description:'',
              price:'',
              photo:'',
              stock:'',
              loading:false,
              createdProduct:data.name
             })
          }
      })
      .catch(err=>console.log(err))

      }
  

    const successMessage=()=>{
       return <div className="alert alert-success mt-3"
        style={{display:createdProduct ?'':'none'}}>
        <h4>{createdProduct} updated successfully</h4>
        </div>
    }

    const errorMessage=()=>{
      return  <div className="alert alert-success mt-3"
        style={{display:error ?'':'none'}}>
        <h4>{error}</h4>
        </div>
    }

    

    const createProductForm = () => (
        <form onSubmit={submit}>
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange}
              name="name"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange}
              name="description"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange}
              type="number"
              className="form-control"
              placeholder="Price"
              name='price'
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange}
              className="form-control"
              name='category'
              value={category}
              placeholder="Category"
            >
              <option>Select</option>
              {
                  categories.map((cat,k)=>{
                      return <option key={cat._id} value={cat._id}>{cat.name}</option>
                  })
              }
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange}
              type="number"
              className="form-control"
              placeholder="Quantity"
              name='stock'
              value={stock}
            />
          </div>
    
          <button
            type="submit"
            className="btn btn-outline-success mb-3"
          >
            Update Product
          </button>
        </form>
      );



  return (
    <Base title='Add product here!'
    description='Welcome to product creation section'
    className='container bg-info p-4'>
   <Link to='/admin/dashboard' className='btn btn-md btn-dark mb-3'>Admin Home</Link>
    <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">

            {successMessage()}
            {errorMessage()}
           {createProductForm()}
        </div>

    </div>
    </Base>
  )
}

export default UpdateProduct

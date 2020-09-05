import React,{useState,useEffect} from 'react'
import '../styles.css'
import {API} from '../Backend'
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'


const Home = () => {
   
const [products, setProducts] = useState([])
const [error, setError] = useState(false)

const loadProducts=async ()=>{
  const data=await getProducts()
  if(data.error) return setError(data.error)
  setProducts(data)
}



useEffect(()=>{
 loadProducts()
},[])

console.log(products)

  return (
    <div>
        <Base title='Home Page'
        description='Welcome to the T-shirt store'>
        
        <div className='row'>
        <h1 className="text-white">All of your T-shirts</h1>
        <div className="row">
          {
            products.map((product,key)=>{
             return(
               <div className="col-4 mb-4" key={key}>
               <Card product={product}/>
               </div>
             )
            })
          }
        </div>
        </div>
        </Base>
     
     
    </div>
  )
}

export default Home

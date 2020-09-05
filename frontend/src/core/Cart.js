import React,{useState,useEffect} from 'react'
import '../styles.css'
import {API} from '../Backend'
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'
import { loadCart } from './helper/cartHelper'
import StripeCheckout from './StripeCheckoutPage'


const Cart = () => {
   
const [products, setProducts] = useState([])
const [reload, setReload] = useState(false)

useEffect(()=>{
   
    setProducts(loadCart())
},[reload])

console.log(reload)
const loadAllProducts=()=>{
    return(
        <div>
          <h2>Section for cart</h2>  
        {
            products.map((product,index)=>{
              return <Card
              key={index}
              product={product}
              addToCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
              />
            })
        }     
        </div>
    )
}


const loadCheckout=()=>{
    return(
        <div>
        <StripeCheckout 
        products={products}
        setReload={setReload}
        reload={reload}/>
        </div>
    )
}

  return (
    <div>
        <Base title='Cart Page'
        description='Ready to check-out'>
        
        <div className='row text-center'>
        <div className="col-6">
            {loadAllProducts()}
        </div>
        <div className="col-6">
            {loadCheckout()}
        </div>
        </div>
        </Base>
     
     
    </div>
  )
}

export default Cart

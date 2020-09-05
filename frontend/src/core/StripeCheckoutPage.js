import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/cartHelper'
import { Link } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import { API } from '../Backend'
import { createOrder } from './helper/orderHelper'


const StripeCheckoutPage = ({products,setReload=f=>f,reload=undefined}) => {
  
  const [data, setData] = useState({
      loading:false,
      success:false,
      error:'',
      address:''
  })
  
const token=isAuthenticated() && isAuthenticated().token
const userId=isAuthenticated() && isAuthenticated().user._id

const getFinalTotal=()=>{
 
  const sum=products.reduce((amount,product)=>{
      return amount+=product.price
  },0)

  return sum;
   
}

const makePayment=(token)=>{
   const body={
       token,
       products
   }
   const headers={
       'Content-Type':'application/json'
   }

   return fetch(`${API}/stripepayment`,{
       method:'POST',
       headers:headers,
       body:JSON.stringify(body)
   })
   .then(res=>{
      console.log(res)
      const orderData={
        products:products,
      }
      createOrder(userId,token,orderData)
      cartEmpty(()=>{
          console.log('did we got a crash')
      })
      setReload(!reload)
    })
.catch(err=>console.log(err))
}

const showStripeButton=()=>{
    return isAuthenticated()? (
        <StripeCheckout
         stripeKey='pk_test_51HH4gJBn9MGvInAExkUfC2FnEU75zxU3WbUSMBlop9SDDBCYYsIOKm4s7nSLMeMHvu0FGSF8SzX0lMHZkrneu85l00tg4Uvshz'
         token={makePayment}
         amount={getFinalTotal()*100}
         name='Buy T-shirts'
         shippingAddress
         billingAddress>
        <button className='btn btn-success'>
            Pay with stripe
        </button>
        </StripeCheckout>
    ) : (
        <Link to='/signin'>
            <button className='btn btn-warning'>
               Sign In
            </button>
        </Link>
    )
}

    return (
    <div>
      <h3 className='text-white'>Stripe checkout {getFinalTotal()}</h3>
       {showStripeButton()}
    </div>
  )
}

export default StripeCheckoutPage


const stripe=require('stripe')('sk_test_51HH4gJBn9MGvInAEcbxYdnkhSwi9s0RZxGr251k6TzIP6MsijbEi2QCCosLmZM9QxBR68pushT0YbW9aWnC7WrNI006PUpmkiR')
const uuid=require('uuid/v4')

exports.makePayment=(req,res)=>{
   const {token,products}=req.body
   console.log("products"+products)

   const sum=products.reduce((amount,product)=>{
    return amount+=product.price
},0)

const idempotencyKey=uuid()

return stripe.customers.create({
    email:token.email,
    source:token.id,
})
.then(customer=>{
    stripe.charges.create({
      amount:sum*100,
      currency:'usd',
      customer:customer.id,
      receipt_email:token.email,
      description:'a test account product',
      shipping:{
          name:token.card.name,
          address:{
              line1:token.card.address_line1,
              line2:token.card.address_line2,
              city:token.card.address_country,
              postal_code:token.card.address_zip
          }
      }
    },{idempotencyKey})
    .then(result=>res.status(200).json(result))
    .catch(err=>console.log(err))
})


}
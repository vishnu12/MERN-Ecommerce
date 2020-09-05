
const express=require('express');
const router=express.Router();


const {getUserById} =require('../controllers/user');
const {getAllUniqueCategories,getAllProducts,getProductById,createProduct,getProduct, photo,deleteProduct,updateProduct} =require('../controllers/product');
const {isSignedIn,isAuthenticated,isAdmin}=require('../controllers/auth');

router.param('userId',getUserById);
router.param('productId',getProductById);

//actual routes

router.post('/product/create/:userId',isSignedIn,isAuthenticated,isAdmin,createProduct);
//read routes
router.get('/product/:productId',getProduct)
router.get('/product/photo/:productId',photo) //for perf optimisation

//delete route
router.delete('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,deleteProduct)
//update route
router.put('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,updateProduct)

//listing route
router.get('/products',getAllProducts)

router.get('/products/categories',getAllUniqueCategories)


module.exports=router;
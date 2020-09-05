const express=require('express')
const router=express.Router()

const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,removeCategory}=require('../controllers/category')
const {getUserById}=require('../controllers/user')
const {isSignedIn,isAuthenticated,isAdmin}=require('../controllers/auth')



router.param('userId',getUserById)
router.param('categoryId',getCategoryById)

//actual routes
router.post('/category/create/:userId',isSignedIn,isAuthenticated,isAdmin,createCategory)


//read routes
router.get('/category/:categoryId/:userId',getCategory)

router.get('/categories',getAllCategory)

//update route

router.put('/category/:categoryId/:userId',isSignedIn,isAuthenticated,isAdmin,updateCategory)


//delete
router.delete('/category/:categoryId/:userId',removeCategory)


module.exports=router;
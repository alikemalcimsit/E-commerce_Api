const {createProduct,deleteProduct,getAllProduct,getSingleProduct,typeByCount,updateProduct} = require('../controllers/product.js')
const express = require('express')



const router = express.Router()

router.get('/typeByCount',typeByCount)
router.post('/createProduct',createProduct)
router.put('/updateProduct/:id',updateProduct)
router.delete('/deleteProduct/:id',deleteProduct)
router.get('/getSingleProduct/:id',getSingleProduct)
router.get('/getAllProduct',getAllProduct)



module.exports = router
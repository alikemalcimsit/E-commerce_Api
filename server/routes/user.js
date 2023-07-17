const {allUser,deleteUser,detailUser,updateUser} = require('../controllers/user.js')
const {verifyAdmin,verifyUser} = require("../middleware/verify.js")

const express = require('express')



const router = express.Router()

router.get('/allUser',verifyAdmin,allUser)
router.delete('/deleteUser/:id',verifyUser,deleteUser)
router.get('/detailUser/:id',verifyUser,detailUser)
router.put('/updateUser/:id',verifyUser,updateUser)


module.exports = router

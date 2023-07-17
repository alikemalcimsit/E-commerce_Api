const Product = require('../models/Product.js')


const createProduct = async(req,res,next) => { 
try {
    
const product = await Product.create(req.body)
res.status(201).json(product)
} catch (error) {
    res.status(500).json({message:error})
}
}


const updateProduct = async(req,res,next) => { 
    const {id}=req.params
    try {
    const product = await Product.findByIdAndUpdate(id,{$set:req.body}, {new:true}) // direkt req.body yazsamda çalışır 
    res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error})
    }
}


const deleteProduct = async(req,res,next) => { 
    const {id}=req.params
    try {
    await Product.findByIdAndDelete(id) 
    res.status(200).json({message:"Silme işleminiz başarılı..."})
    } catch (error) {
        res.status(500).json({message:error})
    }
}



const getSingleProduct = async(req,res,next) => { 
    const {id}=req.params
    try {
    const product = await Product.findById(id) 
    res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error})
    }
}

//bu biraz skıntılı kısım
//sorgu yapma örneği http://localhost:5000/getAllProduct?category=shoe&min=50&max=200&limit=10
const getAllProduct = async(req,res,next) => { 
    const {min,max,...others} = req.query
    try {
    const product = await Product.find({
        ...others,
        price:{
            $gt: min | 1 , $lt: max | 999
        }
    }).limit(req.query.limit)
    res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error})
    }
}

const typeByCount = async(req,res,next) => { 
    
    try {
        const phone = await Product.countDocuments({type:"phone"})
        const wear = await Product.countDocuments({type:"wear"})
        const shoe = await Product.countDocuments({type:"shoe"})

        res.status(200).json([
            {type:"phone", count:phone},
            {type:"wear", count:wear},
            {type:"shoe", count:shoe}
        ])
    } catch (error) {
        res.status(500).json({message:error})
    }
}


module.exports = {createProduct,deleteProduct,getAllProduct,getSingleProduct,typeByCount,updateProduct}
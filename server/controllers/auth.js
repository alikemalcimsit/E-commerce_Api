const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


    const register =async (req,res,next)=>{
        const {username,password,email}= req.body
        try {
            const user = await User.findOne({email})
            if(user){
                return   res.status(500).json({message:"Zaten böyle bir kullanıcı kayıtlı..."})
            }
            if(password.length<6) res.status(500).json({message:"paralanız çok kısa ..."})
            const passwordHash = await bcrypt.hash(password,12)
           
            if(!isEmail(email)) res.status(500).json({message:"geçerli bir email girilmedi ..."})

            const newUser = await User.create({...req.body,password:passwordHash}) //username,email olarakta kullanabilirdik 
            
            const token = await jwt.sign({id: newUser._id ,isAdmin:newUser.isAdmin},"SECRET_KEY" ,{expiresIn : "1h"}) 

            res.cookie("token",token,{httpOnly:true}).status(201).json({
                token,
                newUser,

            })

            
        } catch (error) {
            res.status(500).json({message:error})
        }

    } 



    const login =async (req,res,next)=>{
        const {password,email}= req.body
        try {
            const user = await User.findOne({email})
            if(!user){
                return   res.status(500).json({message:"Böyle bir kullanıcı bulunmamakta ..."})
            }
            
            const passwordCompare = await bcrypt.compare(password,user.password)
           if(!passwordCompare){
            return res.status(500).json({message:"Parola yanlış..."})
           }

            const token = await jwt.sign({id: user._id ,isAdmin:user.isAdmin},"SECRET_KEY" ,{expiresIn : "1h"})

            res.cookie("token",token,{httpOnly:true}).status(200).json({
                token,
                user,

            })

            
        } catch (error) {
            res.status(500).json({message:error})
        }

    } 


    function isEmail(email){
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
      if (email.match(regex)) 
        return true; 
    
       else 
        return false; 
    }



    module.exports = {register,login}
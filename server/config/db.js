const moongose = require("mongoose")

const db = ()=>{
moongose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true , 
    useUnifiedTopology:true,
}).then(()=>{
    console.log("mongodb connecteddd")
}).catch((err)=>{
    console.log(err)
})
}

module.exports =db
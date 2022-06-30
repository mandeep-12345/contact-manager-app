const mongooose=require("mongoose")
const joi=require("joi")
const ContactSchema=mongooose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    address:{
        type:String,
        required:[true,"address is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    phone:{
        type:Number,
        required:[true,"phone is required"]
    },
    postedBy:{
        type:mongooose.Schema.Types.ObjectId,
        ref:"User"
    }

})
const Contact=new mongooose.model("contact",ContactSchema)
const validateContact=(data)=>{
    const schema=joi.object({
        name:joi.string().min(3).max(50).required(),
        email:joi.string().email().required(),
        address:joi.string().min(4).max(100).required(),
        phone:joi.number().min(7).max(10000000000).required()
    })
    return schema.validate(data)

}
module.exports={validateContact,Contact}
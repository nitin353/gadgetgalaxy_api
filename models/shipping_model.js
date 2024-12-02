import mongoose  from "mongoose";

const addressSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user_model",
        require:true,
    },
    fullName: { type:String, require:true},
    address: { type:String, require:true},
    city: { type:String, require:true},
    state: { type:String, require:true},
    country: { type:String, require:true},
    pincode: { type:String, require:true},
    phoneNumber: { type:Number, require:true},
    createdAt:{type:Date, default:Date.now}
})
export const shipping_model = mongoose.model("address", addressSchema);
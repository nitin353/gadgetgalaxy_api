import mongoose from "mongoose";
const AdminSchema = mongoose.Schema({
    email:{type:String,require:true},
    password:{type:String,require:true},
    createdAT:{type:Date,default:Date.now}
})

export const Admin_model =mongoose.model("admin",AdminSchema)
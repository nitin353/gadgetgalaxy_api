import { Admin_model } from "../models/Admin_model.js";
import  bcryptjs from 'bcryptjs'
export const admin = async( req, resp)=>{
    const { email, password}= req.body;
   
         try{
            const user= await Admin_model.findOne({email, password})
            if(!user){
               return resp.json({msg:"Invalid user", success:false})
            }
            return resp.json({msg:"Succ admin login",success:true})
       }
    catch(err){
       return resp.json({msg:err, success:false})
    }
}
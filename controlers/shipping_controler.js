import {shipping_model} from "../models/shipping_model.js";
export const addshippingproduct = async( req, resp)=>{
    const {fullName,address , city,state,country,pincode, phoneNumber}= req.body;
    try{
        let userId = req.user;
        let shipping_data= await new shipping_model({userId,fullName, address, city,state,country,pincode, phoneNumber});
        const x= await shipping_data.save()
      
            
        resp.json({msg:"shipping product successfully added",success:true})
       
    }
    catch(err){
        resp.json({msg:err})
    }
    }
    export const allshippingproduct = async(req,resp)=>{
        let address = await shipping_model.find({userId:req.user}).sort({createdAt:-1})
        resp.json({message:'address',alldata:address[0]})
    }
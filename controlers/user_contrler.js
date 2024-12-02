import { user_model } from "../models/user_model.js";
import bcryptjs from'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { Otp_model } from "../models/Otp_model.js";
export const register = async( req, resp)=>{
    const {name, email, password}= req.body;
    try{
         const da=await user_model.findOne({email})
         if (da){
            resp.json({msg:'email is already exist', success:false})
         }
         else{
        const pw= await bcryptjs.hash(password,10)
        let user_data= await new user_model({name,email,password:pw});
        const x= await user_data.save()
      
            
        resp.json({msg:"user successfully added", success:true})
       
    }}
    catch(err){
        resp.json({msg:err, success:false})
    }
}
export const allusers = async(req,resp)=>{
    try{
        const alldata =await user_model.find()
        resp.json({msg:"all users",alldata})
    }
    catch(err){
        resp.json({msg:"err"})
    }
}
export const profile = async(req,res)=> {
    res.json({user:req.user})
}



export const login = async(req,resp)=>{
    const{email,password}=req.body;
    try{
        const user= await user_model.findOne({email})
        if(!user){
            return resp.json({msg:"invalid user", success:false})
        }

        const validPassword = await bcryptjs.compare(password, user.password)
        if((!validPassword)){
           return resp.json({msg:"invalid candidate",success:false})
        
            
        }
        const token= jwt.sign({userId:user._id},"!ruby()",{
            expiresIn:'365d'
        })
       return resp.json({msg:`welcome ${user.name}`, token, success:true})
    }
    catch(err){
    return resp.json({msg:"err", success:false})
}
}

const mailer = (email, otp)=>{
    const transporter = nodemailer.createTransport(
        {
            service:"gmail",
            secure: false,
            port:587,
            auth:{
                user:"gadgetgalaxy3010@gmail.com",
                pass:"zrro gtxb gwlm hmzh",
            }

        }
    )
    console.log("define variable")
    const mail_options={
        from:'gadgetgalaxy3010@gmail.com',
        to:email,
        subject:"sending Email using Node . js",
        text:`thank you sir !!!! your otp: ${otp}`
    }

    console.log( "mail option", mail_options)
    return transporter.sendMail(mail_options);
    // transporter.sendMail(mail_options, function(error,info){
    //     if(error){
    //         console.log("error==========",error)
    //     }
    //     else{
    //         console.log("email send ================", info)
    //     }
    // })
}


export const send_email = async (req,resp) => {
    console.log(req.body.email)
    let data = await user_model.findOne({email: req.body.email});
console.log("data" )
    if (data){
console.log("enter if")
        let otp_code = Math.floor((Math.random()*10000 )+ 1);
        console.log(otp_code)
        let otp_data = new Otp_model({
            email: req.body.email,
            code:otp_code,
            expireIn : new Date(). getTime() +300*1000
        })

        console.log("otp data", otp_data)
 await otp_data.save()
const x= mailer(req.body.email,otp_code)
console.log("x", x)
if (x){
    resp.status(200).json({msg:'please check your email id  ', success: true});
}
else{
    resp.status(400).json({msg:'something wrong', success: false});
}
         
        //  resp.status(400).json({msg:'email send', success: true});
        }
          
          else{
            resp.status(400).json({msg:'email id is not register', success: false});
          }
    }


    export const changePassword = async (req,resp) =>{
        const data = await Otp_model.find({email: req.body.email,code:req.body.otp_code});
        if(data){
            const currentTime = new Date().getTime();
            const diff= data.expireIn - currentTime;
            if (diff<0){
                resp.status(400).json({msg:'token expire',success:false});

            }
            else{
                let user = await user_model.findOne({email: req.body.email})
                // const pw =

                user.password= await bcryptjs.hash(req.body.password,10);;
                user.save()
                resp.json({msg:'password successfuly changed', success: true})
            }
        }
        else{
            resp.json({msg:'invalid otp',success:false});
        }
    }




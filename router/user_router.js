import { allusers, login, profile, register, send_email,changePassword } from "../controlers/user_contrler.js";
import{Authenticated} from "../middlewares/auth.js"
import express from 'express';

const router =express.Router()

router.post('/register',register)
router.post('/otp',  send_email)
router.get('/all',allusers)
router.post('/change',changePassword)
router.post('/login',login)
router.get('/profile',Authenticated,profile)

export default router;
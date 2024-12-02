import express from 'express'
import { getToken } from '../controlers/Instamojo_controler.js';
const router = express.Router()
router.post('/get-token',getToken)
export default router;
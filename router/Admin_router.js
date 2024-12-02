import express from 'express';
import { admin } from '../controlers/Admin_contrler.js';
const router =express.Router()
router.post('/adminlog',admin)
export default router;
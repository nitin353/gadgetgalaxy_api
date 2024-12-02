import { storePayment,  getPament , getAllPayments,usedOrder, cancelOrder} from "../controlers/Payment_controler.js";
import { Authenticated } from "../middlewares/auth.js";
import express from 'express'
const router =express.Router()
router.post('/pay',  storePayment)
router.get('/payment', Authenticated, getPament)
router.get('/allpayments', getAllPayments)
router.get('/usedorder', Authenticated, usedOrder)
router.delete('/:orderId',Authenticated,cancelOrder)
export default router;
import {Payment} from '../models/Payments_model.js';


export const storePayment = async (req,res) => {
    const {amount, cartItems, userAddress, paymentId, orderId,payStatus} = req.body;


    try {

    

    const paymentsData = {
        paymentId,
        orderId,
        amount,
        cartItems,
        userAddress,
        payStatus: payStatus || 'Success',
        
    };
    const newPayment = new Payment(paymentsData)
    await newPayment.save();

    res.status(201).json({
        success: true,
        message:"payment stored successfully (test mode)",
        payment: newPayment
    });
} catch(error){
console.error('error storing payment', error);
res.status(500).json({
    success: false,
    message:"failed to store payment details ",
    error: error.message,
})
};

}



export const getPament = async(req,res)=> {

    res.json({payment:req.user})
}

export const getAllPayments = async (req, res) => {
    try{
        const payments = await Payment.find().sort({ orderDate :- -1})
        res.status(200).json(payments);
    }catch(error){
        res.status(500).json({ message:"error fetching payment data", error})
    }
}

export const  usedOrder = async (req,res) => {
    try{
        const userId = req.user._id;
        console.log("Logged-in User ID:", userId);
        const orders = await Payment.find({"userAddress.userId": userId.toString()});
        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message:"NO orders found for this user"
            })
        }

        res.status(200).json({
            success:true,
            orders
        })
    } catch(error){
        console.error("error fetching user orders:", error);
        res.status(500).json({
            success: false,
            message:" failed to user orders",
            error: error.message,
        })
    }
    // let paymentId = req.paymentId.toString();
    // let paymentId = req.body.paymentId.toString();
    // let orders= await Payment.find({paymentId: paymentId}).sort({ orderDate :- -1})
    // res.json(orders)
}


//  order cancel
export const cancelOrder = async (req, res) => {
    try {
      // Extract the order ID from the request body or URL parameters
      const { orderId } = req.params;
      const userId = req.user._id;
  
      console.log("Request to cancel order ID:", orderId, "by User ID:", userId);
  
      // Find the order and ensure it belongs to the logged-in user
      const order = await Payment.findOne({
        _id: orderId,
        "userAddress.userId": userId.toString(),
      });
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found or does not belong to this user.",
        });
      }
  
      // Check if the order is already cancelled
      if (order.payStatus === "cancelled") {
        return res.status(400).json({
          success: false,
          message: "Order is already cancelled.",
        });
      }
  
      // Update the order status to "cancelled"
      order.payStatus = "cancelled";
      await order.save();
  
      res.status(200).json({
        success: true,
        message: "Order has been cancelled successfully.",
        order,
      });
    } catch (error) {
      console.error("Error cancelling order:", error);
      res.status(500).json({
        success: false,
        message: "Failed to cancel the order.",
        error: error.message,
      });
    }
  };
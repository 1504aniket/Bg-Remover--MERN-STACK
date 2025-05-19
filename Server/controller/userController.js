import { Webhook } from "svix";
import userModel from "../model/userModel.js";
import Razorpay from "razorpay"
import transactionModel from "../model/TransactionModel.js";

const clerkWebhooks = async (req, res) => {
  console.log("✅ Webhook triggered");

console.log(users);



  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const payload = req.body;
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const event = wh.verify(payload, headers);
    const { type, data } = event;

    console.log(`🔔 Clerk event received: ${type}`);

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses?.[0]?.email_address || '',
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          photo: data.image_url || '',
          creditBalance: 5,
        };
        await userModel.create(userData);
        break;
      }

      case "user.updated": {
        const updatedData = {
          email: data.email_addresses?.[0]?.email_address || '',
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          photo: data.image_url || '',
        };
        await userModel.findOneAndUpdate({ clerkId: data.id }, updatedData);
        break;
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        break;
      }

      default:
        console.log(`Unhandled Clerk event type: ${type}`);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Clerk webhook error:", err.message);
    return res.status(400).json({ success: false, message: err.message });
  }
};

const userCredits = async (req, res) => {
  try {
    const users = await userModel.find();
    console.log("📦 All users in DB:", users); // ✅ This will log all users

    const clerkId = req.auth?.userId;
    if (!clerkId) throw new Error("Unauthorized: clerkId missing");

    const userData = await userModel.findOne({ clerkId });
    if (!userData) throw new Error("User not found");

    res.json({ success: true, credits: userData.creditBalance });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


// gateaway 


// ✅ Initialize Razorpay instance ONCE
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    const { planId } = req.body;
    const clerkId = req.auth?.userId;

    if (!clerkId || !planId) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const userData = await userModel.findOne({ clerkId });
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let credits, plan, amount;
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;
      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;
      default:
        return res.status(400).json({ success: false, message: "Invalid plan selected" });
    }

    // ✅ Save a transaction record (optional - good for tracking)
    const transactionData = {
      clerkId,
      plan,
      amount,
      credits,
      date: Date.now(),
    };

    const newTransaction = await transactionModel.create(transactionData);

    // ✅ Create Razorpay order
    const options = {
      amount: amount * 100, // amount in paisa
      currency: process.env.CURRENCY || "INR",
      receipt: newTransaction._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);

    // ✅ Return order to frontend
    res.json({ success: true, order });
  } catch (error) {
    console.error("Razorpay error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const verifyRazorpay=async(req,res)=>{
    try{
        const{razorpay_order_id}=req.body
        const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status==='paid'){
            const transactionData=await transactionModel.findById(orderInfo.receipt)
            if(transactionData.payment){
                return res.json({success:false,message:'payment failed'})
            }
            const userData=await userModel.findOne({clerkId:transactionData.clerkId})
            const creditBalance=userData.creditBalance+transactionData.credits
            await userModel.findByIdAndUpdate(userData._id,{creditBalance})

            await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})
            res.json({success:true,message:"credits Added"})
        }
    }catch(error){
        res.json({success:false,message:error.message})
    }
}



  

export { clerkWebhooks, userCredits ,paymentRazorpay,verifyRazorpay};

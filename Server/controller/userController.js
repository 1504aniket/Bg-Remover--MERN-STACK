import { Webhook } from "svix";
import userModel from "../model/userModel.js";

const clerkWebhooks = async (req, res) => {
    console.log("✅ Webhook triggered", req.headers, req.body);

  try {
    // Verify Clerk webhook
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body; // raw body (parsed by body-parser.raw in server.js)
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
          email: data.email_addresses[0].email_address,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          photo: data.image_url,
          creditBalance: 5
        };
        await userModel.create(userData);
        break;
      }

      case "user.updated": {
        const updatedData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          photo: data.image_url,
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

export { clerkWebhooks };

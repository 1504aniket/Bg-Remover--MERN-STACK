import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import userModel from '../model/userModel.js';

const removeBGImage = async (req, res) => {
  try {
    const clerkId = req.auth?.userId;
    if (!clerkId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const user = await userModel.findOne({ clerkId });
    if (!user) return res.json({ success: false, message: 'User not found' });
    if (user.creditBalance === 0) {
      return res.json({ success: false, message: 'No credit balance', creditBalance: 0 });
    }

    if (!req.file || !req.file.path) {
      return res.json({ success: false, message: 'Image file not provided' });
    }

    const imageFile = fs.createReadStream(req.file.path);
    const formData = new FormData();
    formData.append('image_file', imageFile);

    const { data } = await axios.post('https://clipdrop-api.co/remove-background/v1', formData, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
        ...formData.getHeaders(),
      },
      responseType: 'arraybuffer',
    });

    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });
    console.log("✅ Sending result image response");

    res.json({
      success: true,
      resultImage,
      creditBalance: user.creditBalance - 1,
      message: 'Background removed',
    });
  } catch (error) {
    console.error('Error in removeBGImage:', error);
    res.json({ success: false, message: error.message });
  }
};

export { removeBGImage };

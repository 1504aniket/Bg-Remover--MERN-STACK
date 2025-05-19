import express from 'express';
import { removeBGImage } from '../controller/imageController.js';
import upload from '../middleware/multer.js';
import authUser from '../middleware/Auth.js';

const imageRouter = express.Router();

// 🟢 Correct order: auth middleware BEFORE multer upload
imageRouter.post('/removebg', authUser, upload.single('image'), removeBGImage);

export default imageRouter;

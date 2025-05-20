import multer from 'multer';

// Use Vercel's temporary writable directory
const uploadDir = '/tmp';

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadDir); // ✅ Safe writable location on Vercel
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;

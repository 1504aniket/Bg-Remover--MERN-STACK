import { getAuth } from '@clerk/express';

const authUser = async (req, res, next) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  console.log("🔑 Authenticated userId:", userId);


  req.auth = { userId }; // attach it to req.auth
  next();
};

export default authUser;

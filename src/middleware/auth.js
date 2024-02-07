import { verifyAccessToken } from "../utils/helper.js";
import User from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  const access_token = req.cookies?.access_token;
  // console.log(access_token);
  if (!access_token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decodedAccessToken = verifyAccessToken(access_token);
    const { userId } = decodedAccessToken;
    // console.log(userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    req.body.userId = user._id;
    next();
  } catch (error) {
    res.status(401).json({ message: "access token is not valid" });
  }
};

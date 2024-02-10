import { verifyAccessToken } from "../utils/helper.js";
import User from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  let access_token = req.cookies?.access_token;
  const bearerHeader = req.headers['authorization'] || req.headers['Authorization'];
  if(typeof bearerHeader !== "undefined"){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    access_token = bearerToken;
  }
  console.log(access_token,req.cookies);
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

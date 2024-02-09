import { createUser, getUserByUsername } from "../services/user.service.js";
import {
  generateHashedPassword,
  generateToken,
  matchPassword,
} from "../utils/helper.js";

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const userExist = await getUserByUsername(username);
    if (userExist) {
      console.log(userExist);
      return res.status(400).json({ message: "username already taken" });
    }

    const hashedPassword = await generateHashedPassword(`${password}`);
    const userObj = {
      username: `${username}`,
      password: `${hashedPassword}`,
    };
    const user = await createUser(userObj);

    const access_token = generateToken({ userId: `${user._id}` });

    res.cookie("access_token", access_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "None",
      secure: true,
      path: "/",
      domain: "https://bookstore-frontend-kohl.vercel.app",
    });

    return res.status(201).json({
      message: "User signed up successfully",
      user,
      accessToken: access_token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const userExist = await getUserByUsername(username);
    if (!userExist) {
      return res
        .status(400)
        .json({ message: "account doesn't exist, please signup" });
    }
    const isPasswordMatch = await matchPassword(userExist.password, password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const access_token = generateToken({ userId: `${userExist._id}` });

    res.cookie("access_token", access_token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
      domain: "https://bookstore-frontend-kohl.vercel.app",
    });
    console.log(userExist);
    return res.status(201).json({
      message: "User logged in successfully 🔓",
      user: userExist,
      accessToken: access_token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

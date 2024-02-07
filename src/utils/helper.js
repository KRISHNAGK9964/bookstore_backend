import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @description to generate hash password using bcrypt
 * @param {*} password user entered password
 * @returns a hash of password
 */
export const generateHashedPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

/**
 * @description the following function generates an jwt token
 * @param {*} payload object containing _id of user document
 * @returns access token of payload/user
 */
export const generateToken = (payload) => {
  try {
    if (!payload || typeof payload !== "object") {
      throw new Error("Invalid user object");
    }
    const token = jwt.sign({ ...payload }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * @description compares the password using bcrypt
 * @param {*} savedPassword = password saved in database
 * @param {*} enteredPassword = user entered password
 * @returns a boolean field if password matches
 */
export const matchPassword = async (savedPassword , enteredPassword) => {
  return await bcrypt.compare(enteredPassword,savedPassword);
}

export const verifyAccessToken = (accessToken) => {
  const payload = jwt.verify(accessToken , process.env.JWT_SECRET);
  return payload;
}
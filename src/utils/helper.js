// utils/helper.js
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");
const Subuser = require("../models/subuser.model");
const generateToken = (user) => {
    const secretKey = process.env.SECRETKEY;
    const expiresIn = process.env.EXPIRYTIME// Adjust the expiration time as needed
  
    return jwt.sign({ user }, secretKey, { expiresIn, algorithm: 'HS256' });
  };
const generateRandomPassword = () => {
  const length = 10;
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
const checkEmailUserName = async (email, userName) => {
  try {
    const [user, subuser] = await Promise.all([
      UserModel.findOne({ $or: [{ email: email }, { userName: userName }] }),
      Subuser.findOne({ $or: [{ email: email }, { username: userName }] })
    ]);

    if (user || subuser) {
      const error = new Error("User already exists");
      error.status = 401;
      throw error;
    }
  } catch (error) {
    console.error("Error checking email and username:", error.message);
    throw error;
  }
};

module.exports = { generateToken, generateRandomPassword, checkEmailUserName };

//   controllers/auth.controller
const UserModel = require("../models/user.model");
const SubUserModel = require("../models/subuser.model");
const passwordHash = require("password-hash");
const { generateToken, checkEmailUserName } = require("../utils/helper");

const registerUser = async (req, res) => {
  let { email, username, password, full_name } = req.body;
  const newPassword = passwordHash.generate(password);
  const user = await UserModel.findOne({ email: email });
  const user_name = await UserModel.findOne({ username: username });
  if (user) {
    return res.status(400).json({
      message: "User already exists"
    });
  }
  if (user_name) {
    return res.status(400).json({
      message: "Username already exists"
    });
  }
  const newUser = await UserModel.create({
    email,
    username,
    password: newPassword,
    full_name
  });
  return res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
};
const loginUser = async (req, res) => {
  try {
    let role="user";
    const { username, email, password } = req.body;
    let user;
    const userExist = await UserModel.findOne({ email: email });
    if (userExist) {
      user = userExist;
    } else {
      const subuser = await SubUserModel.findOne({ email: email });
      if (subuser) {
        if (!passwordHash.verify(password, subuser.password)) {
          return res.status(400).json({
            message: "Invalid password"
          });
        }
        role=subuser.role;
        user = await UserModel.findById(subuser.user);
      }
    }
    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    // Assuming you have a function like `passwordHash.verify` for password comparison
   

    const token = generateToken({
      userId: user._id,
      full_name: user.full_name,
      role: role
    });

    return res.send({
      token: token,
      user: user
    });
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message });
  }
};

module.exports = { registerUser, loginUser };

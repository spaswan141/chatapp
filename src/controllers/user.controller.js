//   controllers/user.controller
const { checkEmailUserName, generateRandomPassword } = require("../utils/helper");

const SubUserModel = require("../models/subuser.model");
const passwordHash = require("password-hash");

const createSubUser = async (req, res) => {
  try {
    await checkEmailUserName(req.body.email, req.body.username);
    const password= generateRandomPassword();
    console.log(password);
    const newPassword= passwordHash.generate(password);
  
    let payload={
        username: req.body.username,
        password: newPassword,
        email: req.body.email,
        role:req.body.role,
        full_name: req.body.full_name,
        user:req.user.userId
    }
    const subuser=await SubUserModel.create(payload);
    return res.status(201).send({
      code: 201,
      data:subuser,
      message: "subuser created successfully"
    });

  } catch (error) {
    return res.status(500).send({
      code: 500,
      message: error.message
    });
  }
};
module.exports ={createSubUser}

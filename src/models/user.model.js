//   models/user.model
const {model,Schema}= require("mongoose");


const User= new Schema({
  full_name:{type:String, required:true},
  email:{type:String, required:true},
  password:{type:String, required:true},
  username:{type:String, required:true},
  created_at:{type:Date, default:Date.now},
  updated_at:{type:Date, default:Date.now}
})
const UserSchema = model("User",User);
module.exports = UserSchema;

// models/subuser.model
const { model, Schema } = require("mongoose");

const SubUser = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  role: {
    type: String,
    required: true,
    enum: ["Expert", "SuperUser", "Technician", "Body"]
  },
  full_name: { type: String },
  email: { type: String },
  password: { type: String },
  username: { type: String }
});

const UserSchema = model("SubUser", SubUser);
module.exports = UserSchema;

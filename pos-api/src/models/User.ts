const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
  username: {
    type: String,
  },
  role: {
    type: String,
    default: "admin",
    enum: ["admin", "super-admin"]
  },
  password: {
    type: String,
    required: true,
    min: 3
  },
}, { timestamps: true })

module.exports = model("users", UserSchema)
export default UserSchema
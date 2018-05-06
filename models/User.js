const mongoose = require("mongoose");
const { Schema } = mongoose;
const stripeCustomer = require("./plugins/stripeCustomer");
const keys = require("../config/keys");
const timestamps = require("mongoose-timestamp");

const userSchema = new Schema({
  googleId: String,
  githubId: String,
  customerToken: String,
  email: String
});

let stripeOptions = keys.stripeOptions;

userSchema.plugin(timestamps);
userSchema.plugin(stripeCustomer, stripeOptions);

mongoose.model("users", userSchema);

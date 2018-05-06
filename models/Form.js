const mongoose = require("mongoose");
const { Schema } = mongoose;

const formSchema = new Schema({
  title: String,
  recipient: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("forms", formSchema);

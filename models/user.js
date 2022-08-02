var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    userName: String, 
    email : String, 
    password: String,
    token : String,
    
});

var userModel = mongoose.model("users", userSchema);

module.exports = userModel;
var mongoose = require("mongoose");
var exerciceSchema = mongoose.Schema({
    exerciceId: Number, 
    w1 : String, 
    w2: String,
    w3 : String,
    w4 : String,
    w5 : String,
});

var exerciceModel = mongoose.model("exercices", exerciceSchema);

module.exports = exerciceModel;
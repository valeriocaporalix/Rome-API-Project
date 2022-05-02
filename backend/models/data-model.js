const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Test = new Schema({
    name: {type: String, required: true}
});

const Data = mongoose.model("data", Test);

module.exports = Data;
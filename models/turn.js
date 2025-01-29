const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    seen : {
        type : Number,
        default : 0
    },
    creator : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
})

const model = mongoose.model("Turn" , schema);

module.exports = model
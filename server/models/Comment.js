const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    owner: {
        type: Object
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true,
    },
    content: {
        type: String,
        require: true
    }
},
{
    minimize: true
})

module.exports = mongoose.model("Comment", commentSchema)
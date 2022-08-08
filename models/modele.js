const mongoose = require('mongoose')

const vtuberSchema = new mongoose.Schema({
    nazwa: {
        type: String,
        required: true
    },
    suby: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("vtuber", vtuberSchema)
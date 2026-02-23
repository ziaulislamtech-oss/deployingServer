const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    profileImg : String,
    name : String,
    description : String,
})

const noteModel = mongoose.model("profile",noteSchema)

module.exports = noteModel
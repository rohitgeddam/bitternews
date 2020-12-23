const { Mongoose } = require("mongoose");

const mongoose = require("mongoose")
const project = new mongoose.Schema({
    title: String,
    description: String,
    postedOn: {
        type: Date,
        default: Date.now
    },
    // postedBy: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User'
    // }
})

const user = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    password: String,
})


const Project = mongoose.model('Project', project)
const User = mongoose.model('userSchema', user)
module.exports = {
    Project,
    User
}
const { Mongoose } = require("mongoose");

const mongoose = require("mongoose")
const project = new mongoose.Schema({
    title: {type: String, trim: true},
    description: {type: String, trim: true},
    postedOn: {
        type: Date,
        default: Date.now
    },
    // postedBy: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User'
    // }
    postedBy: Object

})

const user = new mongoose.Schema({
    email: {type: String, trim: true, unique: true, required: true},
    username: {type: String, trim: true, unique: true, required: true},
    password: String,
    projects: [project]
})


const Project = mongoose.model('Project', project)
const User = mongoose.model('userSchema', user)
module.exports = {
    Project,
    User
}
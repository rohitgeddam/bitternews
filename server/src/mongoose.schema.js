const { Mongoose } = require("mongoose");

const mongoose = require("mongoose")
const ProjectSchema = new mongoose.Schema({
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
    postedBy: Object,
    votes: ['Vote']

})

const ConfessionSchema = new mongoose.Schema({
    message: {type: String, trim: true},
    postedOn: {
        type: Date,
        default: Date.now
    },
    postedBy: Object
});

// ConfessionSchema.path('message').validate( v => v.length > 125)

const VoteSchema = new mongoose.Schema({
    voter: mongoose.Schema.ObjectId,
    votedFor: mongoose.Schema.ObjectId
})

const UserSchema = new mongoose.Schema({
    email: {type: String, trim: true, unique: true, required: true},
    username: {type: String, trim: true, unique: true, required: true},
    password: String,
    projects: ['Project']
})


const Project = mongoose.model('project', ProjectSchema)
const User = mongoose.model('user', UserSchema)
const Vote = mongoose.model('vote', VoteSchema) 
const Confession = mongoose.model('confession', ConfessionSchema)
module.exports = {
    Project,
    User,
    Vote,
    Confession
}
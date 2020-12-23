
const mongoose = require('mongoose');
const mongooseModels = require("./mongoose.schema")
const dotenv = require('dotenv');
dotenv.config();


// connect to db
let DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vmldp.mongodb.net/db?retryWrites=true&w=majority`

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
console.log("connected"); 
const db = mongoose.connection;

const users = [
    {
        email: "rohitgeddam2018@gmail.com",
        username: "rohitgeddam",
        password: "xyz"
    },
    {
        email: "rohitgeddam2019@gmail.com",
        username: "rohitgeddam2019",
        password: "xyz"
    },{
        email: "rohitgeddam2020@gmail.com",
        username: "rohitgeddam2020",
        password: "xyz"
    }
]


const projects = [
    {
        title: "clone uber eats",
        description: "cloning uber eats with react",
        postedBy: users[0]
    },
    {
        title: "clone ebay eats",
        description: "cloning uber eats with react",
        postedBy: users[1]
    },
    {
        title: "clone safari eats",
        description: "cloning uber eats with react",
        postedBy: users[2]
    },
    {
        title: "clone nuber eats",
        description: "cloning uber eats with react",
        postedBy: users[0]
    },
]

const confessions = [
    {
        message: "i am very lucky",
        postedBy: users[0]
    },
    {
        message: "i am very happy",
        postedBy: users[1]
    },
    {
        message: "i am very spirited",
        postedBy: users[2]
    },
    {
        message: "i am super lucky",
        postedBy: users[0]
    },
]

//delete all

// mongooseModels.User.deleteMany({});
// mongooseModels.Project.deleteMany({})
// mongooseModels.Confession.deleteMany({})
// mongooseModels.Vote.deleteMany({})
// write on db.
mongooseModels.User.create(users, function(err){
    if(err){
        console.log(err)
    }
})

mongooseModels.Project.create(projects, function(err){
    if(err){
        console.log(err)
    }
})

mongooseModels.Confession.create(confessions, function(err){
    if(err) {
        console.log(err)
    }
})
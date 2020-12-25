
const mongoose = require('mongoose');
const mongooseModels = require("./mongoose.schema")
const dotenv = require('dotenv');
dotenv.config();


// connect to db
let DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vmldp.mongodb.net/db?retryWrites=true&w=majority`

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
console.log("connected"); 
const db = mongoose.connection;

// const users = [
//     {
//         email: "rohitgeddam2018@gmail.com",
//         username: "rohitgeddam",
//         password: "xyz"
//     },
//     {
//         email: "rohitgeddam2019@gmail.com",
//         username: "rohitgeddam2019",
//         password: "xyz"
//     },{
//         email: "rohitgeddam2020@gmail.com",
//         username: "rohitgeddam2020",
//         password: "xyz"
//     }
// ]

const user = new mongooseModels.User({
    email: "rohitgeddam2018@gmail.com",
    username: "rohitgeddam",
    password: "xyz",
})
user.save(function(err) {
    if(err) console.log(err);
    else console.log("user saved")
})


const projects = [
    {
        title: "clone uber eats",
        description: "cloning uber eats with react",
        postedBy: user
    },
    {
        title: "clone ebay eats",
        description: "cloning uber eats with react",
        postedBy: user
    },
    {
        title: "clone safari eats",
        description: "cloning uber eats with react",
        postedBy: user
    },
    {
        title: "clone nuber eats",
        description: "cloning uber eats with react",
        postedBy: user
    },
]

const confessions = [
    {
        message: "i am very lucky",
        postedBy: user
    },
    {
        message: "i am very happy",
        postedBy: user
    },
    {
        message: "i am very spirited",
        postedBy: user
    },
    {
        message: "i am super lucky",
        postedBy: user
    },
]

//delete all

// mongooseModels.User.deleteMany({});
// mongooseModels.Project.deleteMany({})
// mongooseModels.Confession.deleteMany({})
// mongooseModels.Vote.deleteMany({})
// write on db.



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




// const votes = [
//     {
//         voter: "5fe56e786617bd44106c9cfb",
//         votedFor: "5fe56e786617bd44106c9cfe",
//     },
//     {
//         voter: "5fe56e786617bd44106c9cfb",
//         votedFor: "5fe56e786617bd44106c9cfe",
//     }
// ]

// mongooseModels.Vote.create(votes, function(err){
//     if(err) {
//         console.log(err)
//     }
// })
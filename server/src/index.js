const fs = require("fs")
const path = require("path")
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server');
const resolvers = require('./graphql/resolvers/index')
const mongooseModels = require("./mongoose.schema")

const { getUseId, getUserId } = require('./utils');

const dotenv = require('dotenv');
dotenv.config();


// connect to db
let DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vmldp.mongodb.net/db?retryWrites=true&w=majority`

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
console.log("connected"); 
const db = mongoose.connection;

const server = new ApolloServer(
    {   typeDefs: fs.readFileSync(path.join(__dirname, './graphql/schema/schema.graphql'), 'utf-8'),
        resolvers,
        context: ({req}) => ({
            ...req,
            authScope: true,
            db: mongooseModels,
            userId: req && req.headers.authorization ? getUserId(req) : null
        })
    });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

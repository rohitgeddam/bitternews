const fs = require("fs")
const path = require("path")
const { ApolloServer, gql } = require('apollo-server');
const resolvers = require('./graphql/resolvers/index')


const server = new ApolloServer(
    { typeDefs: fs.readFileSync(path.join(__dirname, './graphql/schema/schema.graphql'), 'utf-8')
    , resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

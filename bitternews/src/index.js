

const fs = require("fs")
const path = require("path")

const { PrismaClient } = require("@prisma/client");
const { ApolloServer } = require('apollo-server');


const resolvers = {
    Query: {
        info: () => `This is the API of Bitternews`,
        feed: async (parent, args, context) => {
            return context.prisma.link.findMany()
        } 
    },

    Mutation: {
        post: async (parent, args, context) => {
            const newLink = context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description
                }
            })
            return newLink;
        },
        updateLink: async (parent, args, context, info) => {

        },

        deleteLink: (parent, args, context, info) => {

        }
    },

    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}

const prisma = new PrismaClient()

// 3
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: {
        prisma,
    }
})

server.listen().then( url => {
    console.log(`Server is running on ${url}`)
})
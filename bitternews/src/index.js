

const fs = require("fs")
const path = require("path")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const { PrismaClient } = require("@prisma/client");
const { ApolloServer } = require('apollo-server');

const { getUserId } = require('./utils')



const resolvers = {
    Query: {
        info: () => `This is the API of Bitternews`,
        feed: async (parent, args, context) => {
            return context.prisma.link.findMany()
        },
        userList: async (parent, args, context) => {
            console.log(context.userId)
            return context.prisma.user.findMany()
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

        },

        signup: async (parent, args, context) => {
            const password = await bcrypt.hash(args.password, 10)
            const user = await context.prisma.user.create({
                data: {
                    ...args,
                    password
                }
            })
            // sign the password
            const token = jwt.sign({id: user.id}, APP_SECRET)
            return {
                token, user
            }
        },

        login: async ( parent, args, context ) => {
            const user = await context.prisma.user.findUnique({
                where: {
                    email: args.email
                }
            })

            if (!user) {
                throw new Error('NO USER FOUND')
            }

            const isValid = await bcrypt.compare(
                args.password, 
                user.password
            )

            if (!isValid) {
                throw new Error("INVALID PASSWORD")
            }

            const token = jwt.sign({ id: user.id }, APP_SECRET)

            return {
                token,
                user
            };
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
    context: ( {req} ) => {
        return {
            prisma,
            userId: req && req.headers.authorization ? getUserId(req) : null
        }
    }
})

server.listen().then( url => {
    console.log(`Server is running on ${url}`)
})
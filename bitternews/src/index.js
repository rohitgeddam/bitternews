

const fs = require("fs")
const path = require("path")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const {PubSub} = require('apollo-server');
const { PrismaClient } = require("@prisma/client");
const { ApolloServer } = require('apollo-server');

const { getUserId } = require('./utils')


const pubsub = new PubSub();

const resolvers = {
    Query: {
        info: () => `This is the API of Bitternews`,
        feed: async (parent, args, context) => {
            return context.prisma.link.findMany()
        },
        userList: async (parent, args, context) => {

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
            context.pubsub.publish("NEW_LINK", newLink);
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
        },

        vote: async (parent, args, context, info) => {
            const userId = getUserId(context)

            const vote = await context.prisma.vote.findUnique({
                where: {
                    linkId_userId: {
                        linkId: Number(args.linkId),
                        userId: userId
                    }
                }
            })

            if (Boolean(vote)) {
                throw new Error(`Already voted for link: ${args.linkId}`)
            }

            const newVote = context.prisma.vote.create({
                data: {
                    user: { connect: { id: userId }},
                    link: { connect: { id: Number(args.linkId)} },
                }
            })
            context.pubsub.publish("NEW_VOTE", newVote)

            return newVote
        },
        Link: {
            votes: (parent, args, context) => {
                return context.prisma.link.findUnique({
                    where: {
                        id: parent.id
                    }
                }).votes()
            }
        },

        Vote: {
            link: (parent, args, context) => {
                return context.prisma.vote.findUnique({ where: { id: parent.id } }).link()
              },
            user: (parent, args, context) => {
                return context.prisma.vote.findUnique({ where: { id: parent.id } }).user()
              }
        }
    },

    Subscription: {
        newLink: {
            subscribe: (root, args, context, info) => {
                return context.pubsub.asyncIterator("NEW_LINK");
                
            },
            resolve: payload => {
                return payload
            }
        },
        newVote: {
            subscribe: (root, args, context, info) => {
                return context.pubsub.asyncIterator("NEW_VOTE")
            },
            resolve: payload => {
                return payload
            }
        }
    },

    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}

// function newLinkSubscription(root, args, context, info){
//     return context.pubsub.AsyncIterator("NEW_LINK");
    
// }

// const newLink = {
//     subscribe: newLinkSubscription,
//     resolve: payload => {
//         return payload
//     }
// }

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
            ...req,
            prisma,
            pubsub,
            userId: req && req.headers.authorization ? getUserId(req) : null
        }
    }
})

server.listen().then( url => {
    console.log(`Server is running on ${url}`)
})
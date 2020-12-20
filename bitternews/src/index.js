

const fs = require("fs")
const path = require("path")
const { ApolloServer } = require('apollo-server')


let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]
let idCount = links.length


// 2
const resolvers = {
    Query: {
        info: () => `This is the API of Bitternews`,
        feed: () => links,
    },

    Mutation: {
        post: (parent, args) => {
            post = {
                id: `Link-${idCount++}`,
                url: args.url,
                description: args.description,
            }
            links.push(post);
            return post;
        },
        updateLink: (parent, args, ctx, info) => {
            let id = args.id;
            for(link of links) {
                if ( link.id === id ){
                    // update
                    if ( args.description ) {
                        link.description = args.description
                    }
                    if ( args.url ) {
                        link.url = args.url
                    }
                    return link;
                }
            }
        },

        deleteLink: (parent, args, ctx, info) => {
            let id = args.id;
            for(link of links) {
                if ( link.id === id ){
                    // delete
                    links = links.filter((link) => { link.id !== id })
                    return link;
                }
            }
        }
    },

    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}

// 3
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
})

server.listen().then( url => {
    console.log(`Server is running on ${url}`)
})
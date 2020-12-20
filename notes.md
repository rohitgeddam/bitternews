# Using
* Apollo server 2.18
  * comes with graphql-js, easy setup, performance, great dev ex
* prisma
  * replaces traditional orms. use prisma client to access your db inside graphql resolvers
* Graphql playground
  * A Graphql IDE that allows you to interactively explore the functionality of a Graphql API by sending queries and mutations to it.

# What to expect
- [ ] define a GraphQL Schema
- [ ] write corrosponding resolver functions
- [ ] use mock data
- [ ] Add SQLite to project 
- [ ] Use Prisma
- [ ] implement authentication
- [ ] Add filtering and pagination

# Steps:
* create a node project and init with npm
* create a rew graphql server 
  * src/index.js 
  * use apollo-server to create a graphql server
  * npm install apollo-server
  * write a typeDef, Resolver and create a apollo server
  * There is a difference between root types and root fields
  * queries, mutations, subscriptions on api always need to start with a root field
  * When the type of a root field is an object type, you can further expand the query (or mutation/subscription) with fields of that object type. The expanded part is called selection set.
  * schema can have scalar types and object types

* Adding simple query
  * extend the graphql schema defination with a new root field and new object fields if required
  * impement corrosponding resolver functions for the added fields
  * also known as schema-driven or schema-first development.

* Adding Mutations
  * Extend the typeDef with Mutation root type.

###### pro-tip -> Pull schema into its own file
    * create a new file src/schema.graphql
    * Constructor of GraphQLServer can directly take a string or a file for typeDef parameter

    * implement resolver for the mutation field


# Adding a database
*   add SQLite
*   use prisma instead of writing sql directly.
    *   ### What is prisma
        *   provides clean type-safe api for submitting db queries
        *   consists of 3 tools
            *   prisma client -> an auto-generated and type-safe query builer for node.js and ts
            *   prisma migrate
            *   prisma studio
        * Install Prisma
          * 1) npm install @prisma/cli --save-dev
          * 2) npx prisma init
          * we have been working with schema.graphql file ourself but prisma also has as schema, inside prisma directory that was created with npx prisma init. Think of prisma.schema file as a db-schema
            * It has 3 components
              * Data source -> specify your db connection
              * Generator -> indicates that you want to generate prisma client
              * Data model -> defines you app models. maps to underlying db
          * Edit schema.prisma
  * ╰─$ 3) npx prisma migrate dev --name init --preview-feature  1 ↵
  * new /migrations directory is created
  * NOT REQUIRED -> npx prisma migrate up --experimental
  * we now have a db with Link table
  * Now generate prisma client based on your data model
  * 4) npx prisma generate
  * we now have /node_modules/@prisma/client which can be imported and used in your code


## writing query with prisma client
* import { PrismaClient } = require("@prisma/client")
* const prisma = new PrismaClient()
* define async function called main to send querirs to db. write all queries inside this fn
* call the main fn
* close db connections when sript terminates

## Summary of your workflow
To recap, this is the typical workflow you will follow when updating your data:

* Manually adjust your Prisma data model.
* Migrate your database using the prisma migrate CLI commands we covered.
(Re-)generate Prisma Client
* Use Prisma Client in your application code to access your database.


# Connecting the server and db with prisma
* use the graphql context paramenter in resolvers to pass prisma client
* The context argument is a plain JavaScript object that every resolver in the resolver chain can read from and write to. Thus, it is basically a means for resolvers to communicate. A really helpful feature is that you can already write to the context at the moment when the GraphQL server itself is being initialized.

This means that we can attach an instance of Prisma Client to the context when initializing the server and then access it from inside our resolvers via the context argument!

```
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
```

* npx prisma studio

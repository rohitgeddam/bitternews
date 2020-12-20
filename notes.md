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
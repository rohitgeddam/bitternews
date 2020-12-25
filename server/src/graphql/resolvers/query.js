

const query = {
    allProjects: async (root, args, context) => {

        let sort = {}
        if (args.sortBy === "POPULARITY") {
            sort = {voteCount: -1}
        } else if (args.sortBy === "LATEST") {
            sort = {postedOn: -1}
        } else {
            sort = {postedOn: 1}
        }
        options = {
            sort: sort,
            page: args.page || 1,
            limit: args.limit || 2
        }
        try {
            const result = await context.db.Project.paginate({}, options)
            return result;

        } catch(err){
            console.log(err);
        }
        // try {
        //     const result = await context.db.Project.find().sort('voteCount').limit(options.limit).exec()
        //     console.log("RES", result)
        //     return result
        // } catch(err) {
        //     console.log(err)
        // }
    },

    allUsers: async (root, args, context) => {
        try {
            const result = await context.db.User.find({}).exec()
            return result;

        } catch(err) {
            console.log(err)
        }
    },

    allConfessions: async (root, args, context) => {
        
        options = {
            page: args.page || 1,
            limit: args.limit || 2
        }
        try {
            const result =  await context.db.Confession.paginate({}, options)
            return result; 
         } catch(err){
             console.log(err);
         }
         

    },

    githubLoginUrl: () => {
        return `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user`;
    }
}

module.exports = query;
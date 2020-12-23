


const query = {
    allProjects: async (root, args, context) => {

        return context.db.Project.find()
    },

    allUsers: async (root, args, context) => {

        return await context.db.User.find({}).exec()
    },

    allConfessions: async (root, args, context) => {
        return await context.db.Confession.find({}).exec()
    }
}

module.exports = query;
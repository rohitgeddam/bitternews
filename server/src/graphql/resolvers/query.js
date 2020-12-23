


const query = {
    allProjects: async (root, args, context) => {

        return context.db.Project.find()
    },

    allUsers: (root, args, context) => {

        return context.db.User.find({})
    }
}

module.exports = query;
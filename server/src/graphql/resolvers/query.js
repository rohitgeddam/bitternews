


const query = {
    projects: async (root, args, context) => {

        return context.db.Project.find()
    },

    users: (root, args, context) => {

        return context.db.User.find({})
    }
}

module.exports = query;
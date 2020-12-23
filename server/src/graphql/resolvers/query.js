


const query = {
    projects: async (root, args, context) => {

        return context.db.Project.find()
    }
}

module.exports = query;
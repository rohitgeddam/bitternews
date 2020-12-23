
const user = {
    projects: async (root, args, context) => {
        // const userId = context.userId;
        const user = await context.db.User.findOne({_id: root.id}).exec()
        const projects = await context.db.Project.find({postedBy: user}).exec()
        return projects;
    }
}

module.exports = user
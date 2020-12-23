
const projects = [

    {
        id: 0,
        title: "clone Uber",
        description: "create a clone of Uber",
        postedOn: '12-12-2020'
    }
]

const query = {
    projects: async (root, args, context) => {

        return context.db.Project.find()
    }
}

module.exports = query;
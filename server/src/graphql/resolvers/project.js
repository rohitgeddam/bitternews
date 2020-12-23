

const project = {
   postedBy: async (root, args, context) => {

       return await context.db.User.findOne({_id: root.postedBy}).exec()
   }
}

module.exports = project
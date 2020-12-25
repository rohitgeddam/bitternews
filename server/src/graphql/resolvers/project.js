

const project = {
   postedBy: async (root, args, context) => {

       return await context.db.User.findOne({_id: root.postedBy}).exec()
   },

   votes: async (root, args, context) => {
    const projectId = root.id;
    return await context.db.Vote.find({votedFor: projectId}).exec()
   },

//    voteCount: async (root, args, context) => {
//     const projectId = root.id;
//     const votes = await context.db.Vote.find({votedFor: projectId}).exec()
//     return votes.length;
//    }, 

   
}

module.exports = project
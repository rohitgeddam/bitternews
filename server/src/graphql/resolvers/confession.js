
const confession = {
    postedBy: async (root, args, context) => {
        return await context.db.User.findOne({_id: root.postedBy}).exec()
    },
    votes: async (root, args, context) => {
        const confessionId = root.id;
        return await context.db.Vote.find({votedFor: confessionId}).exec()
    }
 }

 module.exports = confession
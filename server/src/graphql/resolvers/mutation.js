
const { signJwt, comparePassword, hashPassword } = require("../../utils")

const mutation = {
 
    addProject: async (root, args, context) => {
        
        let status = "Failure";
        let data = null;

        const userId = context.userId;

        const currentUser = await context.db.User.findOne({_id: userId}).exec()


        let project = new context.db.Project({
            title: args.title,
            description: args.description,
            postedBy: currentUser
        })
        await project.save((err, project) => {
            if(err){
                return {
                    status: "Failure",
                    data
                }
            } 
        })

        status = "Success"
        data = project
        return {
            status,
            data
        }
    },

    signIn: async (root, args, context ) => {
        let status = "Failure"
        let message = ""
        let data = null

        const user = await context.db.User.findOne({email: args.email}).exec()
        
        if (user) {
            // check password
            if (comparePassword(args.password, user.password)) {
                let token = signJwt({id: user.id})
                status = "Success"
                message = "Login Successfull"
                data = {
                    token: token,
                    user: user
                }
            } else {
                message = "authentication failed"
            }
        } else {
                message = "user not found"
        }

        return {
            status,
            message,
            data
        }
    },

    signUp: async (root, args, context ) => {
        let status = "Failure"
        let message = ""
        let data = null

        // find user if exists
        const existsEmail = await context.db.User.findOne({email: args.email}).exec()
        const existsUsername = await context.db.User.findOne({username: args.username}).exec()

        if (!existsEmail && !existsUsername){
            hashedPassword = hashPassword(args.password)
        let newUser = new context.db.User({
            username: args.username,
            email: args.email,
            password: hashedPassword
        })
        newUser.save((err) => {
            if(err){
                    message = "Failed to save user"
                    return {
                        status,
                        message,
                        data
                    }
            }
        })
        let token = signJwt({id: user.id})
            status = "Success"
            message = "user created successfully"
            data = {
                token: token,
                user: newUser,
            }
        } else {
                message = "User already exists"
        }
        return {
            status,
            message,
            data
        }
        
    }
}

module.exports = mutation
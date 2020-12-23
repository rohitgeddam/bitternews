const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const JWT_SECRET = process.env.JWT_SECRET || "secret"

const mutation = {
 
    addProject: async (root, args, context) => {
        let status = "Failure";
        let data = null;

        let project = new context.db.Project({
            title: args.title,
            description: args.description
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
            if (bcrypt.compareSync(args.password, user.password)) {
                let token = jwt.sign({id: user.id}, JWT_SECRET)
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
            hashedPassword = await bcrypt.hash(args.password, 10)
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
        let token = jwt.sign({id: newUser.id}, JWT_SECRET)
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


const { signJwt, comparePassword, hashPassword, requestGithubUser } = require("../../utils")

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
        let token = signJwt({id: newUser.id})
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
        
    },

    vote: async (root, args, context) => {

        const voterId = context.userId;
        const votedForId = args.votedFor;

        // check if already voted
        const response = {
            status: "Failure",
            message: "",
            data: null
        }

        const previousVote = await context.db.Vote.findOne({voter: voterId, votedFor: votedForId}).exec();
        console.log("PREV", previousVote)
        if(!previousVote){
            let newVote = context.db.Vote({
                voter: voterId,
                votedFor: votedForId,
            })
            try {
                await newVote.save();
            } catch(err) {
                return {
                    status: "Failure",
                    message: "Failed to record vote",
                    data: null
                } 
            }

            response.status = "Success";
            response.message = "Voted Successfully";
            response.data = newVote;
            
        } else {
            response.message = "Already Voted";
            response.data = previousVote;
           
        }

        return response;
        
    },

    addConfession: async (root, args, context) => {

        const response = {
            status: "Failure",
            message: "",
            data: null
        }
        const userId = context.userId;
        const currentUser = await context.db.User.findOne({_id: userId}).exec()
        const newConfession = await context.db.Confession({
            message: args.message,
            postedBy: currentUser,
        })
        try {
            newConfession.save()
            response.status = "Success";
            response.message = "Confession Recored Successfully";
            response.data = newConfession;
        } catch(err) {
            console.log(err)
            response.message = "Failed to recored Confession";
        }

        return response;
    },

    authorizeWithGithub: async (root, args, context) => {
        const code = args.code;
        console.log("code", code, process.env.GITHUB_CLIENT_ID)
        const githubUser = await requestGithubUser({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code
        })
        console.log("USER", githubUser)
        let currentUser = {
            githubId: githubUser.id,
            username: githubUser.login,
            avatarUrl: githubUser.avatar_url,
            projects: []
        }

        return {
            user: currentUser, githubToken: githubUser.access_token
        }
       
    }
}

module.exports = mutation
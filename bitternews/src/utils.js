const APP_SECRET = "secret"

const getTokenPayload = (token) => {
    return jwt.verify(token, APP_SECRET)
}

const getUserId = (req, authToken) => {
    if(req){
        const authHeader = req.headers.authorization;
        if (authHeader){
            const token = authHeader.replace('Bearer ', '');
            if (!token){
                throw new Error("No token found")
            }
            const { id } = getTokenPayload(token)
            return id;
        } else if ( authToken ){
            const { id } = getTokenPayload(authToken);
            return id;
        }

        throw new Error('Not Authenticated');
    }
}

module.exports = {
    APP_SECRET,
    getUserId
};
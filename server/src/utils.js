const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const JWT_SECRET = 'annacondalivesontreesbut1234easlions'

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10)
}

const comparePassword = (password1, password2) => {
  return bcrypt.compareSync(password1, password2);
}

const signJwt = (payload) => {

  return jwt.sign(payload, JWT_SECRET)
}

const getTokenPayload = (token) => {

    return jwt.verify(token, JWT_SECRET)

}

const getUserId = (req, authToken) => {

    if (req) {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
          throw new Error('No token found');
        }
        const { id } = getTokenPayload(token);
        return id;
      }
    } else if (authToken) {
      const { id } = getTokenPayload(authToken);
      return id;
    }
  
    throw new Error('Not authenticated');
  }
  
  module.exports = {
      signJwt,
      comparePassword,
      getUserId,
      hashPassword
  }